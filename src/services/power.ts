import { getActiveClient } from './sessionManager';
import { KEYS } from '@/protocol/keycodes';

export function powerShortPress() {
  getActiveClient()?.keyPress(KEYS.power);
}

export function powerHoldStart() {
  getActiveClient()?.keyLongStart(KEYS.power);
}

export function powerHoldEnd() {
  getActiveClient()?.keyLongEnd(KEYS.power);
}
