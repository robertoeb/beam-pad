import { FrameCodec } from '../framing';
import { toB64, fromB64 } from '../bytes';
import { remote as pb } from '@/proto/bundle';
import { useConnectionStore } from '@/stores/connection';
import { useDevicesStore } from '@/stores/devices';
import { useImeStore } from '@/stores/ime';
import type { RemoteClientEvents, Telemetry } from '../RemoteClient';

// ─── Fake AtvSocket (inline mock for this test file) ───────────────────

interface SocketDataEvent {
  id: string;
  base64: string;
}

interface SocketStateEvent {
  id: string;
  state: string;
  error?: string;
}

class TestFakeAtvSocket {
  public sentFrames: string[] = [];
  public lastSocketId: string | null = null;
  public client: any = null;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  async getServerPublicKeyComponents(_host: string, _port: number, _t?: number) {
    return { modulusB64: '', exponentB64: '' };
  }

  async generateClientCertificate() {
    return {
      pem: 'FAKE_CERT',
      privateKeyPem: 'FAKE_KEY',
      modulusB64: '',
      exponentB64: '',
    };
  }

  async connect(id: string, _host: string, _port: number, _certPem: string, _keyPem: string) {
    this.lastSocketId = id;
    this.stateListeners.forEach((cb) => cb({ id, state: 'open' }));
  }

  send(id: string, base64: string) {
    this.sentFrames.push(base64);
  }

  close(_id: string) {}

  onSocketData(cb: (e: SocketDataEvent) => void) {
    this.dataListeners.push(cb);
    return {
      remove: () => this.dataListeners.splice(this.dataListeners.indexOf(cb), 1),
    };
  }

  onSocketState(cb: (e: SocketStateEvent) => void) {
    this.stateListeners.push(cb);
    return {
      remove: () => this.stateListeners.splice(this.stateListeners.indexOf(cb), 1),
    };
  }

  onMicData(_cb: (e: { base64: string }) => void) {
    return { remove: () => {} };
  }

  startMicStream(): Promise<void> {
    return Promise.resolve();
  }

  stopMicStream() {}

  injectData(base64: string) {
    const id = this.lastSocketId ?? 'default';
    this.dataListeners.forEach((cb) => cb({ id, base64 }));
  }

  emitState(state: string, error?: string) {
    const id = this.lastSocketId ?? 'default';
    this.stateListeners.forEach((cb) => cb({ id, state, error }));
  }

  reset() {
    this.sentFrames = [];
    this.dataListeners = [];
    this.stateListeners = [];
    this.lastSocketId = null;
  }
}

const mockFake = new TestFakeAtvSocket();
jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: mockFake,
}));

// Re-import after mock hoisting
const mod = require('../RemoteClient');
const RemoteClient = mod.RemoteClient;

// ─── Helpers ───────────────────────────────────────────────────────────────

