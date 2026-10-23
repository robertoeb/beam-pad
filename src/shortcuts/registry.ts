import { TV_APPS, getApp } from '@/protocol/deeplinks';
import { KEYS } from '@/protocol/keycodes';
import { BRAND_ICONS, KEY_ICONS } from './icons';
import type { Shortcut, ShortcutId, UserShortcut } from './types';
import { appShortcutId, keyShortcutId } from './types';

const KEY_LABELS: Record<string, string> = {
  guide: 'Guide',
  tvInput: 'Source',
  info: 'Info',
  menu: 'Menu',
  search: 'Search',
  settings: 'Settings',
  playPause: 'Play/Pause',
  stop: 'Stop',
  next: 'Next',
  prev: 'Previous',
  rewind: 'Rewind',
  fastForward: 'Fast Forward',
  chUp: 'Channel Up',
  chDown: 'Channel Down',
  red: 'Red',
  green: 'Green',
  yellow: 'Yellow',
  blue: 'Blue',
};

const builtInShortcuts = new Map<ShortcutId, Shortcut>();

for (const app of TV_APPS) {
  const id = appShortcutId(app.id);
  builtInShortcuts.set(id, {
    id,
    label: app.name,
    action: { kind: 'app', appId: app.id },
    icon: app.id,
    tint: app.color,
    builtIn: true,
  });
}

for (const [keyName, keyCode] of Object.entries(KEYS)) {
  if (keyName === 'digits') continue;
  const id = keyShortcutId(keyName);
  builtInShortcuts.set(id, {
    id,
    label: KEY_LABELS[keyName] ?? keyName,
    action: { kind: 'key', keyCode: keyCode as number },
    icon: keyName,
    builtIn: true,
  });
}

const userShortcuts = new Map<ShortcutId, UserShortcut>();

export const shortcutRegistry = {
  resolve(id: ShortcutId): Shortcut | null {
    const builtIn = builtInShortcuts.get(id);
    if (builtIn) return builtIn;
    const user = userShortcuts.get(id);
    if (user) return user;
    return null;
  },

  addUserShortcut(shortcut: UserShortcut): void {
    userShortcuts.set(shortcut.id, shortcut);
  },

  removeUserShortcut(id: ShortcutId): void {
    userShortcuts.delete(id);
  },

  getUserShortcuts(): UserShortcut[] {
    return Array.from(userShortcuts.values());
  },

  getAllBuiltIn(): Shortcut[] {
    return Array.from(builtInShortcuts.values());
  },

  getAppShortcuts(): Shortcut[] {
    return TV_APPS.map((app) => builtInShortcuts.get(appShortcutId(app.id))!);
  },

  getKeyShortcuts(): Shortcut[] {
    return Object.keys(KEYS)
      .filter((k) => k !== 'digits')
      .map((k) => builtInShortcuts.get(keyShortcutId(k))!);
  },

  getKeyIcon(keyName: string) {
    return KEY_ICONS[keyName] ?? null;
  },

  hasBrandIcon(appId: string): boolean {
    return appId in BRAND_ICONS;
  },

  getApp(appId: string) {
    return getApp(appId);
  },
};
