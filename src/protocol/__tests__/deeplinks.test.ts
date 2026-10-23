import { TV_APPS, getApp, byPackage } from '../deeplinks';
import { FrameCodec } from '../framing';
import { toB64, fromB64 } from '../bytes';
import { remote as pb } from '@/proto/bundle';

// ─── Fake AtvSocket ────────────────────────────────────────────────────────

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

const mockFake = new TestFakeAtvSocket();
jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: mockFake,
}));

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

afterEach(() => {
  mockFake.reset();
  const { reset } = require('@/services/session');
  reset();
  const { useDevicesStore } = require('@/stores/devices');
  useDevicesStore.getState().setActive(null);
});

// ─── Catalog Integrity ─────────────────────────────────────────────────────

describe('deeplinks catalog integrity', () => {
  it('all ids are unique', () => {
    const ids = TV_APPS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all packageNames are unique', () => {
    const pkgs = TV_APPS.map((a) => a.packageName);
    expect(new Set(pkgs).size).toBe(pkgs.length);
  });

  it('all deepLinks are non-empty', () => {
    for (const app of TV_APPS) {
      expect(app.deepLink.length).toBeGreaterThan(0);
    }
  });

  it('all initials are ≤ 3 chars', () => {
    for (const app of TV_APPS) {
      expect([...app.initials].length).toBeLessThanOrEqual(3);
    }
  });

  it('seed pinned ids resolve to catalog entries', () => {
    const { useLayoutStore } = require('@/stores/layout');
    const shortcuts = useLayoutStore.getState().shortcuts;
    for (const id of shortcuts) {
      if (id.startsWith('app:')) {
        const appId = id.split(':')[1];
        expect(getApp(appId)).toBeDefined();
      }
    }
  });

  it('getApp returns correct entry', () => {
    const netflix = getApp('netflix');
    expect(netflix).toBeDefined();
    expect(netflix!.name).toBe('Netflix');
    expect(netflix!.packageName).toBe('com.netflix.ninja');
  });

  it('getApp returns undefined for unknown id', () => {
    expect(getApp('nonexistent')).toBeUndefined();
  });

  it('byPackage returns correct entry', () => {
    const yt = byPackage('com.google.android.youtube.tv');
    expect(yt).toBeDefined();
    expect(yt!.id).toBe('youtube');
  });

  it('byPackage returns undefined for unknown package', () => {
    expect(byPackage('com.unknown.app')).toBeUndefined();
  });
});

// ─── Launch Frame ──────────────────────────────────────────────────────────

describe('deeplinks launch frame', () => {
  it('launchApp(netflix) sends correct remoteAppLinkLaunchRequest', async () => {
    const { useDevicesStore } = require('@/stores/devices');
    useDevicesStore.getState().addPaired(createDevice() as any);
    useDevicesStore.getState().setActive(null);

    const { switchTo } = require('@/services/session');
    const switchPromise = switchTo('tv1');

    mockFake.injectData(toB64(encodeMsg({ remoteConfigure: { code1: 622 } })));
    await switchPromise;

    mockFake.sentFrames = [];
    const { launchApp } = require('@/services/apps');
    const result = launchApp('netflix');

    expect(result).toBe(true);
    expect(mockFake.sentFrames.length).toBe(1);

    const frame = fromB64(mockFake.sentFrames[0]!);
    const codec = new FrameCodec();
    const payloads = codec.push(frame);
    const msg = pb.RemoteMessage.decode(payloads[0]!);
    expect(msg.remoteAppLinkLaunchRequest?.appLink).toBe('https://www.netflix.com/title.*');

    const { reset } = require('@/services/session');
    reset();
  });

  it('launchApp returns false with no active client', () => {
    const { reset } = require('@/services/session');
    reset();

    const { launchApp } = require('@/services/apps');
    const result = launchApp('youtube');
    expect(result).toBe(false);
  });

  it('launchApp returns false for unknown id', () => {
    const { launchApp } = require('@/services/apps');
    const result = launchApp('nonexistent');
    expect(result).toBe(false);
  });
});

// ─── Layout Store Extensions ───────────────────────────────────────────────

describe('layoutStore add/remove/moveShortcut', () => {
  beforeEach(() => {
    const { useLayoutStore } = require('@/stores/layout');
    useLayoutStore.setState({
      shortcuts: ['app:netflix', 'app:youtube', 'app:prime', 'app:disney'],
      hidden: [],
    });
  });

  it('addShortcut adds without duplicating', () => {
    const { useLayoutStore } = require('@/stores/layout');
    useLayoutStore.getState().addShortcut('app:hulu');
    expect(useLayoutStore.getState().shortcuts).toContain('app:hulu');

    useLayoutStore.getState().addShortcut('app:hulu');
    const count = useLayoutStore
      .getState()
      .shortcuts.filter((id: string) => id === 'app:hulu').length;
    expect(count).toBe(1);
  });

  it('removeShortcut removes shortcut', () => {
    const { useLayoutStore } = require('@/stores/layout');
    useLayoutStore.getState().removeShortcut('app:netflix');
    expect(useLayoutStore.getState().shortcuts).not.toContain('app:netflix');
  });

  it('moveShortcut reorders correctly', () => {
    const { useLayoutStore } = require('@/stores/layout');
    const before = useLayoutStore.getState().shortcuts;
    expect(before[0]).toBe('app:netflix');

    useLayoutStore.getState().moveShortcut(0, 3);
    const after = useLayoutStore.getState().shortcuts;
    expect(after[0]).toBe('app:youtube');
    expect(after[3]).toBe('app:netflix');
    expect(after.length).toBe(before.length);
  });

  it('moveShortcut preserves all items', () => {
    const { useLayoutStore } = require('@/stores/layout');
    const before = [...useLayoutStore.getState().shortcuts];

    useLayoutStore.getState().moveShortcut(2, 0);
    const after = useLayoutStore.getState().shortcuts;

    expect([...after].sort()).toEqual([...before].sort());
  });
});