function encodeMsg(fields: pb.IRemoteMessage): Uint8Array {
  const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

function createDevice(overrides = {}) {
  return {
    id: 'tv1',
    name: 'Test TV',
    host: '192.168.1.100',
    port: 6467,
    certPem: 'FAKE_CERT',
    keyPem: 'FAKE_KEY',
    ...overrides,
  };
}

function createClient(events: RemoteClientEvents, deviceOverrides?: Record<string, unknown>) {
  return new RemoteClient(createDevice(deviceOverrides), events);
}

afterEach(() => {
  mockFake.reset();
  useConnectionStore.setState({
    state: 'IDLE',
    error: undefined,
    powerOn: undefined,
    volume: undefined,
    currentApp: undefined,
  });
  useImeStore.setState({ visible: false, field: null });
});

// ─── Golden Vectors ────────────────────────────────────────────────────────

describe('RemoteClient golden vectors', () => {
  it('GV1: Configure frame — first outbound after open', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    expect(states).toContain('CONNECTING');
    expect(states).toContain('CONFIGURING');
    expect(mockFake.sentFrames.length).toBeGreaterThanOrEqual(1);

    const first = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(first);
    expect(payloads.length).toBe(1);
    const msg = pb.RemoteMessage.decode(payloads[0]!);
    expect(msg.remoteConfigure?.code1).toBe(622);
    expect(msg.remoteConfigure?.deviceInfo?.packageName).toBe('com.beampad.app');
  });

  it('GV2: Activation — server configure → setActive + ACTIVE state', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;
    expect(states).toContain('CONFIGURING');

    // Inject server RemoteConfigure
    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteConfigure: {
            code1: 622,
            deviceInfo: {
              model: 'Samsung QLED',
              vendor: 'Samsung',
              packageName: 'com.sec.android.app.remote',
            },
          },
        }),
      ),
    );

    expect(states).toContain('ACTIVE');
    // Client emitted RemoteSetActive
    expect(mockFake.sentFrames.length).toBeGreaterThanOrEqual(2);
    const setActiveFrame = fromB64(mockFake.sentFrames[1]!);
    const codec2 = new FrameCodec();
    const payloads2 = codec2.push(setActiveFrame);
    const setActiveMsg = pb.RemoteMessage.decode(payloads2[0]!);
    expect(setActiveMsg.remoteSetActive?.active).toBe(622);
  });

  it('GV3: Key inject — keyPress(VOLUME_UP) exact bytes', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;
    expect(states).toContain('ACTIVE');

    mockFake.sentFrames = [];
    client.keyPress(24);

    expect(mockFake.sentFrames.length).toBe(1);
    const framed = fromB64(mockFake.sentFrames[0]!);
    // Expected: [6, 82, 4, 8, 24, 16, 3]
    // 6 = varint length, 82,4 = field 10 length 4, 8,24 = keyCode=24, 16,3 = direction=SHORT
    expect(Array.from(framed)).toEqual([6, 82, 4, 8, 24, 16, 3]);
  });

  it('GV4: Long press — START_LONG and END_LONG', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    client.keyLongStart(26);
    const startFrame = fromB64(mockFake.sentFrames[0]!);
    // [82,4,8,26,16,1] with length prefix 6
    expect(Array.from(startFrame)).toEqual([6, 82, 4, 8, 26, 16, 1]);

    mockFake.sentFrames = [];
    client.keyLongEnd(26);
    const endFrame = fromB64(mockFake.sentFrames[0]!);
    // [82,4,8,26,16,2] with length prefix 6
    expect(Array.from(endFrame)).toEqual([6, 82, 4, 8, 26, 16, 2]);
  });

  it('GV5: Ping/pong — echo val1', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    mockFake.injectData(toB64(encodeMsg({ remotePingRequest: { val1: 25, val2: 99 } })));

    expect(mockFake.sentFrames.length).toBe(1);
    const pongFrame = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(pongFrame);
    const pongMsg = pb.RemoteMessage.decode(payloads[0]!);
    expect(pongMsg.remotePingResponse?.val1).toBe(25);
  });

  it('GV6: Telemetry — power and volume', async () => {
    const telemetry: any[] = [];
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: (t: Partial<Telemetry>) => telemetry.push(t),
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    // Power state
    mockFake.injectData(toB64(encodeMsg({ remoteStart: { started: true } })));
    expect(telemetry[telemetry.length - 1].powerOn).toBe(true);

    // Volume
    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteSetVolumeLevel: {
            volumeMax: 20,
            volumeLevel: 9,
            volumeMuted: false,
            playerModel: 'TPM191E',
          },
        }),
      ),
    );
    const vol = telemetry[telemetry.length - 1].volume;
    expect(vol.level).toBe(9);
    expect(vol.max).toBe(20);
    expect(vol.muted).toBe(false);
    expect(vol.playerModel).toBe('TPM191E');
  });

  it('GV7: Reconnect — backoff and ERROR_STATE after 6 failures', async () => {
    jest.useFakeTimers();
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;
    expect(states).toContain('ACTIVE');

    // Drop 1 → RECONNECTING, advance 500ms → reconnect
    states.length = 0;
    mockFake.emitState('closed', 'wifi drop');
    expect(states[0]).toBe('RECONNECTING');
    jest.advanceTimersByTime(500);
    expect(states).toContain('CONNECTING');

    // Drop 2 → 1000ms backoff
    states.length = 0;
    mockFake.emitState('closed', 'wifi drop');
    expect(states[0]).toBe('RECONNECTING');
    jest.advanceTimersByTime(1000);
    expect(states).toContain('CONNECTING');

    // Drop 3 → 2000ms
    states.length = 0;
    mockFake.emitState('closed', 'wifi drop');
    jest.advanceTimersByTime(2000);
    expect(states).toContain('CONNECTING');

    // Drop 4 → 4000ms
    states.length = 0;
    mockFake.emitState('closed', 'wifi drop');
    jest.advanceTimersByTime(4000);
    expect(states).toContain('CONNECTING');

    // Drop 5 → 8000ms
    states.length = 0;
    mockFake.emitState('closed', 'wifi drop');
    jest.advanceTimersByTime(8000);
    expect(states).toContain('CONNECTING');

    // Drop 6 → ERROR_STATE (reconnectAttempt >= 5)
    states.length = 0;
    mockFake.emitState('closed', 'final drop');
    expect(states[0]).toBe('ERROR_STATE');

    jest.useRealTimers();
  });

  it('GV8: setVolumeLevel echo — echoes last known TV state', async () => {
    const telemetry: any[] = [];
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: (t: Partial<Telemetry>) => telemetry.push(t),
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    // TV pushes volume state
    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteSetVolumeLevel: {
            volumeMax: 20,
            volumeLevel: 9,
            volumeMuted: false,
            playerModel: 'TPM191E',
          },
        }),
      ),
    );

    mockFake.sentFrames = [];
    client.setVolumeLevel(10);

    expect(mockFake.sentFrames.length).toBe(1);
    const frame = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(frame);
    const msg = pb.RemoteMessage.decode(payloads[0]!);
    expect(msg.remoteSetVolumeLevel?.volumeLevel).toBe(10);
    expect(msg.remoteSetVolumeLevel?.volumeMax).toBe(20);
    expect(msg.remoteSetVolumeLevel?.playerModel).toBe('TPM191E');
    expect(msg.remoteSetVolumeLevel?.volumeMuted).toBe(false);
  });
});

