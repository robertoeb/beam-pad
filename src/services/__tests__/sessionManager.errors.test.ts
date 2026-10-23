import { FrameCodec } from '@/protocol/framing';
import { toB64 } from '@/protocol/bytes';
import { remote as pb } from '@/proto/bundle';

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

class FakeAtvSocket {
  public sentFrames: string[] = [];
  public lastSocketId: string | null = null;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  async connect(id: string, _host: string, _port: number, _certPem: string, _keyPem: string) {
    this.lastSocketId = id;
    this.stateListeners.forEach((cb) => cb({ id, state: 'open' }));
  }

  send(_id: string, base64: string) {
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
    const id = this.lastSocketId ?? 'default';
    this.dataListeners.forEach((cb) => cb({ id, base64 }));
  }

  reset() {
    this.sentFrames = [];
    this.dataListeners = [];
    this.stateListeners = [];
    this.lastSocketId = null;
  }
}

const mockFake = new FakeAtvSocket();
jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: mockFake,
}));

// Required lazily (not imported) so the mock above is fully initialized
// before the session chain pulls in RemoteClient.
const { switchTo, reset } = require('@/services/sessionManager');
const { useDevicesStore } = require('@/stores/devices');
const { useConnectionStore } = require('@/stores/connection');

function encodeMsg(fields: pb.IRemoteMessage): Uint8Array {
  const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

describe('session error handling', () => {
  beforeEach(() => {
    mockFake.reset();
    reset();
    useDevicesStore.setState(useDevicesStore.getInitialState());
    useConnectionStore.setState({ state: 'IDLE', error: undefined });
  });

  it('fast native failure beats the 12s budget', async () => {
    jest.useFakeTimers();
    useDevicesStore.getState().addPaired({
      id: 'tv-err',
      name: 'Err TV',
      host: '10.0.0.5',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    const promise = switchTo('tv-err');
    mockFake.injectData(toB64(encodeMsg({ remoteError: { value: true } })));
    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.elapsedMs).toBeLessThan(12000);
    jest.useRealTimers();
  });

  it('timeout at 12s yields TIMEOUT code', async () => {
    jest.useFakeTimers();
    useDevicesStore.getState().addPaired({
      id: 'tv-slow',
      name: 'Slow TV',
      host: '10.0.0.6',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    const promise = switchTo('tv-slow');
    jest.advanceTimersByTime(12000);
    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.error?.code).toBe('TIMEOUT');
    jest.useRealTimers();
  });
});
