import { useSettingsStore } from '../settings';

beforeEach(() => {
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: null,
    irAvailable: false,
    haptics: true,
    hapticStrength: 'light',
    powerKeyMode: 'toggle',
    density: 'comfortable',
    reduceMotion: 'system',
    showShortcutLabels: false,
    volumeStep: 1,
    backDoubleTapHome: false,
    okLongPress: 'voice',
    wakeOnConnect: false,
    irPerDevice: {},
    irRepeatCount: 1,
    irGapMs: 40,
  });
});

describe('settings store', () => {
  it('has correct defaults', () => {
    const state = useSettingsStore.getState();
    expect(state.volumeTarget).toBe('tv-os');
    expect(state.irProfileId).toBeNull();
    expect(state.haptics).toBe(true);
    expect(state.hapticStrength).toBe('light');
    expect(state.powerKeyMode).toBe('toggle');
    expect(state.density).toBe('comfortable');
    expect(state.reduceMotion).toBe('system');
    expect(state.volumeStep).toBe(1);
    expect(state.backDoubleTapHome).toBe(false);
    expect(state.okLongPress).toBe('voice');
    expect(state.wakeOnConnect).toBe(false);
    expect(state.irRepeatCount).toBe(1);
    expect(state.irGapMs).toBe(40);
  });

  it('setVolumeTarget updates volumeTarget', () => {
    useSettingsStore.getState().setVolumeTarget('ir');
    expect(useSettingsStore.getState().volumeTarget).toBe('ir');
  });

  it('set merges partial state', () => {
    useSettingsStore.getState().set({ irProfileId: 'samsung-tv-nec', hapticStrength: 'off' });
    const state = useSettingsStore.getState();
    expect(state.irProfileId).toBe('samsung-tv-nec');
    expect(state.hapticStrength).toBe('off');
  });

  it('irAvailable is excluded from persistence (partialize)', () => {
    const partialize = (useSettingsStore as any).persist.getOptions().partialize;
    const fullState = {
      volumeTarget: 'ir',
      irProfileId: 'lg-tv-nec',
      irAvailable: true,
      haptics: false,
      hapticStrength: 'off',
      powerKeyMode: 'sleep-wake',
      density: 'compact',
      reduceMotion: true,
      showShortcutLabels: true,
      volumeStep: 2,
      backDoubleTapHome: true,
      okLongPress: 'menu',
      wakeOnConnect: true,
      irPerDevice: { 'dev-1': 'samsung-tv-nec' },
      irRepeatCount: 3,
      irGapMs: 60,
      setVolumeTarget: () => {},
      setDensity: () => {},
      set: () => {},
    };

    const persisted = partialize(fullState);
    expect(persisted.irAvailable).toBeUndefined();
    expect(persisted.volumeTarget).toBe('ir');
    expect(persisted.irProfileId).toBe('lg-tv-nec');
    expect(persisted.hapticStrength).toBe('off');
    expect(persisted.irPerDevice).toEqual({ 'dev-1': 'samsung-tv-nec' });
  });

  it('persists new settings keys', () => {
    useSettingsStore.getState().set({
      hapticStrength: 'medium',
      reduceMotion: true,
      volumeStep: 5,
      backDoubleTapHome: true,
      okLongPress: 'menu',
      wakeOnConnect: true,
      irPerDevice: { 'dev-1': 'sony-tv-sirc12' },
      irRepeatCount: 3,
      irGapMs: 80,
    });
    const state = useSettingsStore.getState();
    expect(state.hapticStrength).toBe('medium');
    expect(state.reduceMotion).toBe(true);
    expect(state.volumeStep).toBe(5);
    expect(state.backDoubleTapHome).toBe(true);
    expect(state.okLongPress).toBe('menu');
    expect(state.wakeOnConnect).toBe(true);
    expect(state.irPerDevice).toEqual({ 'dev-1': 'sony-tv-sirc12' });
    expect(state.irRepeatCount).toBe(3);
    expect(state.irGapMs).toBe(80);
  });
});