// ─── Inbound Message Handlers ──────────────────────────────────────────────

describe('RemoteClient inbound handlers', () => {
  function activateClient() {
    const states: string[] = [];
    const telemetry: any[] = [];
    const imeShows: any[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: (t: Partial<Telemetry>) => telemetry.push(t),
      onImeShow: (s: pb.IRemoteTextFieldStatus) => imeShows.push(s),
    });
    return { states, telemetry, imeShows, client };
  }

  it('handles remoteSetActive (no-op, server push)', async () => {
    const { states, client } = activateClient();
    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.injectData(toB64(encodeMsg({ remoteSetActive: { active: 622 } })));
    // setActive from server is not a state change trigger
    expect(states).not.toContain('ERROR_STATE');
  });

  it('handles remoteImeKeyInject with app info → currentApp telemetry', async () => {
    const { telemetry, client } = activateClient();
    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteImeKeyInject: {
            appInfo: {
              label: 'Netflix',
              appPackage: 'com.netflix.ninja',
            },
          },
        }),
      ),
    );
    expect(telemetry[telemetry.length - 1].currentApp).toEqual({
      label: 'Netflix',
      packageName: 'com.netflix.ninja',
    });
  });

  it('handles remoteImeShowRequest → onImeShow', async () => {
    const { imeShows, client } = activateClient();
    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteImeShowRequest: {
            remoteTextFieldStatus: {
              counterField: 1,
              value: 'hello',
              start: 0,
              end: 5,
              label: 'Search',
            },
          },
        }),
      ),
    );
    expect(imeShows.length).toBe(1);
    expect(imeShows[0].value).toBe('hello');
    expect(imeShows[0].label).toBe('Search');
  });

  it('handles remoteError → ERROR_STATE', async () => {
    const { states, client } = activateClient();
    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.injectData(toB64(encodeMsg({ remoteError: { value: true } })));
    expect(states).toContain('ERROR_STATE');
  });

  it('tolerates unknown fields (forward compat)', async () => {
    const { states, telemetry, client } = activateClient();
    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    // Inject a frame with an unknown field number in RemoteMessage
    // Build raw protobuf bytes with field 999 (unknown, length-delimited tag 7994)
    const unknownPayload = new Uint8Array([0xba, 0x3e, 0x01, 0x42]);
    const framed = toB64(FrameCodec.encode(unknownPayload));
    expect(() => mockFake.injectData(framed)).not.toThrow();
    expect(states).not.toContain('ERROR_STATE');
  });
});

