import { AtvSocket } from '@/modules/expo-atv-socket';
import { FrameCodec } from './framing';
import { derivePairingSecret } from './secret';
import { toB64, fromB64 } from './bytes';
import { pairing as pb } from '@/proto/bundle';
import { classify, ConnectError } from './errors';
import { PAIRING_PORT } from './ports';

export type PairingStep =
  | 'probing'
  | 'connecting'
  | 'request'
  | 'option'
  | 'configuration'
  | 'awaiting_code'
  | 'secret'
  | 'done'
  | 'failed'
  | 'cancelled';

export interface PairingCallbacks {
  onStep: (step: PairingStep, error?: ConnectError) => void;
}

const SERVICE_NAME = 'atvremote';
const CLIENT_NAME = 'Android TV Remote';
const HANDSHAKE_TIMEOUT_MS = 20_000;

export interface PairingResult {
  certPem: string;
  keyPem: string;
}

export class PairingProtocol {
  private codec = new FrameCodec();
  private socketId = `pairing-${Date.now()}`;
  private step: PairingStep = 'probing';
  private serviceName = SERVICE_NAME;
  private handshakeTimer: ReturnType<typeof setTimeout> | null = null;
  private cancelled = false;
  private client: {
    pem: string;
    privateKeyPem: string;
    modulusB64: string;
    exponentB64: string;
  } | null = null;
  private serverKeys: { modulusB64: string; exponentB64: string } | null = null;
  private subs: { remove(): void }[] = [];

  constructor(
    private host: string,
    private cb: PairingCallbacks,
  ) {}

  async start() {
    try {
      console.log('[PairingProtocol] Starting pairing with host:', this.host);
      this.setStep('probing');
      this.client = await AtvSocket.generateClientCertificate();
      console.log('[PairingProtocol] Client cert generated');

      this.setStep('connecting');
      this.subs.push(
        AtvSocket.onSocketData((e: { id: string; base64: string }) => {
          if (e.id === this.socketId) {
            console.log('[PairingProtocol] Socket data received, length:', e.base64.length);
            this.handle(e.base64);
          }
        }),
        AtvSocket.onSocketState(
          (e: { id: string; state: string; error?: string; code?: string }) => {
            if (e.id === this.socketId) {
              console.log(
                '[PairingProtocol] Socket state changed:',
                e.state,
                e.error ?? '',
                e.code ?? '',
              );
              if (e.state !== 'open' && this.step !== 'done') {
                if (
                  (this.step === 'awaiting_code' || this.step === 'secret') &&
                  e.state === 'closed'
                ) {
                  console.log('[PairingProtocol] Socket closed while waiting → TV cancelled');
                  this.cancel();
                  return;
                }
                if (e.state === 'error') {
                  this.fail(classify(e.error, { phase: 'pair', host: this.host }));
                } else {
                  this.fail(
                    classify(e.error ?? 'socket closed', { phase: 'pair', host: this.host }),
                  );
                }
              }
            }
          },
        ),
      );
      await AtvSocket.connect(
        this.socketId,
        this.host,
        PAIRING_PORT,
        this.client.pem,
        this.client.privateKeyPem,
      );
      console.log('[PairingProtocol] AtvSocket connected to', this.host, PAIRING_PORT);

      this.serverKeys = await AtvSocket.getPeerPublicKeyComponents(this.socketId);
      console.log('[PairingProtocol] Peer public key components retrieved');

      this.setStep('request');
      this.send({
        protocolVersion: 2,
        status: pb.Status.STATUS_OK,
        pairingRequest: { serviceName: this.serviceName, clientName: CLIENT_NAME },
      });
      this.scheduleHandshakeTimeout();
    } catch (e) {
      console.log('[PairingProtocol] Error in start():', e);
      this.fail(classify(e, { phase: 'pair', host: this.host }));
    }
  }

  private scheduleHandshakeTimeout() {
    this.clearHandshakeTimeout();
    this.handshakeTimer = setTimeout(() => {
      if (this.step === 'request' || this.step === 'option' || this.step === 'configuration') {
        console.log('[PairingProtocol] Handshake timed out at step:', this.step);
        this.fail(classify('timeout', { phase: 'pair', host: this.host }));
      }
    }, HANDSHAKE_TIMEOUT_MS);
  }

  private clearHandshakeTimeout() {
    if (this.handshakeTimer) {
      clearTimeout(this.handshakeTimer);
      this.handshakeTimer = null;
    }
  }

  submitCode(code: string) {
    console.log('[PairingProtocol] Submitting code:', code);
    if (this.cancelled) return;
    if (this.step !== 'awaiting_code') return;
    if (!this.client || !this.serverKeys) {
      this.fail(classify('missing certificate components', { phase: 'pair', host: this.host }));
      return;
    }
    this.setStep('secret');
    const secret = derivePairingSecret({
      clientModulusB64: this.client.modulusB64,
      clientExponentB64: this.client.exponentB64,
      serverModulusB64: this.serverKeys.modulusB64,
      serverExponentB64: this.serverKeys.exponentB64,
      code: code.toUpperCase(),
    });
    this.send({
      protocolVersion: 2,
      status: pb.Status.STATUS_OK,
      pairingSecret: { secret },
    });
  }

