import { create } from 'zustand';
import type { ConnectionState, Telemetry } from '@/protocol/RemoteClient';
import type { ConnectError } from '@/protocol/errors';

interface ConnectionStoreState extends Telemetry {
  state: ConnectionState;
  error?: ConnectError;
  setState: (s: ConnectionState, error?: ConnectError) => void;
  mergeTelemetry: (t: Partial<Telemetry>) => void;
}

export const useConnectionStore = create<ConnectionStoreState>((set) => ({
  state: 'IDLE',
  setState: (state, error) => set({ state, error }),
  mergeTelemetry: (t) => set((s) => ({ ...s, ...t })),
}));