// ─── Reconnect Matrix ──────────────────────────────────────────────────────

describe('RemoteClient reconnect matrix', () => {
  it('exact backoff: 500→1000→2000→4000→8000', async () => {
    jest.useFakeTimers();
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    const delays = [500, 1000, 2000, 4000, 8000];
    for (let i = 0; i < 5; i++) {
      states.length = 0;
      mockFake.emitState('closed', 'drop');
      expect(states[0]).toBe('RECONNECTING');
      // Before the delay, no reconnect yet
      jest.advanceTimersByTime(delays[i]! - 1);
      expect(states).not.toContain('CONNECTING');
      // After the delay, reconnect fires
      jest.advanceTimersByTime(1);
      expect(states).toContain('CONNECTING');
    }

    jest.useRealTimers();
  });

  it('destroy() cancels pending reconnect timer', async () => {
    jest.useFakeTimers();
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    states.length = 0;
    mockFake.emitState('closed', 'drop');
    expect(states[0]).toBe('RECONNECTING');

    client.destroy();
    jest.advanceTimersByTime(10000);
    expect(states).not.toContain('CONNECTING');
    expect(states).toContain('IDLE');

    jest.useRealTimers();
  });

  it('successful configure resets attempt counter', async () => {
    jest.useFakeTimers();
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    // Drop and reconnect once (attempt → 1)
    states.length = 0;
    mockFake.emitState('closed', 'drop');
    jest.advanceTimersByTime(500);
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    expect(states).toContain('ACTIVE');

    // Drop again — should use 500ms (attempt reset to 0, then incremented to 1)
    states.length = 0;
    mockFake.emitState('closed', 'drop');
    jest.advanceTimersByTime(499);
    expect(states).not.toContain('CONNECTING');
    jest.advanceTimersByTime(1);
    expect(states).toContain('CONNECTING');

    jest.useRealTimers();
  });
});

// ─── Keepalive ─────────────────────────────────────────────────────────────

describe('RemoteClient keepalive', () => {
  it('3 scripted pings → 3 pongs echoing val1', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    const pongs: number[] = [];
    for (const val of [10, 20, 30]) {
      mockFake.sentFrames = [];
      mockFake.injectData(toB64(encodeMsg({ remotePingRequest: { val1: val } })));
      expect(mockFake.sentFrames.length).toBe(1);
      const frame = fromB64(mockFake.sentFrames[0]!);
      const codec = new FrameCodec();
      const payloads = codec.push(frame);
      const msg = pb.RemoteMessage.decode(payloads[0]!);
      pongs.push(msg.remotePingResponse?.val1 ?? -1);
    }

    expect(pongs).toEqual([10, 20, 30]);
  });

  it('no crash when server closes during keepalive', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    expect(() => {
      mockFake.emitState('closed', 'server closed');
    }).not.toThrow();
    expect(states).toContain('RECONNECTING');
  });
});

// ─── sessionManager Binder ─────────────────────────────────────────────────

