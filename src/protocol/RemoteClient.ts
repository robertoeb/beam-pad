import { AtvSocket } from '@/modules/expo-atv-socket';
import { FrameCodec } from './framing';
import { toB64, fromB64 } from './bytes';
import { remote as pb } from '@/proto/bundle';
import type { PairedDevice } from '@/stores/devices';

export type ConnectionState =
  'IDLE' | 'CONNECTING' | 'CONFIGURING' | 'ACTIVE' | 'RECONNECTING' | 'ERROR_STATE';

export interface Telemetry {
  powerOn?: boolean;
  volume?: { level: number; max: number; muted: boolean; playerModel: string };
  currentApp?: { label: string; packageName: string };
}

export interface RemoteClientEvents {
  onState: (s: ConnectionState, error?: string) => void;
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
  private _connectResolve: ((value: void) => void) | null = null;
  private _connectReject: ((reason: Error) => void) | null = null;
  private _promiseSettled = false;
  private lastVolume: Telemetry['volume'] | undefined;
  private destroyed = false;

  constructor(
    private device: PairedDevice,
    private ev: RemoteClientEvents,
  ) {
    this.socketId = `remote-${device.id}`;
  }

  async connect() {
    this.subs.forEach((s) => s.remove());
    this.subs = [];

    const activePromise = new Promise<void>((resolve, reject) => {
      this._connectResolve = resolve;
      this._connectReject = reject;
    });
    activePromise.catch(() => {});
    this.setState('CONNECTING');
    this.subs.push(
      AtvSocket.onSocketData(
        (e: { id: string; base64: string }) => e.id === this.socketId && this.handle(e.base64),
      ),
      AtvSocket.onSocketState((e: { id: string; state: string; error?: string }) => {
        if (e.id !== this.socketId) return;
        if (e.state === 'open') this.onOpen();
        else this.onDrop(e.error);
      }),
    );
    try {
      await AtvSocket.connect(
        this.socketId,
        this.device.host,
        6466,
        this.device.certPem,
        this.device.keyPem,
      );
    } catch (e) {
      this.onDrop(String(e));
    }
    try {
      await activePromise;
    } catch {}
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
      if (msg.remoteError) this.ev.onState('ERROR_STATE', 'TV reported a remote error');
    }
  }

  /* ── Public command API ─────────────────────────────────────────── */

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

  /* ── Lifecycle ──────────────────────────────────────────────────── */

  private onDrop(error?: string) {
    if (this.destroyed) return;
    if (this.reconnectAttempt >= 5) {
      this.setState('ERROR_STATE', error ?? 'connection lost');
      return;
    }
    this.setState('RECONNECTING');
    const delay = Math.min(8000, 500 * 2 ** this.reconnectAttempt++);
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  destroy() {
    this.destroyed = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.subs.forEach((s) => s.remove());
    AtvSocket.close(this.socketId);
    if (!this._promiseSettled && this._connectReject) {
      this._connectReject(new Error('destroyed'));
    }
    this._connectResolve = null;
    this._connectReject = null;
    this.setState('IDLE');
  }

  private send(fields: pb.IRemoteMessage) {
    const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
    AtvSocket.send(this.socketId, toB64(FrameCodec.encode(payload)));
  }

  private setState(s: ConnectionState, error?: string) {
    this.state = s;
    this.ev.onState(s, error);
    if (s === 'ACTIVE' && this._connectResolve) {
      this._promiseSettled = true;
      this._connectResolve();
      this._connectResolve = null;
      this._connectReject = null;
    } else if (s === 'ERROR_STATE' && this._connectReject) {
      this._promiseSettled = true;
      this._connectReject(new Error(error ?? 'connection failed'));
      this._connectResolve = null;
      this._connectReject = null;
    }
  }
}
