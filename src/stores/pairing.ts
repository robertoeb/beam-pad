import { create } from 'zustand';
import { PairingProtocol, PairingStep } from '@/protocol/PairingProtocol';

interface PairingState {
  step: PairingStep;
  error: string | undefined;
  protocol: PairingProtocol | null;
  setStep: (s: PairingStep) => void;
  setError: (e: string | undefined) => void;
  setProtocol: (p: PairingProtocol | null) => void;
  reset: () => void;
}

export const usePairingStore = create<PairingState>()((set) => ({
  step: 'probing',
  error: undefined,
  protocol: null,
  setStep: (s) => set(() => ({ step: s })),
  setError: (e) => set(() => ({ error: e })),
  setProtocol: (p) => set(() => ({ protocol: p })),
  reset: () => set(() => ({ step: 'probing', error: undefined, protocol: null })),
}));