describe('sessionManager binder', () => {
  beforeEach(() => {
    const { __testSetCurrent } = require('@/services/sessionManager');
    __testSetCurrent(null);
    mockFake.client = null;
    useDevicesStore.getState().addPaired(createDevice() as any);
    useDevicesStore.getState().setActive(null);
    useConnectionStore.setState({ state: 'IDLE', error: undefined });
  });

  it('connector resolves on ACTIVE', async () => {
    jest.useFakeTimers();
    const { switchTo } = require('@/services/sessionManager');
    const switchPromise = switchTo('tv1');
    // Inject server configure to trigger ACTIVE state
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    const result = await switchPromise;
    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBeGreaterThanOrEqual(0);

    expect(useConnectionStore.getState().state).toBe('ACTIVE');
    jest.useRealTimers();
  });

  it('connector rejects on timeout', async () => {
    jest.useFakeTimers();
    const { switchTo } = require('@/services/sessionManager');
    const switchPromise = switchTo('tv1');
    // Don't inject server configure — let timeout fire
    jest.advanceTimersByTime(6000);
    const result = await switchPromise;
    expect(result.ok).toBe(false);
    expect(result.error).toContain('timeout');
    jest.useRealTimers();
  });

  it('connector rejects on ERROR_STATE', async () => {
    jest.useFakeTimers();
    const { switchTo } = require('@/services/sessionManager');
    const switchPromise = switchTo('tv1');
    // Simulate connection drop before ACTIVE
    mockFake.emitState('closed', 'auth failed');
    jest.advanceTimersByTime(6000);
    const result = await switchPromise;
    expect(result.ok).toBe(false);
    jest.useRealTimers();
  });

  it('telemetry merges into connectionStore', async () => {
    jest.useFakeTimers();
    const { switchTo } = require('@/services/sessionManager');
    const switchPromise = switchTo('tv1');
    // Activate connection
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await switchPromise;

    // Inject volume telemetry
    mockFake.injectData(
      toB64(
        encodeMsg({
          remoteSetVolumeLevel: {
            volumeMax: 30,
            volumeLevel: 15,
            volumeMuted: true,
            playerModel: 'TPS750',
          },
        }),
      ),
    );

    const store = useConnectionStore.getState();
    expect(store.volume?.level).toBe(15);
    expect(store.volume?.max).toBe(30);
    expect(store.volume?.muted).toBe(true);

    jest.useRealTimers();
  });

  it('getActiveClient() identity stable', async () => {
    jest.useFakeTimers();
    const { switchTo, getActiveClient } = require('@/services/sessionManager');
    const switchPromise = switchTo('tv1');
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await switchPromise;

    const client1 = getActiveClient();
    const client2 = getActiveClient();
    expect(client1).toBe(client2);
    expect(client1).not.toBeNull();

    jest.useRealTimers();
  });
});

// ─── Public API ────────────────────────────────────────────────────────────

describe('RemoteClient public API', () => {
  it('launchApp sends app link', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    client.launchApp('https://www.netflix.com/title/123');

    expect(mockFake.sentFrames.length).toBe(1);
    const frame = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(frame);
    const msg = pb.RemoteMessage.decode(payloads[0]!);
    expect(msg.remoteAppLinkLaunchRequest?.appLink).toBe('https://www.netflix.com/title/123');
  });

  it('imeBatchEdit sends batch', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    client.imeBatchEdit({
      imeCounter: 1,
      fieldCounter: 1,
      editInfo: [{ insert: 1 }],
    });

    expect(mockFake.sentFrames.length).toBe(1);
    const frame = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(frame);
    const msg = pb.RemoteMessage.decode(payloads[0]!);
    expect(msg.remoteImeBatchEdit?.imeCounter).toBe(1);
  });

  it('voice pipeline: begin → payload → end', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    client.voiceBegin(42);
    client.voicePayload(42, new Uint8Array([0x00, 0x01, 0x02]));
    client.voiceEnd(42);

    expect(mockFake.sentFrames.length).toBe(3);

    const codec = new FrameCodec();
    const frames = mockFake.sentFrames.map((f) => {
      const payloads = codec.push(fromB64(f));
      return pb.RemoteMessage.decode(payloads[0]!);
    });

    expect(frames[0]!.remoteVoiceBegin?.sessionId).toBe(42);
    expect(frames[1]!.remoteVoicePayload?.sessionId).toBe(42);
    expect(frames[2]!.remoteVoiceEnd?.sessionId).toBe(42);
  });

  it('setVolumeLevel no-op without lastVolume', async () => {
    const states: string[] = [];
    const client = createClient({
      onState: (s: string, _error?: string) => states.push(s),
      onTelemetry: () => {},
      onImeShow: () => {},
    });

    const connectPromise = client.connect();
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await connectPromise;

    mockFake.sentFrames = [];
    client.setVolumeLevel(5);

    expect(mockFake.sentFrames.length).toBe(0);
  });
});
