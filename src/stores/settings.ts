import { createPersistedStore } from './createPersistedStore';

export type VolumeTarget = 'tv-os' | 'ir';
export type PowerKeyMode = 'toggle' | 'sleep-wake';

interface SettingsState {
  volumeTarget: VolumeTarget;
  irProfileId: string | null;
  irAvailable: boolean;
  haptics: boolean;
  powerKeyMode: PowerKeyMode;
  setVolumeTarget: (t: VolumeTarget) => void;
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
      }) as SettingsState,
  },
  (set) => ({
    volumeTarget: 'tv-os',
    irProfileId: null,
    irAvailable: false,
    haptics: true,
    powerKeyMode: 'toggle',
    setVolumeTarget: (volumeTarget) => set({ volumeTarget }),
    set: (p) => set(p),
  }),
);
