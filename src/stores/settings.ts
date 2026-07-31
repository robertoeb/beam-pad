import { createPersistedStore } from './createPersistedStore';

export type VolumeTarget = 'tv-os' | 'ir';
export type PowerKeyMode = 'toggle' | 'sleep-wake';
export type Density = 'compact' | 'comfortable' | 'spacious';
export type HapticStrength = 'off' | 'light' | 'medium';
export type OkLongPress = 'none' | 'voice' | 'menu';
export type NavigationMode = 'dpad' | 'touchpad';

export const SETTINGS_VERSION = 1;

interface SettingsState {
  volumeTarget: VolumeTarget;
  irProfileId: string | null;
  irAvailable: boolean;
  haptics: boolean;
  powerKeyMode: PowerKeyMode;
  density: Density;
  hapticStrength: HapticStrength;
  reduceMotion: boolean | 'system';
  showShortcutLabels: boolean;
  volumeStep: 1 | 2 | 5;
  backDoubleTapHome: boolean;
  okLongPress: OkLongPress;
  navigationMode: NavigationMode;
  wakeOnConnect: boolean;
  irPerDevice: Record<string, string>;
  irRepeatCount: number;
  irGapMs: number;
  setVolumeTarget: (t: VolumeTarget) => void;
  setDensity: (d: Density) => void;
  set: (p: Partial<SettingsState>) => void;
}

const defaults = {
  volumeTarget: 'tv-os' as VolumeTarget,
  irProfileId: null as string | null,
  irAvailable: false,
  haptics: true,
  powerKeyMode: 'toggle' as PowerKeyMode,
  density: 'comfortable' as Density,
  hapticStrength: 'light' as HapticStrength,
  reduceMotion: 'system' as boolean | 'system',
  showShortcutLabels: false,
  volumeStep: 1 as 1 | 2 | 5,
  backDoubleTapHome: false,
  okLongPress: 'voice' as OkLongPress,
  navigationMode: 'dpad' as NavigationMode,
  wakeOnConnect: false,
  irPerDevice: {} as Record<string, string>,
  irRepeatCount: 1,
  irGapMs: 40,
};

function migrate(persisted: any, version: number): SettingsState {
  const base = { ...defaults, ...persisted };
  if (version < 1) {
    if (typeof persisted?.haptics === 'boolean') {
      base.hapticStrength = persisted.haptics ? 'light' : 'off';
    }
  }
  return base;
}

export const useSettingsStore = createPersistedStore<SettingsState>(
  {
    name: 'settings',
    version: SETTINGS_VERSION,
    migrate,
    partialize: (s) =>
      ({
        volumeTarget: s.volumeTarget,
        irProfileId: s.irProfileId,
        haptics: s.haptics,
        powerKeyMode: s.powerKeyMode,
        density: s.density,
        hapticStrength: s.hapticStrength,
        reduceMotion: s.reduceMotion,
        showShortcutLabels: s.showShortcutLabels,
        volumeStep: s.volumeStep,
        backDoubleTapHome: s.backDoubleTapHome,
        okLongPress: s.okLongPress,
        navigationMode: s.navigationMode,
        wakeOnConnect: s.wakeOnConnect,
        irPerDevice: s.irPerDevice,
        irRepeatCount: s.irRepeatCount,
        irGapMs: s.irGapMs,
      }) as SettingsState,
  },
  (set) => ({
    ...defaults,
    setVolumeTarget: (volumeTarget) => set({ volumeTarget }),
    setDensity: (density) => set({ density }),
    set: (p) => set(p),
  }),
);
