import { create } from 'zustand';

export const TOAST_DEBOUNCE_MS = 3000;
export const TOAST_VISIBLE_MS = 2000;

interface ToastStoreState {
  message: string;
  visible: boolean;
  lastFired: number;
  show: (msg: string) => void;
  hide: () => void;
  reset: () => void;
}

/**
 * Single toast policy for the app: the 3000 ms debounce lives here and only
 * here. Callers (remote commands, macros, pairing) just call `showToast`.
 */
export const useToastStore = create<ToastStoreState>()((set, get) => ({
  message: '',
  visible: false,
  lastFired: 0,
  show: (msg) => {
    const now = Date.now();
    if (now - get().lastFired < TOAST_DEBOUNCE_MS) return;
    set({ message: msg, visible: true, lastFired: now });
  },
  hide: () => set({ visible: false }),
  reset: () => set({ message: '', visible: false, lastFired: 0 }),
}));

export function showToast(msg: string): void {
  useToastStore.getState().show(msg);
}
