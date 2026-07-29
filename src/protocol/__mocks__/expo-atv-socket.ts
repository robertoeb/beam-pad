// In-memory fake AtvSocket for pairing tests.
// Place in src/modules/__mocks__/expo-atv-socket.ts OR use jest.mock factory.

interface SocketDataEvent {
  id: string;
  base64: string;
}

interface SocketStateEvent {
  id: string;
  state: string;
  error?: string;
}

export class FakeAtvSocket {
  public sentFrames: string[] = [];
  public lastSocketId: string | null = null;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  // Configurable RSA components
  public serverModulusB64 = 'AQIDBA=='; // [1, 2, 3, 4]
  public serverExponentB64 = 'AQID';     // [1, 2, 3]
  public clientModulusB64 = 'BQRFBA==';  // [2, 17, 5, 1]
  public clientExponentB64 = 'AgM=';     // [1, 3]

  async getServerPublicKeyComponents(
    _host: string,
    _port: number,
    _timeoutMs?: number,
  ) {
    return {
      modulusB64: this.serverModulusB64,
      exponentB64: this.serverExponentB64,
    };
  }

  async generateClientCertificate() {
    return {
      pem: 'FAKE_CERT_PEM',
      privateKeyPem: 'FAKE_KEY_PEM',
      modulusB64: this.clientModulusB64,
      exponentB64: this.clientExponentB64,
    };
  }

  async connect(id: string, _host: string, _port: number, _certPem: string, _keyPem: string) {
    this.lastSocketId = id;
    // Immediately emit 'open' to unblock start()
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

  /** Inject a raw base64 frame (already framed) to trigger handle(). */
  injectData(base64: string) {
    if (!this.lastSocketId) throw new Error('socket not connected');
    this.dataListeners.forEach((cb) => cb({ id: this.lastSocketId!, base64 }));
  }
}

// Export as the shape that @/modules/expo-atv-socket expects
const fake = new FakeAtvSocket();

export const AtvSocket = {
  getServerPublicKeyComponents: fake.getServerPublicKeyComponents.bind(fake),
  generateClientCertificate: fake.generateClientCertificate.bind(fake),
  connect: fake.connect.bind(fake),
  send: fake.send.bind(fake),
  close: fake.close.bind(fake),
  onSocketData: fake.onSocketData.bind(fake),
  onSocketState: fake.onSocketState.bind(fake),
  startMicStream: async () => {},
  stopMicStream: () => {},
  onMicData: () => ({ remove: () => {} }),
} as any;

// Expose the fake instance for test assertions
(AtvSocket as any)._fake = fake;
