import { PermissionsAndroid, Platform, AppState } from 'react-native';
import { AtvSocket } from '@/modules/expo-atv-socket';
import { getActiveClient } from './sessionManager';
import { fromB64 } from '@/protocol/bytes';
import { KEYS } from '@/protocol/keycodes';

const CHUNK_TARGET = 20 * 1024;
let sessionId: number | null = null;
let micSub: { remove(): void } | null = null;
let pending: Uint8Array[] = [];
let pendingBytes = 0;

async function ensureMicPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
    title: 'BeamPad microphone',
    message: 'Used only while you hold voice search.',
    buttonPositive: 'Allow',
  });
  return res === PermissionsAndroid.RESULTS.GRANTED;
}

function concatChunks(chunks: Uint8Array[], bytes: number): Uint8Array {
  const out = new Uint8Array(bytes);
  let o = 0;
  for (const c of chunks) {
    out.set(c, o);
    o += c.length;
  }
  return out;
}

export async function voiceStart(): Promise<boolean> {
  const client = getActiveClient();
  if (!client || sessionId !== null) return false;
  if (!(await ensureMicPermission())) return false;

  sessionId = Date.now() & 0x7fffffff;
  pending = [];
  pendingBytes = 0;
  client.voiceBegin(sessionId);

  micSub = AtvSocket.onMicData(({ base64 }: { base64: string }) => {
    if (sessionId === null) return;
    const bytes = fromB64(base64);
    pending.push(bytes);
    pendingBytes += bytes.length;
    while (pendingBytes >= CHUNK_TARGET) {
      const toSend = concatChunks(pending, pendingBytes);
      const flushBytes = CHUNK_TARGET;
      getActiveClient()?.voicePayload(sessionId, toSend.slice(0, flushBytes));
      const leftover = toSend.slice(flushBytes);
      pending = leftover.length > 0 ? [leftover] : [];
      pendingBytes = leftover.length;
    }
  });
  await AtvSocket.startMicStream();
  return true;
}

export function voiceStop() {
  if (sessionId === null) return;
  AtvSocket.stopMicStream();
  micSub?.remove();
  micSub = null;
  if (pendingBytes > 0) {
    getActiveClient()?.voicePayload(sessionId, concatChunks(pending, pendingBytes));
  }
  getActiveClient()?.voiceEnd(sessionId);
  sessionId = null;
  pending = [];
  pendingBytes = 0;
}

export function voiceSearchUi() {
  getActiveClient()?.keyPress(KEYS.search);
}

AppState.addEventListener('change', (state) => {
  if (state === 'background' && sessionId !== null) {
    voiceStop();
  }
});

export function __testGetSessionId() {
  return sessionId;
}
