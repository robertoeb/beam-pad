import { createPersistedStore } from './createPersistedStore';

interface LayoutState {
  pinned: string[];
  hidden: string[];
  moreSheetOpen: boolean;
  setPinned: (ids: string[]) => void;
  pin: (id: string) => void;
  unpin: (id: string) => void;
  move: (from: number, to: number) => void;
  setMoreSheet: (open: boolean) => void;
}

export const useLayoutStore = createPersistedStore<LayoutState>(
  {
    name: 'layout',
    partialize: (s) => ({ pinned: s.pinned, hidden: s.hidden }) as any,
  },
  (set) => ({
    pinned: ['netflix', 'youtube', 'prime', 'disney'],
    hidden: [],
    moreSheetOpen: false,
    setPinned: (pinned) => set({ pinned }),
    pin: (id) => set((s) => (s.pinned.includes(id) ? s : { pinned: [...s.pinned, id] })),
    unpin: (id) => set((s) => ({ pinned: s.pinned.filter((x) => x !== id) })),
    move: (from, to) =>
      set((s) => {
        const next = [...s.pinned];
        const [item] = next.splice(from, 1);
        if (item === undefined) return s;
        next.splice(to, 0, item);
        return { pinned: next };
      }),
    setMoreSheet: (moreSheetOpen) => set({ moreSheetOpen }),
  }),
);
