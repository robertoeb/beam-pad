import { createPersistedStore } from './createPersistedStore';

export interface FoundDevice {
  name: string;
  host: string;
  port: number;
  txt: Record<string, string>;
  lastSeen: number;
}

export interface PairedDevice {
  id: string;
  name: string;
  host: string;
  port: number;
  certPem: string;
  keyPem: string;
  model?: string;
  vendor?: string;
  lastConnected?: number;
}

interface DevicesState {
  found: Record<string, FoundDevice>;
  paired: Record<string, PairedDevice>;
  activeDeviceId: string | null;
  scanning: boolean;
  upsertFound: (d: FoundDevice) => void;
  removeFound: (host: string) => void;
  clearFound: () => void;
  setScanning: (scanning: boolean) => void;
  addPaired: (d: PairedDevice) => void;
  removePaired: (id: string) => void;
  setActive: (id: string | null) => void;
}

export const useDevicesStore = createPersistedStore<DevicesState>(
  {
    name: 'devices',
    partialize: (s) => ({ paired: s.paired, activeDeviceId: s.activeDeviceId }) as DevicesState,
  },
  (set) => ({
    found: {},
    paired: {},
    activeDeviceId: null,
    scanning: false,
    upsertFound: (d) => set((s) => ({ ...s, found: { ...s.found, [d.host]: d } })),
    removeFound: (host) =>
      set((s) => {
        const f = { ...s.found };
        delete f[host];
        return { ...s, found: f };
      }),
    clearFound: () => set((s) => ({ ...s, found: {} })),
    setScanning: (scanning) => set((s) => ({ ...s, scanning })),
    addPaired: (d) => set((s) => ({ ...s, paired: { ...s.paired, [d.id]: d } })),
    removePaired: (id) =>
      set((s) => {
        const p = { ...s.paired };
        delete p[id];
        return { ...s, paired: p };
      }),
    setActive: (id) => set((s) => ({ ...s, activeDeviceId: id })),
  }),
);
