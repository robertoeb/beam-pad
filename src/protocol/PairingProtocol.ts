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
  | 'failed';

export interface PairingCallbacks {
  onStep: (step: PairingStep, error?: ConnectError) => void;
}

const SERVICE_NAME = 'com.beampad.app';
const CLIENT_NAME = 'BeamPad';

export interface PairingResult {
  certPem: string;
  keyPem: string;
}

export class PairingProtocol {
  private codec = new FrameCodec();
  private socketId = `pairing-${Date.now()}`;
  private step: PairingStep = 'probing';
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
      this.setStep('probing');
      this.client = await AtvSocket.generateClientCertificate();

      this.setStep('connecting');
      this.subs.push(
        AtvSocket.onSocketData(
          (e: { id: string; base64: string }) => e.id === this.socketId && this.handle(e.base64),
        ),
        AtvSocket.onSocketState((e: { id: string; state: string; error?: string; code?: string }) => {
          if (e.id === this.socketId && e.state !== 'open' && this.step !== 'done') {
            if (e.state === 'error') {
              this.fail(classify(e.error, { phase: 'pair', host: this.host }));
            } else {
              this.fail(classify(e.error ?? 'socket closed', { phase: 'pair', host: this.host }));
            }
          }
        }),
      );
      await AtvSocket.connect(
        this.socketId,
        this.host,
        PAIRING_PORT,
        this.client.pem,
        this.client.privateKeyPem,
      );

      this.serverKeys = await AtvSocket.getPeerPublicKeyComponents(this.socketId);

      this.setStep('request');
      this.send({
        status: pb.Status.STATUS_OK,
        protocolVersion: 2,
        pairingRequest: { serviceName: SERVICE_NAME, clientName: CLIENT_NAME },
      });
    } catch (e) {
      this.fail(classify(e, { phase: 'pair', host: this.host }));
    }
  }

  submitCode(code: string) {
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
      status: pb.Status.STATUS_OK,
      protocolVersion: 2,
      pairingSecret: { secret },
    });
  }

  handle(base64: string) {
    for (const payload of this.codec.push(fromB64(base64))) {
      const msg = pb.PairingMessage.decode(payload);
      if (msg.status !== pb.Status.STATUS_OK) {
        return this.fail(classify(`TV status ${msg.status}`, { phase: 'pair', host: this.host }));
      }
      if (msg.pairingRequestAck) {
        this.setStep('option');
        this.send({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
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
      } else if (msg.pairingOption) {
        this.setStep('configuration');
        this.send({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
          pairingConfiguration: {
            encoding: {
              type: pb.EncodingType.ENCODING_TYPE_HEXADECIMAL,
              symbolLength: 6,
            },
            clientRole: pb.RoleType.ROLE_TYPE_INPUT,
          },
        });
      } else if (msg.pairingConfigurationAck) {
        this.setStep('awaiting_code');
      } else if (msg.pairingSecretAck) {
        this.finish();
      }
    }
  }

  private send(fields: pb.IPairingMessage) {
    const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
    AtvSocket.send(this.socketId, toB64(FrameCodec.encode(payload)));
  }

  private setStep(s: PairingStep) {
    this.step = s;
    this.cb.onStep(s);
  }

  private fail(error: ConnectError) {
    this.setStep('failed');
    this.cb.onStep('failed', error);
    this.destroy();
  }

  private finish() {
    this.setStep('done');
    this.destroy();
  }

  private destroy() {
    this.subs.forEach((s) => s.remove());
    AtvSocket.close(this.socketId);
  }

  getResult(): PairingResult {
    return {
      certPem: this.client?.pem ?? '',
      keyPem: this.client?.privateKeyPem ?? '',
    };
  }

  _injectFrames(frames: Uint8Array[]) {
    for (const frame of frames) {
      this.handle(toB64(frame));
    }
  }

  get _step(): PairingStep {
    return this.step;
  }

  _getOutboundFrames(): string[] {
    return [];
  }
}
