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
  public lastSocketId: string | null = null;

  private dataListeners: Array<(e: SocketDataEvent) => void> = [];
  private stateListeners: Array<(e: SocketStateEvent) => void> = [];

  async connect(id: string, _host: string, _port: number, _certPem: string, _keyPem: string) {
    this.lastSocketId = id;
    this.stateListeners.forEach((cb) => cb({ id, state: 'open' }));
  }

  send(_id: string, _base64: string) {}

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
    this.dataListeners = [];
    this.stateListeners = [];
    this.lastSocketId = null;
  }
}

const mockFake = new FakeAtvSocket();
jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: mockFake,
}));

function encodeMsg(fields: pb.IRemoteMessage): Uint8Array {
  const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

// Required lazily (not imported) so the mock above is fully initialized
// before the session chain pulls in RemoteClient. This exercises the
// deprecated path on purpose: sessionManager must stay a working thin
// re-export of the session facade.
const { switchTo, getClient, reset } = require('@/services/sessionManager');
const { useDevicesStore } = require('@/stores/devices');
const { useConnectionStore } = require('@/stores/connection');

describe('sessionManager (session re-export)', () => {
  beforeEach(() => {
    mockFake.reset();
    reset();
    useDevicesStore.setState(useDevicesStore.getInitialState());
    useConnectionStore.setState({ state: 'IDLE', error: undefined });
  });

  it('switchTo connects and reports elapsedMs under budget', async () => {
    useDevicesStore.getState().addPaired({
      id: 'tv-1',
      name: 'Living Room',
      host: '10.0.0.2',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    const promise = switchTo('tv-1');
    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    const result = await promise;

    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBeLessThan(12000);
    expect(useDevicesStore.getState().activeDeviceId).toBe('tv-1');
    expect(getClient()).not.toBeNull();
    expect(useConnectionStore.getState().state).toBe('ACTIVE');
  });

  it('switchTo returns elapsedMs 0 when already active', async () => {
    useDevicesStore.getState().setActive('tv-1');

    const result = await switchTo('tv-1');

    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBe(0);
  });

  it('switchTo surfaces fast native failure', async () => {
    useDevicesStore.getState().addPaired({
      id: 'tv-2',
      name: 'Bedroom',
      host: '10.0.0.3',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    const promise = switchTo('tv-2');
    mockFake.injectData(toB64(encodeMsg({ remoteError: { value: true } })));
    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.elapsedMs).toBeLessThan(12000);
  });
});
