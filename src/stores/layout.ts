import { createPersistedStore } from './createPersistedStore';
import type { ShortcutId } from '@/shortcuts/types';
import { appShortcutId } from '@/shortcuts/types';

export const LAYOUT_VERSION = 1;

interface LayoutState {
  shortcuts: ShortcutId[];
  hidden: string[];
  moreSheetOpen: boolean;
  setShortcuts: (ids: ShortcutId[]) => void;
  addShortcut: (id: ShortcutId) => void;
  removeShortcut: (id: ShortcutId) => void;
  moveShortcut: (from: number, to: number) => void;
  setMoreSheet: (open: boolean) => void;
}

function migrate(persisted: any, version: number): LayoutState {
  const defaults: LayoutState = {
    shortcuts: ['app:netflix', 'app:youtube', 'app:prime', 'app:disney'],
    hidden: [],
    moreSheetOpen: false,
    setShortcuts: () => {},
    addShortcut: () => {},
    removeShortcut: () => {},
    moveShortcut: () => {},
    setMoreSheet: () => {},
  };

  const base = { ...defaults, ...persisted };

  if (version < 1) {
    const oldPinned: string[] | undefined = persisted?.pinned;
    if (Array.isArray(oldPinned) && oldPinned.length > 0) {
      base.shortcuts = oldPinned.map((id: string) => {
        if (id.startsWith('app:') || id.startsWith('key:') || id.startsWith('user:')) return id;
        return appShortcutId(id);
      });
    }
  }

  return base;
}

export const useLayoutStore = createPersistedStore<LayoutState>(
  {
    name: 'layout',
    version: LAYOUT_VERSION,
    migrate,
    partialize: (s) => ({ shortcuts: s.shortcuts, hidden: s.hidden }) as any,
  },
  (set) => ({
    shortcuts: ['app:netflix', 'app:youtube', 'app:prime', 'app:disney'],
    hidden: [],
    moreSheetOpen: false,
    setShortcuts: (shortcuts) => set({ shortcuts }),
    addShortcut: (id) =>
      set((s) => (s.shortcuts.includes(id) ? s : { shortcuts: [...s.shortcuts, id] })),
    removeShortcut: (id) => set((s) => ({ shortcuts: s.shortcuts.filter((x) => x !== id) })),
    moveShortcut: (from, to) =>
      set((s) => {
        const next = [...s.shortcuts];
        const [item] = next.splice(from, 1);
        if (item === undefined) return s;
        next.splice(to, 0, item);
        return { shortcuts: next };
      }),
    setMoreSheet: (moreSheetOpen) => set({ moreSheetOpen }),
  }),
);
