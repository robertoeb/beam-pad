import { createPersistedStore } from './createPersistedStore';
import { COMMAND_PORT, PAIRING_PORT } from '@/protocol/ports';

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

export const DEVICES_VERSION = 2;

function migrate(persisted: any, _version: number): DevicesState {
  const base = { ...persisted } as Partial<DevicesState> & {
    paired?: Record<string, PairedDevice>;
  };
  // v<2: early builds persisted the *pairing* port (6467) as the device
  // port, sending every command-socket connect to the wrong service.
  // Rewrite to the command port; an explicit non-pairing port is kept.
  if (_version < 2 && base.paired) {
    for (const [id, d] of Object.entries(base.paired)) {
      if (d && (d.port === PAIRING_PORT || d.port == null)) {
        base.paired[id] = { ...d, port: COMMAND_PORT };
      }
    }
  }
  return base as DevicesState;
}

export const useDevicesStore = createPersistedStore<DevicesState>(
  {
    name: 'devices',
    version: DEVICES_VERSION,
    migrate,
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
