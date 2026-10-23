import { PermissionsAndroid, Platform, AppState } from 'react-native';
import { AtvSocket } from '@/modules/expo-atv-socket';
import { getClient } from './session';
import { fromB64 } from '@/protocol/bytes';
import { KEYS } from '@/protocol/keycodes';

const CHUNK_TARGET = 20 * 1024;

const voiceSession: {
  id: number | null;
  mic: { remove(): void } | null;
  pending: Uint8Array[];
  pendingBytes: number;
} = { id: null, mic: null, pending: [], pendingBytes: 0 };

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

/**
 * Begin a voice session. Resolves with the session id on success,
 * or false when there is no active client, a session is already
 * running, or mic permission is denied.
 */
export async function voiceStart(): Promise<number | false> {
  const client = getClient();
  if (!client || voiceSession.id !== null) return false;
  if (!(await ensureMicPermission())) return false;

  const sessionId = Date.now() & 0x7fffffff;
  voiceSession.id = sessionId;
  voiceSession.pending = [];
  voiceSession.pendingBytes = 0;
  client.voiceBegin(sessionId);

  voiceSession.mic = AtvSocket.onMicData(({ base64 }: { base64: string }) => {
    const sid = voiceSession.id;
    if (sid === null) return;
    const bytes = fromB64(base64);
    voiceSession.pending.push(bytes);
    voiceSession.pendingBytes += bytes.length;
    while (voiceSession.pendingBytes >= CHUNK_TARGET) {
      const toSend = concatChunks(voiceSession.pending, voiceSession.pendingBytes);
      const flushBytes = CHUNK_TARGET;
      getClient()?.voicePayload(sid, toSend.slice(0, flushBytes));
      const leftover = toSend.slice(flushBytes);
      voiceSession.pending = leftover.length > 0 ? [leftover] : [];
      voiceSession.pendingBytes = leftover.length;
    }
  });
  await AtvSocket.startMicStream();
  return sessionId;
}

export function voiceStop() {
  if (voiceSession.id === null) return;
  const sessionId = voiceSession.id;
  AtvSocket.stopMicStream();
  voiceSession.mic?.remove();
  voiceSession.mic = null;
  if (voiceSession.pendingBytes > 0) {
    getClient()?.voicePayload(sessionId, concatChunks(voiceSession.pending, voiceSession.pendingBytes));
  }
  getClient()?.voiceEnd(sessionId);
  voiceSession.id = null;
  voiceSession.pending = [];
  voiceSession.pendingBytes = 0;
}

export function voiceSearchUi() {
  getClient()?.keyPress(KEYS.search);
}

AppState.addEventListener('change', (state) => {
  if (state === 'background' && voiceSession.id !== null) {
    voiceStop();
  }
});
