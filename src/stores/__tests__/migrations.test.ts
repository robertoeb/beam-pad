import { useSettingsStore, SETTINGS_VERSION } from '@/stores/settings';
import { useLayoutStore, LAYOUT_VERSION } from '@/stores/layout';
import { useDevicesStore } from '@/stores/devices';
import { useCapabilitiesStore } from '@/stores/capabilities';
import { mmkvStorage, mmkv } from '@/stores/mmkv';
import { aDevice } from '@/test/factories';

// NOTE: jest-setup.js already mocks 'react-native-mmkv' and the mmkv
// singleton is created at import time, so re-mocking the module here has no
// effect on the live instance. Instead, give the existing mock methods an
// in-memory implementation for the round-trip test below.
const mockMem: Record<string, string> = {};
beforeEach(() => {
  for (const k of Object.keys(mockMem)) delete mockMem[k];
  // jest-setup's MMKV mock uses a plain fn for getString, so assign directly.
  (mmkv as any).getString = (k: string) => (k in mockMem ? mockMem[k]! : undefined);
  (mmkv as any).set = (k: string, v: string) => {
    mockMem[k] = v;
  };
  (mmkv as any).remove = (k: string) => {
    delete mockMem[k];
  };
});

function settingsMigrate() {
  return (useSettingsStore as any).persist.getOptions().migrate;
}

function layoutMigrate() {
  return (useLayoutStore as any).persist.getOptions().migrate;
}

beforeEach(() => {
  for (const k of Object.keys(mockMem)) delete mockMem[k];
});

describe('settings migrations', () => {
  it(`current version is ${SETTINGS_VERSION} and drops legacy irAvailable`, () => {
    expect(SETTINGS_VERSION).toBe(2);
    const out = settingsMigrate()(
      { volumeTarget: 'ir', irAvailable: true, haptics: true },
      1,
    );
    expect(out.irAvailable).toBe(false);
    expect(out.volumeTarget).toBe('ir');
  });

  it('v0 haptics:false still maps to hapticStrength:off through v2', () => {
    const out = settingsMigrate()({ haptics: false }, 0);
    expect(out.hapticStrength).toBe('off');
    expect(out.irAvailable).toBe(false);
  });

  it('partialize never persists irAvailable (backwards compat)', () => {
    const partialize = (useSettingsStore as any).persist.getOptions().partialize;
    const persisted = partialize({
      ...useSettingsStore.getState(),
      irAvailable: true,
    });
    expect(persisted.irAvailable).toBeUndefined();
  });

  it('capabilities store holds runtime irAvailable instead', () => {
    useCapabilitiesStore.getState().setIrAvailable(true);
    expect(useCapabilitiesStore.getState().irAvailable).toBe(true);
  });
});

describe('layout migrations', () => {
  it(`current version is ${LAYOUT_VERSION}`, () => {
    expect(LAYOUT_VERSION).toBe(1);
  });

  it('migrates v0 pinned ids to namespaced shortcut ids', () => {
    const out = layoutMigrate()({ pinned: ['netflix', 'key:power'], moreSheetOpen: true }, 0);
    expect(out.shortcuts).toEqual(['app:netflix', 'key:power']);
    expect(out.moreSheetOpen).toBe(true);
  });

  it('keeps already-namespaced ids untouched', () => {
    const out = layoutMigrate()({ pinned: ['app:youtube', 'user:abc'] }, 0);
    expect(out.shortcuts).toEqual(['app:youtube', 'user:abc']);
  });

  it('empty pinned list keeps defaults', () => {
    const out = layoutMigrate()({ pinned: [] }, 0);
    expect(out.shortcuts).toEqual(['app:netflix', 'app:youtube', 'app:prime', 'app:disney']);
  });
});

describe('persistence round-trip via MMKV mock', () => {
  it('devices partialize keeps paired+active only', () => {
    const partialize = (useDevicesStore as any).persist.getOptions().partialize;
    const persisted = partialize({
      ...useDevicesStore.getState(),
      found: { '1.2.3.4': { name: 'X', host: '1.2.3.4', port: 6466, txt: {}, lastSeen: 0 } },
      paired: { 'tv-1': aDevice() },
      activeDeviceId: 'tv-1',
      scanning: true,
    });
    expect(Object.keys(persisted).sort()).toEqual(['activeDeviceId', 'paired']);
  });

  it('settings JSON survives stringify/parse with expected keys', () => {
    const partialize = (useSettingsStore as any).persist.getOptions().partialize;
    const persisted = partialize({
      ...useSettingsStore.getState(),
      irProfileId: 'samsung-tv-nec',
    });
    const json = JSON.stringify({ state: persisted, version: SETTINGS_VERSION });
    const parsed = JSON.parse(json);
    expect(parsed.state.irProfileId).toBe('samsung-tv-nec');
    expect('irAvailable' in parsed.state).toBe(false);
    expect(parsed.version).toBe(SETTINGS_VERSION);
  });

  it('mmkvStorage setItem/getItem round-trips', async () => {
    await mmkvStorage.setItem('rt-key', '{"a":1}');
    expect(await mmkvStorage.getItem('rt-key')).toBe('{"a":1}');
    await mmkvStorage.removeItem('rt-key');
    expect(await mmkvStorage.getItem('rt-key')).toBeNull();
  });
});
