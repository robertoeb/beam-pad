import { create } from 'zustand';
import type { PairingStep } from '@/protocol/PairingProtocol';

interface PairingState {
  step: PairingStep;
  error: string | undefined;
  setStep: (s: PairingStep) => void;
  setError: (e: string | undefined) => void;
  reset: () => void;
}

export const usePairingStore = create<PairingState>()((set) => ({
  step: 'probing',
  error: undefined,
  setStep: (s) => set(() => ({ step: s })),
  setError: (e) => set(() => ({ error: e })),
  reset: () => set(() => ({ step: 'probing', error: undefined })),
}));
