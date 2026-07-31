import { getActiveClient } from '@/services/sessionManager';
import { showToast } from '@/components/Toast';

let _lastToast = 0;
const DEBOUNCE = 3000;

export function resetLastToast() {
  _lastToast = 0;
}

export function key(code: number): boolean {
  const client = getActiveClient();
  if (!client) {
    const now = Date.now();
    if (now - _lastToast >= DEBOUNCE || _lastToast === 0) {
      _lastToast = now;
      showToast('No TV connected - pick a device');
    }
    return false;
  }
  client.keyPress(code);
  return true;
}
