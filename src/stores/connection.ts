import { create } from 'zustand';
import type { ConnectionState, Telemetry } from '@/protocol/RemoteClient';

interface ConnectionStoreState extends Telemetry {
  state: ConnectionState;
  error?: string;
  setState: (s: ConnectionState, error?: string) => void;
  mergeTelemetry: (t: Partial<Telemetry>) => void;
}

export const useConnectionStore = create<ConnectionStoreState>((set) => ({
  state: 'IDLE',
  setState: (state, error) => set({ state, error }),
  mergeTelemetry: (t) => set((s) => ({ ...s, ...t })),
}));
