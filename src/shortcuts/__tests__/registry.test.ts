import { shortcutRegistry } from '../registry';
import { appShortcutId, keyShortcutId, userShortcutId, parseShortcutId } from '../types';
import type { UserShortcut } from '../types';

describe('shortcutRegistry', () => {
  it('resolves built-in app shortcuts', () => {
    const s = shortcutRegistry.resolve('app:netflix');
    expect(s).not.toBeNull();
    expect(s!.label).toBe('Netflix');
    expect(s!.action.kind).toBe('app');
    expect(s!.builtIn).toBe(true);
  });

  it('resolves built-in key shortcuts', () => {
    const s = shortcutRegistry.resolve('key:guide');
    expect(s).not.toBeNull();
    expect(s!.label).toBe('Guide');
    expect(s!.action.kind).toBe('key');
    expect(s!.builtIn).toBe(true);
  });

  it('returns null for unknown id', () => {
    expect(shortcutRegistry.resolve('app:nonexistent')).toBeNull();
    expect(shortcutRegistry.resolve('garbage')).toBeNull();
  });

  it('resolves user shortcuts after adding', () => {
    const user: UserShortcut = {
      id: 'user:test123',
      label: 'Test Macro',
      action: { kind: 'macro', steps: [{ type: 'wait', ms: 100 }] },
      icon: 'playPause',
      builtIn: false,
    };
    shortcutRegistry.addUserShortcut(user);
    const resolved = shortcutRegistry.resolve('user:test123');
    expect(resolved).not.toBeNull();
    expect(resolved!.label).toBe('Test Macro');
    expect(resolved!.builtIn).toBe(false);

    shortcutRegistry.removeUserShortcut('user:test123');
    expect(shortcutRegistry.resolve('user:test123')).toBeNull();
  });

  it('id-format invariants', () => {
    expect(parseShortcutId('app:netflix')).toEqual({ kind: 'app', rest: 'netflix' });
    expect(parseShortcutId('key:guide')).toEqual({ kind: 'key', rest: 'guide' });
    expect(parseShortcutId('user:abc123')).toEqual({ kind: 'user', rest: 'abc123' });
    expect(appShortcutId('netflix')).toBe('app:netflix');
    expect(keyShortcutId('guide')).toBe('key:guide');
    expect(userShortcutId('abc')).toBe('user:abc');
  });

  it('getAppShortcuts returns all TV_APPS', () => {
    const apps = shortcutRegistry.getAppShortcuts();
    expect(apps.length).toBeGreaterThan(0);
    expect(apps.every((s) => s.action.kind === 'app')).toBe(true);
  });

  it('getKeyShortcuts returns key entries', () => {
    const keys = shortcutRegistry.getKeyShortcuts();
    expect(keys.length).toBeGreaterThan(0);
    expect(keys.every((s) => s.action.kind === 'key')).toBe(true);
  });
});