  handle(base64: string) {
    for (const payload of this.codec.push(fromB64(base64))) {
      const msg = pb.PairingMessage.decode(payload);
      console.log(
        '[PairingProtocol] Decoded msg:',
        JSON.stringify(msg),
        'current step:',
        this.step,
      );
      const statusNum = Number(msg.status);
      const isOk =
        statusNum === pb.Status.STATUS_OK ||
        statusNum === 200 ||
        statusNum === 2 ||
        statusNum === 1 ||
        statusNum === 0 ||
        msg.status == null;
      if (!isOk) {
        console.log('[PairingProtocol] Unrecognized/Error msg status:', msg.status);
        // If the TV rejects while we're waiting for (or verifying) the code, the
        // user cancelled the pairing on the TV — tear down and head back to the
        // device list instead of restarting the handshake.
        if (
          statusNum === pb.Status.STATUS_ERROR &&
          (this.step === 'awaiting_code' || this.step === 'secret')
        ) {
          this.cancel();
          return;
        }
        if (statusNum === pb.Status.STATUS_ERROR && this.serviceName === 'atvremote') {
          this.retryWith('androidtv-remote');
          return;
        } else if (
          statusNum === pb.Status.STATUS_ERROR &&
          this.serviceName === 'androidtv-remote'
        ) {
          this.retryWith('com.google.android.tv.remote');
          return;
        }
        return this.fail(classify(`TV status ${msg.status}`, { phase: 'pair', host: this.host }));
      }
      if (
        (this.step === 'request' || this.step === 'connecting') &&
        (msg.pairingRequestAck || msg.pairingOption)
      ) {
        console.log('[PairingProtocol] Handling requestAck/pairingOption -> sending pairingOption');
        this.setStep('option');
        this.send({
          protocolVersion: 2,
          status: pb.Status.STATUS_OK,
          pairingOption: {
            preferredRole: pb.RoleType.ROLE_TYPE_INPUT,
            inputEncodings: [
              {
                type: pb.EncodingType.ENCODING_TYPE_HEXADECIMAL,
                symbolLength: 6,
              },
            ],
          },
        });
        this.scheduleHandshakeTimeout();
      } else if (this.step === 'option' && (msg.pairingOption || msg.pairingRequestAck)) {
        console.log('[PairingProtocol] Handling option -> sending pairingConfiguration');
        this.setStep('configuration');
        this.send({
          protocolVersion: 2,
          status: pb.Status.STATUS_OK,
          pairingConfiguration: {
            encoding: {
              type: pb.EncodingType.ENCODING_TYPE_HEXADECIMAL,
              symbolLength: 6,
            },
            clientRole: pb.RoleType.ROLE_TYPE_INPUT,
          },
        });
        this.scheduleHandshakeTimeout();
      } else if (msg.pairingConfigurationAck || this.step === 'configuration') {
        console.log(
          '[PairingProtocol] Pairing configuration ACK received -> setStep awaiting_code',
        );
        this.clearHandshakeTimeout();
        this.setStep('awaiting_code');
      } else if (msg.pairingSecretAck) {
        console.log('[PairingProtocol] Pairing secret ACK received -> finish');
        this.finish();
      }
    }
  }

  private send(fields: pb.IPairingMessage) {
    console.log('[PairingProtocol] Sending fields:', JSON.stringify(fields));
    const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
    AtvSocket.send(this.socketId, toB64(FrameCodec.encode(payload)));
  }

  private setStep(s: PairingStep) {
    console.log('[PairingProtocol] Step:', this.step, '->', s);
    this.step = s;
    this.cb.onStep(s);
  }

  private fail(error: ConnectError) {
    console.log('[PairingProtocol] Failed:', error);
    this.setStep('failed');
    this.cb.onStep('failed', error);
    this.destroy();
  }

  /** Cancels an in-progress pairing (TV cancelled, or the user backed out). */
  cancel() {
    if (this.cancelled || this.step === 'done' || this.step === 'failed') return;
    this.cancelled = true;
    console.log('[PairingProtocol] Cancelling pairing');
    this.clearHandshakeTimeout();
    this.destroy();
    this.setStep('cancelled');
  }

  private finish() {
    this.setStep('done');
    this.destroy();
  }

  private async retryWith(newServiceName: string) {
    console.log(
      '[PairingProtocol] Retrying pairing with fresh socket connection & serviceName:',
      newServiceName,
    );
    this.destroy();
    this.serviceName = newServiceName;
    this.codec = new FrameCodec();
    this.socketId = `pairing-${Date.now()}`;
    await new Promise((r) => setTimeout(r, 200));
    await this.start();
  }

  private destroy() {
    this.clearHandshakeTimeout();
    this.subs.forEach((s) => s.remove());
    AtvSocket.close(this.socketId);
  }

  getResult(): PairingResult | null {
    const pem = this.client?.pem ?? '';
    const privateKeyPem = this.client?.privateKeyPem ?? '';
    if (!this.client || !pem || !privateKeyPem) return null;
    return { certPem: pem, keyPem: privateKeyPem };
  }

  _injectFrames(frames: Uint8Array[]) {
    for (const frame of frames) {
      this.handle(toB64(frame));
    }
  }

  get _step(): PairingStep {
    return this.step;
  }
}
