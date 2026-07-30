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

export class FakeAtvSocket {
  public sentFrames: string[] = [];
  public lastSocketId: string | null = null;
  public connectCallCount = 0;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  public serverModulusB64 = 'AQIDBA==';
  public serverExponentB64 = 'AQAB';
  public clientModulusB64 = 'BQRFBA==';
  public clientExponentB64 = 'AgM=';

  async getServerPublicKeyComponents(_host: string, _port: number, _timeoutMs?: number) {
    return {
      modulusB64: this.serverModulusB64,
      exponentB64: this.serverExponentB64,
    };
  }

  async getPeerPublicKeyComponents(_id: string) {
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

  onMicData(_cb: (e: { base64: string }) => void) {
    return { remove: () => {} };
  }

  startMicStream(): Promise<void> {
    return Promise.resolve();
  }
  stopMicStream() {}

  injectData(base64: string) {
    if (!this.lastSocketId) throw new Error('socket not connected');
    this.dataListeners.forEach((cb) => cb({ id: this.lastSocketId!, base64 }));
  }

  emitState(state: string, error?: string, code?: string) {
    if (!this.lastSocketId) throw new Error('socket not connected');
    this.stateListeners.forEach((cb) => cb({ id: this.lastSocketId!, state, error, code }));
  }

  reset() {
    this.sentFrames = [];
    this.lastSocketId = null;
    this.dataListeners = [];
    this.stateListeners = [];
    this.connectCallCount = 0;
  }
}

const fake = new FakeAtvSocket();

export const AtvSocket = {
  getServerPublicKeyComponents: fake.getServerPublicKeyComponents.bind(fake),
  getPeerPublicKeyComponents: fake.getPeerPublicKeyComponents.bind(fake),
  generateClientCertificate: fake.generateClientCertificate.bind(fake),
  connect: fake.connect.bind(fake),
  send: fake.send.bind(fake),
  close: fake.close.bind(fake),
  onSocketData: fake.onSocketData.bind(fake),
  onSocketState: fake.onSocketState.bind(fake),
  startMicStream: fake.startMicStream.bind(fake),
  stopMicStream: fake.stopMicStream.bind(fake),
  onMicData: fake.onMicData.bind(fake),
} as any;

(AtvSocket as any)._fake = fake;
