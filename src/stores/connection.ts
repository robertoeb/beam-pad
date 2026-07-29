import { create } from 'zustand';

export type ConnectionStatus = 'IDLE' | 'DISCOVERING' | 'PAIRING' | 'CONNECTING' | 'CONFIGURING' | 'ACTIVE' | 'ERROR_STATE';

interface ConnectionStore {
  state: ConnectionStatus;
  setState: (state: ConnectionStatus) => void;
}

export const useConnectionStore = create<ConnectionStore>((set) => ({
  state: 'IDLE',
  setState: (state) => set({ state }),
}));
