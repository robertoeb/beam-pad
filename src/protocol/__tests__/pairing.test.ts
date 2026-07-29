import { pairing as pb } from '@/proto/bundle';
import { FrameCodec } from '../framing';
import { toB64, fromB64, bytesToHex } from '../bytes';
import { derivePairingSecret } from '../secret';

// ─── In-memory Fake AtvSocket ───

interface SocketDataEvent {
  id: string;
  base64: string;
}

interface SocketStateEvent {
  id: string;
  state: string;
  error?: string;
}

class MockFakeAtvSocket {
  public sentFrames: string[] = [];
  public socketId: string | null = null;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  serverModulusB64 = 'AQIDBA==';
  serverExponentB64 = 'AQID';
  clientModulusB64 = 'BQRFBA==';
  clientExponentB64 = 'AgM=';

  async getServerPublicKeyComponents(_host: string, _port: number, _t?: number) {
    return { modulusB64: this.serverModulusB64, exponentB64: this.serverExponentB64 };
  }

  async generateClientCertificate() {
    return {
      pem: 'FAKE_CERT',
      privateKeyPem: 'FAKE_KEY',
      modulusB64: this.clientModulusB64,
      exponentB64: this.clientExponentB64,
    };
  }

  async connect(id: string) {
    this.socketId = id;
    this.stateListeners.forEach((cb) => cb({ id, state: 'open' }));
  }

  send(id: string, base64: string) {
    this.sentFrames.push(base64);
  }

  close(_id: string) {}

  onSocketData(cb: (e: SocketDataEvent) => void) {
    this.dataListeners.push(cb);
    return { remove: () => this.dataListeners.splice(this.dataListeners.indexOf(cb), 1) };
  }

  onSocketState(cb: (e: SocketStateEvent) => void) {
    this.stateListeners.push(cb);
    return { remove: () => this.stateListeners.splice(this.stateListeners.indexOf(cb), 1) };
  }

  injectData(base64: string) {
    if (!this.socketId) throw new Error('not connected');
    this.dataListeners.forEach((cb) => cb({ id: this.socketId!, base64 }));
  }
}

// jest.mock must be hoisted — use 'mock' prefix variable name
const mockFake = new MockFakeAtvSocket();

jest.mock('@/modules/expo-atv-socket', () => ({ AtvSocket: mockFake }));

// Re-import after mock is hoisted
const mod = require('../PairingProtocol');
const PairingProtocol = mod.PairingProtocol;

// ─── Helpers ───

function encodeMsg(fields: pb.IPairingMessage): Uint8Array {
  const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

// ─── Tests ───

describe('PairingProtocol', () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockFake.sentFrames = [];
    mockFake.socketId = null;
    (mockFake as any).dataListeners = [];
    (mockFake as any).stateListeners = [];
  });

  it('golden vector 1: first outbound frame is correct PairingRequest', async () => {
    const steps: string[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (s: string) => steps.push(s),
    });

    await proto.start();

    expect(mockFake.sentFrames.length).toBeGreaterThanOrEqual(1);
    const first = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(first);
    expect(payloads.length).toBe(1);
    const msg = pb.PairingMessage.decode(payloads[0]!);
    expect(msg.protocolVersion).toBe(2);
    expect(msg.status).toBe(pb.Status.STATUS_OK);
    expect(msg.pairingRequest?.serviceName).toBe('com.beampad.app');
    expect(msg.pairingRequest?.clientName).toBe('BeamPad');
    expect(steps).toContain('request');
  });

  it('golden vector 2: full flow step sequence', async () => {
    const steps: string[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (s: string) => steps.push(s),
    });

    await proto.start();
    expect(steps).toContain('request');

    // TV: PairingRequestAck
    mockFake.injectData(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
          pairingRequestAck: {},
        }),
      ),
    );
    expect(steps).toContain('option');

    // TV: PairingOption
    mockFake.injectData(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
          pairingOption: {
            preferredRole: pb.RoleType.ROLE_TYPE_OUTPUT,
            outputEncodings: [
              { type: pb.EncodingType.ENCODING_TYPE_HEXADECIMAL, symbolLength: 6 },
            ],
          },
        }),
      ),
    );
    expect(steps).toContain('configuration');

    // TV: PairingConfigurationAck → awaiting_code
    mockFake.injectData(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
          pairingConfigurationAck: {},
        }),
      ),
    );
    expect(steps).toContain('awaiting_code');

    // User enters code
    proto.submitCode('A1B2C3');
    expect(steps).toContain('secret');

    // TV: PairingSecretAck → done
    mockFake.injectData(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_OK,
          protocolVersion: 2,
          pairingSecretAck: { secret: new Uint8Array(32) },
        }),
      ),
    );
    expect(steps).toContain('done');
  });

  it('golden vector 3: derivePairingSecret with fixed components', () => {
    const secret = derivePairingSecret({
      clientModulusB64: mockFake.clientModulusB64,
      clientExponentB64: mockFake.clientExponentB64,
      serverModulusB64: mockFake.serverModulusB64,
      serverExponentB64: mockFake.serverExponentB64,
      code: 'A1B2C3',
    });
    // SHA-256 of: [2,17,5,1, 1,3, 1,2,3,4, 1,2,3, 0xB2,0xC3]
    const expected =
      '15c7ccdea44707780846069b527968d5a1eb732f3aaa764e65e5587c9fdaae9f';
    expect(bytesToHex(secret)).toBe(expected);
  });

  it('error path: BAD_CONFIGURATION → failed step', () => {
    const steps: string[] = [];
    const errors: string[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (s: string, err?: string) => {
        steps.push(s);
        if (err) errors.push(err);
      },
    });

    proto.handle(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_BAD_CONFIGURATION,
          protocolVersion: 2,
          pairingRequestAck: {},
        }),
      ),
    );

    expect(steps).toContain('failed');
    expect(errors.length).toBeGreaterThan(0);
  });
});
