export type MacroStep =
  | { type: 'key'; keyCode: number }
  | { type: 'app'; appId: string }
  | { type: 'wait'; ms: number };

export type ShortcutAction =
  | { kind: 'app'; appId: string }
  | { kind: 'key'; keyCode: number }
  | { kind: 'macro'; steps: MacroStep[] }
  | { kind: 'ir'; command: string };

export type ShortcutId = string;

export interface Shortcut {
  id: ShortcutId;
  label: string;
  action: ShortcutAction;
  icon: string;
  tint?: string;
  builtIn: boolean;
}

export interface UserShortcut extends Shortcut {
  builtIn: false;
}

export const ID_SEP = ':';

export function appShortcutId(appId: string): ShortcutId {
  return `app${ID_SEP}${appId}`;
}

export function keyShortcutId(keyName: string): ShortcutId {
  return `key${ID_SEP}${keyName}`;
}

export function userShortcutId(nanoId: string): ShortcutId {
  return `user${ID_SEP}${nanoId}`;
}

export function parseShortcutId(id: ShortcutId): { kind: string; rest: string } {
  const idx = id.indexOf(ID_SEP);
  if (idx === -1) return { kind: id, rest: '' };
  return { kind: id.slice(0, idx), rest: id.slice(idx + 1) };
}
