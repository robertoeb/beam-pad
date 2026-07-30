import { getActiveClient } from './sessionManager';
import { useImeStore } from '@/stores/ime';

let imeCounter = 0;

function commonPrefixLen(a: string, b: string): number {
  const max = Math.min(a.length, b.length);
  let p = 0;
  while (p < max && a.charCodeAt(p) === b.charCodeAt(p)) p++;
  if (p > 0 && p < a.length && a.charCodeAt(p - 1) >= 0xd800 && a.charCodeAt(p - 1) <= 0xdbff) p--;
  if (p > 0 && p < b.length && b.charCodeAt(p - 1) >= 0xd800 && b.charCodeAt(p - 1) <= 0xdbff) p--;
  return p;
}

export function commitImeText(next: string) {
  const client = getActiveClient();
  const st = useImeStore.getState();
  if (!client || !st.visible) return;

  const prev = st.value;
  useImeStore.getState().setValue(next);

  const p = commonPrefixLen(prev, next);

  const edits: Array<{ insert: number; textFieldStatus: { start: number; end: number; value: string } }> = [];
  if (prev.length > p) {
    edits.push({ insert: 0, textFieldStatus: { start: p, end: prev.length, value: '' } });
  }
  if (next.length > p) {
    edits.push({ insert: 1, textFieldStatus: { start: p, end: p, value: next.slice(p) } });
  }
  if (edits.length === 0) return;

  client.imeBatchEdit({
    imeCounter: ++imeCounter,
    fieldCounter: st.fieldCounter,
    editInfo: edits,
  });
}

export function dismissIme() {
  useImeStore.getState().dismiss();
}

export function __testResetCounter() {
  imeCounter = 0;
}
