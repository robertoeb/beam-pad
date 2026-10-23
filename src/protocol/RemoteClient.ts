import { AtvSocket } from '@/modules/expo-atv-socket';
import { FrameCodec } from './framing';
import { toB64, fromB64 } from './bytes';
import { remote as pb } from '@/proto/bundle';
import type { PairedDevice } from '@/stores/devices';
import { classify, ConnectError } from './errors';
import { COMMAND_PORT } from './ports';

export type ConnectionState =
  'IDLE' | 'CONNECTING' | 'CONFIGURING' | 'ACTIVE' | 'RECONNECTING' | 'ERROR_STATE';

export interface Telemetry {
  powerOn?: boolean;
  volume?: { level: number; max: number; muted: boolean; playerModel: string };
  currentApp?: { label: string; packageName: string };
}

export interface RemoteClientEvents {
  onState: (s: ConnectionState, error?: ConnectError) => void;
  onTelemetry: (t: Partial<Telemetry>) => void;
  onImeShow: (status: pb.IRemoteTextFieldStatus) => void;
}

const APP_VERSION = '1.0.0';
const CONFIG_CODE = 622;

export class RemoteClient {
  private socketId: string;
  private codec = new FrameCodec();
  private subs: { remove(): void }[] = [];
  private state: ConnectionState = 'IDLE';
  private reconnectAttempt = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private pending: {
    promise: Promise<void>;
    resolve: () => void;
    reject: (err: unknown) => void;
  } | null = null;
  private lastVolume: Telemetry['volume'] | undefined;
  private destroyed = false;
  private lastError: ConnectError | undefined;

  constructor(
    private device: PairedDevice,
    private ev: RemoteClientEvents,
  ) {
    this.socketId = `remote-${device.id}`;
  }

  connect(): Promise<void> {
    this.subs.forEach((s) => s.remove());
    this.subs = [];

    if (!this.pending) {
      let resolve!: () => void;
      let reject!: (err: unknown) => void;
      const promise = new Promise<void>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      // Reconnect retries share this promise without awaiting it; mark it
      // handled so unawaited retries never trip unhandledrejection.
      promise.catch(() => {});
      this.pending = { promise, resolve, reject };
    }
    const current = this.pending.promise;

    this.setState('CONNECTING');
    this.subs.push(
      AtvSocket.onSocketData(
        (e: { id: string; base64: string }) => e.id === this.socketId && this.handle(e.base64),
      ),
      AtvSocket.onSocketState((e: { id: string; state: string; error?: string; code?: string }) => {
        if (e.id !== this.socketId) return;
        if (e.state === 'open') this.onOpen();
        else this.onDrop(e.error, e.code);
      }),
    );
    try {
      const result = AtvSocket.connect(
        this.socketId,
        this.device.host,
        this.device.port ?? COMMAND_PORT,
        this.device.certPem,
        this.device.keyPem,
      );
      Promise.resolve(result).catch((e: unknown) => this.onDrop(String(e)));
    } catch (e) {
      this.onDrop(String(e));
    }
    return current;
  }

  private onOpen() {
    this.setState('CONFIGURING');
    this.send({
      remoteConfigure: {
        code1: CONFIG_CODE,
        deviceInfo: {
          model: 'BeamPad',
          vendor: 'BeamPad',
          unknown1: 1,
          unknown2: APP_VERSION,
          packageName: 'com.beampad.app',
          appVersion: APP_VERSION,
        },
      },
    });
  }

