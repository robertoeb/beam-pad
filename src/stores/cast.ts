import { create } from 'zustand';

interface CastState {
  discovering: boolean;
  connected: boolean;
  deviceName?: string;
  mediaStatus?: 'idle' | 'buffering' | 'playing' | 'paused';
  mediaTitle?: string;
  castSheetOpen: boolean;
  set: (p: Partial<CastState>) => void;
  setCastSheet: (open: boolean) => void;
}

export const useCastStore = create<CastState>((set) => ({
  discovering: false,
  connected: false,
  mediaStatus: 'idle',
  castSheetOpen: false,
  set: (p) => set(p),
  setCastSheet: (castSheetOpen) => set({ castSheetOpen }),
}));
