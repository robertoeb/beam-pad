import { pairing as pb } from '@/proto/bundle';
import { FrameCodec } from '../framing';
import { toB64 } from '../bytes';

interface SocketDataEvent {
  id: string;
  base64: string;
}

interface SocketStateEvent {
  id: string;
  state: string;
  error?: string;
  code?: string;
}

class MockFakeAtvSocket {
  public sentFrames: string[] = [];
  public socketId: string | null = null;
  public connectCallCount = 0;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  serverModulusB64 = 'AQIDBA==';
  serverExponentB64 = 'AQAB';
  clientModulusB64 = 'BQRFBA==';
  clientExponentB64 = 'AgM=';

  async getServerPublicKeyComponents() {
    return { modulusB64: this.serverModulusB64, exponentB64: this.serverExponentB64 };
  }

  async getPeerPublicKeyComponents() {
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
    this.connectCallCount++;
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

  emitState(state: string, error?: string, code?: string) {
    if (!this.socketId) throw new Error('not connected');
    this.stateListeners.forEach((cb) => cb({ id: this.socketId!, state, error, code }));
  }

  reset() {
    this.sentFrames = [];
    this.socketId = null;
    this.dataListeners = [];
    this.stateListeners = [];
    this.connectCallCount = 0;
  }
}

const mockFake = new MockFakeAtvSocket();
jest.mock('@/modules/expo-atv-socket', () => ({ AtvSocket: mockFake }));

const { PairingProtocol } = require('../PairingProtocol');

function encodeMsg(fields: pb.IPairingMessage): Uint8Array {
  const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

describe('PairingProtocol error classification', () => {
  beforeEach(() => {
    mockFake.reset();
  });

  it('handshake reset during pair → TLS_HANDSHAKE', async () => {
    const errors: any[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (_s: string, err: any) => { if (err) errors.push(err); },
    });

    const origConnect = mockFake.connect.bind(mockFake);
    mockFake.connect = async (id: string) => {
      await origConnect(id);
      mockFake.emitState('error', 'SSLHandshakeException: handshake failed', 'TLS_HANDSHAKE');
    };

    await proto.start();

    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe('TLS_HANDSHAKE');
    mockFake.connect = origConnect;
  });

  it('STATUS_BAD_CONFIGURATION → PROTOCOL', async () => {
    const errors: any[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (_s: string, err: any) => { if (err) errors.push(err); },
    });

    await proto.start();

    proto.handle(
      toB64(
        encodeMsg({
          status: pb.Status.STATUS_BAD_CONFIGURATION,
          protocolVersion: 2,
        }),
      ),
    );

    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe('PROTOCOL');
  });

  it('exactly one TLS handshake (no probe)', async () => {
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: () => {},
    });

    await proto.start();

    expect(mockFake.connectCallCount).toBe(1);
  });

  it('error has message and steps', async () => {
    const errors: any[] = [];
    const proto = new PairingProtocol('192.168.1.100', {
      onStep: (_s: string, err: any) => { if (err) errors.push(err); },
    });

    await proto.start();
    mockFake.emitState('error', 'Connection refused');

    expect(errors.length).toBe(1);
    expect(errors[0].message.length).toBeGreaterThan(0);
    expect(errors[0].steps.length).toBeGreaterThanOrEqual(1);
  });
});
