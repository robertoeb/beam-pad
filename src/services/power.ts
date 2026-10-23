import { remote } from '@/lib/remote';
import { KEYS } from '@/protocol/keycodes';

const hold: { active: { end(): void } | null } = { active: null };

export function powerShortPress(): void {
  remote.key(KEYS.power);
}

export function powerHoldStart(): void {
  hold.active = remote.longPress(KEYS.power);
}

export function powerHoldEnd(): void {
  hold.active?.end();
  hold.active = null;
}
