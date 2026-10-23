import { create } from 'zustand';

interface CapabilitiesState {
  irAvailable: boolean;
  setIrAvailable: (v: boolean) => void;
}

export const useCapabilitiesStore = create<CapabilitiesState>()((set) => ({
  irAvailable: false,
  setIrAvailable: (irAvailable) => set({ irAvailable }),
}));

export function resetCapabilities() {
  useCapabilitiesStore.setState({ irAvailable: false });
}
