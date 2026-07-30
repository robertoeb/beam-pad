import { useSettingsStore } from '../settings';

beforeEach(() => {
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: null,
    irAvailable: false,
    haptics: true,
    powerKeyMode: 'toggle',
  });
});

describe('settings store', () => {
  it('has correct defaults', () => {
    const state = useSettingsStore.getState();
    expect(state.volumeTarget).toBe('tv-os');
    expect(state.irProfileId).toBeNull();
    expect(state.haptics).toBe(true);
    expect(state.powerKeyMode).toBe('toggle');
  });

  it('setVolumeTarget updates volumeTarget', () => {
    useSettingsStore.getState().setVolumeTarget('ir');
    expect(useSettingsStore.getState().volumeTarget).toBe('ir');
  });

  it('set merges partial state', () => {
    useSettingsStore.getState().set({ irProfileId: 'samsung-tv-nec', haptics: false });
    const state = useSettingsStore.getState();
    expect(state.irProfileId).toBe('samsung-tv-nec');
    expect(state.haptics).toBe(false);
  });

  it('irAvailable is excluded from persistence (partialize)', () => {
    const partialize = (useSettingsStore as any).persist.getOptions().partialize;
    const fullState = {
      volumeTarget: 'ir',
      irProfileId: 'lg-tv-nec',
      irAvailable: true,
      haptics: false,
      powerKeyMode: 'sleep-wake',
      setVolumeTarget: () => {},
      set: () => {},
    };

    const persisted = partialize(fullState);
    expect(persisted.irAvailable).toBeUndefined();
    expect(persisted.volumeTarget).toBe('ir');
    expect(persisted.irProfileId).toBe('lg-tv-nec');
    expect(persisted.haptics).toBe(false);
    expect(persisted.powerKeyMode).toBe('sleep-wake');
  });
});
