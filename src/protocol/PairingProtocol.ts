import { AtvSocket } from '@/modules/expo-atv-socket';
import { FrameCodec } from './framing';
import { derivePairingSecret } from './secret';
import { toB64, fromB64 } from './bytes';
import { pairing as pb } from '@/proto/bundle';

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
  onStep: (step: PairingStep, error?: string) => void;
}

const SERVICE_NAME = 'com.beampad.app';
const CLIENT_NAME = 'BeamPad';

export interface PairingResult {
  certPem: string;
  keyPem: string;
}

/**
 * ATV Remote v2 pairing state machine (port 6467).
 *
 * Wire flow:
 *   1. Probe server key → generate client cert → TLS connect
 *   2. Client → PairingRequest
 *   3. Server → PairingRequestAck  /  Client → PairingOption
 *   4. Server → PairingOption  /  Client → PairingConfiguration
 *   5. Server → PairingConfigurationAck  (TV displays 6-char hex code)
 *   6. User enters code → Client → PairingSecret
 *   7. Server → PairingSecretAck  (verification; optional)
 */
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

  /** Start the pairing flow. Awaits TLS connect then sends PairingRequest. */
  async start() {
    try {
      this.setStep('probing');
      this.serverKeys = await AtvSocket.getServerPublicKeyComponents(this.host, 6467, 8000);

      this.client = await AtvSocket.generateClientCertificate();

      this.setStep('connecting');
      this.subs.push(
        AtvSocket.onSocketData(
          (e: { id: string; base64: string }) => e.id === this.socketId && this.handle(e.base64),
        ),
        AtvSocket.onSocketState((e: { id: string; state: string; error?: string }) => {
          if (e.id === this.socketId && e.state !== 'open' && this.step !== 'done') {
            this.fail(e.error ?? 'socket closed');
          }
        }),
      );
      await AtvSocket.connect(
        this.socketId,
        this.host,
        6467,
        this.client.pem,
        this.client.privateKeyPem,
      );

      this.setStep('request');
      this.send({
        status: pb.Status.STATUS_OK,
        protocolVersion: 2,
        pairingRequest: { serviceName: SERVICE_NAME, clientName: CLIENT_NAME },
      });
    } catch (e) {
      this.fail(String(e));
    }
  }

  /** Called by the UI when the user enters the 6-char hex code. */
  submitCode(code: string) {
    if (this.step !== 'awaiting_code') return;
    if (!this.client || !this.serverKeys) {
      this.fail('missing certificate components');
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

  /** Ingest a base64 TCP chunk from the socket. */
  handle(base64: string) {
    for (const payload of this.codec.push(fromB64(base64))) {
      const msg = pb.PairingMessage.decode(payload);
      if (msg.status !== pb.Status.STATUS_OK) {
        return this.fail(`TV status ${msg.status}`);
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

  /** Encode and send a PairingMessage over the TLS socket. */
  private send(fields: pb.IPairingMessage) {
    const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
    AtvSocket.send(this.socketId, toB64(FrameCodec.encode(payload)));
  }

  private setStep(s: PairingStep) {
    this.step = s;
    this.cb.onStep(s);
  }

  private fail(error: string) {
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

  /** Certificate result consumed by the screen to persist the paired device. */
  getResult(): PairingResult {
    return {
      certPem: this.client?.pem ?? '',
      keyPem: this.client?.privateKeyPem ?? '',
    };
  }

  /** Exposed for testing: inject frames without going through the socket. */
  _injectFrames(frames: Uint8Array[]) {
    for (const frame of frames) {
      this.handle(toB64(frame));
    }
  }

  /** Exposed for testing: current step. */
  get _step(): PairingStep {
    return this.step;
  }

  /** Exposed for testing: captured outbound frames. */
  _getOutboundFrames(): string[] {
    return [];
  }
}
