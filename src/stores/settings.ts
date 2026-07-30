import { createPersistedStore } from './createPersistedStore';

export type VolumeTarget = 'tv-os' | 'ir';
export type PowerKeyMode = 'toggle' | 'sleep-wake';
export type Density = 'compact' | 'comfortable' | 'spacious';

interface SettingsState {
  volumeTarget: VolumeTarget;
  irProfileId: string | null;
  irAvailable: boolean;
  haptics: boolean;
  powerKeyMode: PowerKeyMode;
  density: Density;
  setVolumeTarget: (t: VolumeTarget) => void;
  setDensity: (d: Density) => void;
  set: (p: Partial<SettingsState>) => void;
}

export const useSettingsStore = createPersistedStore<SettingsState>(
  {
    name: 'settings',
    partialize: (s) =>
      ({
        volumeTarget: s.volumeTarget,
        irProfileId: s.irProfileId,
        haptics: s.haptics,
        powerKeyMode: s.powerKeyMode,
        density: s.density,
      }) as SettingsState,
  },
  (set) => ({
    volumeTarget: 'tv-os',
    irProfileId: null,
    irAvailable: false,
    haptics: true,
    powerKeyMode: 'toggle',
    density: 'comfortable',
    setVolumeTarget: (volumeTarget) => set({ volumeTarget }),
    setDensity: (density) => set({ density }),
    set: (p) => set(p),
  }),
);
