import { getClient } from './session';
import { useImeStore } from '@/stores/ime';

export const imeSession = {
  counter: 0,
  reset() {
    imeSession.counter = 0;
  },
};

function commonPrefixLen(a: string, b: string): number {
  const max = Math.min(a.length, b.length);
  let p = 0;
  while (p < max && a.charCodeAt(p) === b.charCodeAt(p)) p++;
  if (p > 0 && p < a.length && a.charCodeAt(p - 1) >= 0xd800 && a.charCodeAt(p - 1) <= 0xdbff) p--;
  if (p > 0 && p < b.length && b.charCodeAt(p - 1) >= 0xd800 && b.charCodeAt(p - 1) <= 0xdbff) p--;
  return p;
}

export function commitImeText(next: string) {
  const st = useImeStore.getState();
  if (!st.visible) return;

  const prev = st.value;
  st.setValue(next);

  const client = getClient();
  if (!client) return;

  const p = commonPrefixLen(prev, next);

  const edits: Array<{
    insert: number;
    textFieldStatus: { start: number; end: number; value: string };
  }> = [];
  if (prev.length > p) {
    edits.push({ insert: 0, textFieldStatus: { start: p, end: prev.length, value: '' } });
  }
  if (next.length > p) {
    edits.push({ insert: 1, textFieldStatus: { start: p, end: p, value: next.slice(p) } });
  }
  if (edits.length === 0) return;

  client.imeBatchEdit({
    imeCounter: ++imeSession.counter,
    fieldCounter: st.fieldCounter,
    editInfo: edits,
  });
}

export function dismissIme() {
  useImeStore.getState().dismiss();
}