  private handle(base64: string) {
    for (const payload of this.codec.push(fromB64(base64))) {
      const msg = pb.RemoteMessage.decode(payload);

      if (msg.remoteConfigure && this.state === 'CONFIGURING') {
        this.send({ remoteSetActive: { active: CONFIG_CODE } });
        this.setState('ACTIVE');
        this.reconnectAttempt = 0;
      }
      if (msg.remotePingRequest) {
        this.send({
          remotePingResponse: { val1: msg.remotePingRequest.val1 ?? 0 },
        });
      }
      if (msg.remoteStart) this.ev.onTelemetry({ powerOn: msg.remoteStart.started ?? false });
      if (msg.remoteSetVolumeLevel) {
        const v = msg.remoteSetVolumeLevel;
        this.lastVolume = {
          level: v.volumeLevel ?? 0,
          max: v.volumeMax ?? 0,
          muted: v.volumeMuted ?? false,
          playerModel: v.playerModel ?? '',
        };
        this.ev.onTelemetry({ volume: this.lastVolume });
      }
      if (msg.remoteImeKeyInject?.appInfo) {
        this.ev.onTelemetry({
          currentApp: {
            label: msg.remoteImeKeyInject.appInfo.label ?? '',
            packageName: msg.remoteImeKeyInject.appInfo.appPackage ?? '',
          },
        });
      }
      if (msg.remoteImeShowRequest?.remoteTextFieldStatus) {
        this.ev.onImeShow(msg.remoteImeShowRequest.remoteTextFieldStatus);
      }
      if (msg.remoteError) {
        const err = classify('TV reported a remote error', {
          phase: 'connect',
          host: this.device.host,
          hasCerts: true,
        });
        this.setState('ERROR_STATE', err);
      }
    }
  }

  keyPress(keyCode: number) {
    this.send({
      remoteKeyInject: { keyCode, direction: pb.RemoteDirection.SHORT },
    });
  }

  keyLongStart(keyCode: number) {
    this.send({
      remoteKeyInject: {
        keyCode,
        direction: pb.RemoteDirection.START_LONG,
      },
    });
  }

  keyLongEnd(keyCode: number) {
    this.send({
      remoteKeyInject: {
        keyCode,
        direction: pb.RemoteDirection.END_LONG,
      },
    });
  }

  launchApp(appLink: string) {
    this.send({ remoteAppLinkLaunchRequest: { appLink } });
  }

  setVolumeLevel(level: number) {
    if (!this.lastVolume) return;
    this.send({
      remoteSetVolumeLevel: {
        playerModel: this.lastVolume.playerModel,
        volumeMax: this.lastVolume.max,
        volumeLevel: level,
        volumeMuted: false,
      },
    });
  }

  imeBatchEdit(batch: pb.IRemoteImeBatchEdit) {
    this.send({ remoteImeBatchEdit: batch });
  }

  voiceBegin(sessionId: number) {
    this.send({ remoteVoiceBegin: { sessionId } });
  }

  voicePayload(sessionId: number, samples: Uint8Array) {
    this.send({ remoteVoicePayload: { sessionId, samples } });
  }

  voiceEnd(sessionId: number) {
    this.send({ remoteVoiceEnd: { sessionId } });
  }

  private onDrop(error?: string, code?: string) {
    if (this.destroyed) return;
    const classified = classify(error, {
      phase: 'connect',
      host: this.device.host,
      hasCerts: true,
      nativeCode: code,
    });
    this.lastError = classified;
    if (this.reconnectAttempt >= 5) {
      this.setState('ERROR_STATE', classified);
      return;
    }
    this.setState('RECONNECTING');
    const delay = Math.min(8000, 500 * 2 ** this.reconnectAttempt++);
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  getLastConnectError(): ConnectError | undefined {
    return this.lastError;
  }

  destroy() {
    this.destroyed = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.subs.forEach((s) => s.remove());
    this.subs = [];
    AtvSocket.close(this.socketId);
    if (this.pending) {
      const pending = this.pending;
      this.pending = null;
      pending.reject(classify('destroyed', { phase: 'connect', host: this.device.host }));
    }
    this.setState('IDLE');
  }

  private send(fields: pb.IRemoteMessage) {
    const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
    AtvSocket.send(this.socketId, toB64(FrameCodec.encode(payload)));
  }

  private setState(s: ConnectionState, error?: ConnectError) {
    this.state = s;
    this.ev.onState(s, error);
    if (s === 'ACTIVE' && this.pending) {
      const pending = this.pending;
      this.pending = null;
      pending.resolve();
    } else if (s === 'ERROR_STATE' && this.pending) {
      const pending = this.pending;
      this.pending = null;
      pending.reject(
        error ??
          this.lastError ??
          classify('connection failed', { phase: 'connect', host: this.device.host }),
      );
    }
  }
}
