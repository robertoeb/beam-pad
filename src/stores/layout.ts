import { createPersistedStore } from './createPersistedStore';

interface LayoutState {
  pinned: string[];
  moreSheetOpen: boolean;
  setPinned: (ids: string[]) => void;
  setMoreSheet: (open: boolean) => void;
}

export const useLayoutStore = createPersistedStore<LayoutState>(
  {
    name: 'layout',
    partialize: (s) => ({ pinned: s.pinned }) as LayoutState,
  },
  (set) => ({
    pinned: ['netflix', 'youtube', 'prime', 'disney'],
    moreSheetOpen: false,
    setPinned: (pinned) => set({ pinned }),
    setMoreSheet: (moreSheetOpen) => set({ moreSheetOpen }),
  }),
);
