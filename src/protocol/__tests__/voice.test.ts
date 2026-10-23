import { useImeStore } from '@/stores/ime';
import { Platform, PermissionsAndroid, AppState } from 'react-native';

type MicCb = (e: { base64: string }) => void;
const micListeners: MicCb[] = [];

jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: {
    onMicData: (cb: (e: { base64: string }) => void) => {
      micListeners.push(cb);
      return { remove: () => micListeners.splice(micListeners.indexOf(cb), 1) };
    },
    startMicStream: jest.fn(() => Promise.resolve()),
    stopMicStream: jest.fn(),
  },
}));

const mockVoiceBegin = jest.fn();
const mockVoicePayload = jest.fn();
const mockVoiceEnd = jest.fn();
const mockKeyPress = jest.fn();
const mockClient = {
  voiceBegin: mockVoiceBegin,
  voicePayload: mockVoicePayload,
  voiceEnd: mockVoiceEnd,
  keyPress: mockKeyPress,
};

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

import { voiceStart, voiceStop, voiceSearchUi } from '@/services/voice';
import { getClient } from '@/services/session';
import { toB64 } from '@/protocol/bytes';

const typedGetClient = jest.mocked(getClient);

function makeChunk(size: number): string {
  return toB64(new Uint8Array(size));
}

function emitMic(base64: string) {
  micListeners.forEach((cb) => cb({ base64 }));
}

beforeEach(() => {
  jest.clearAllMocks();
  micListeners.length = 0;
  voiceStop();
  typedGetClient.mockReturnValue(mockClient as any);
  Object.defineProperty(Platform, 'OS', { value: 'android', configurable: true });
  jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('granted' as any);
  useImeStore.setState(useImeStore.getInitialState());
  Date.now = jest.fn(() => 1000);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('voice service', () => {
  it('returns false without active client', async () => {
    typedGetClient.mockReturnValue(null);
    const result = await voiceStart();
    expect(result).toBe(false);
    expect(mockVoiceBegin).not.toHaveBeenCalled();
  });

  it('returns false on permission denied', async () => {
    jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('denied' as any);
    const result = await voiceStart();
    expect(result).toBe(false);
    expect(mockVoiceBegin).not.toHaveBeenCalled();
  });

  it('chunks mic data at 20KB boundary', async () => {
    const result = await voiceStart();
    expect(result).toBe(1000);

    emitMic(makeChunk(11 * 1024));
    expect(mockVoicePayload).not.toHaveBeenCalled();

    emitMic(makeChunk(10 * 1024));
    expect(mockVoicePayload).toHaveBeenCalledTimes(1);
    expect(mockVoicePayload.mock.calls[0][1].length).toBe(20480);

    voiceStop();
    expect(mockVoicePayload).toHaveBeenCalledTimes(2);
    expect(mockVoicePayload.mock.calls[1][1].length).toBe(1024);
    expect(mockVoiceEnd).toHaveBeenCalledTimes(1);
  });

  it('sends begin → payloads → end with same sessionId', async () => {
    await voiceStart();
    emitMic(makeChunk(8 * 1024));
    voiceStop();

    expect(mockVoiceBegin).toHaveBeenCalledTimes(1);
    expect(mockVoiceEnd).toHaveBeenCalledTimes(1);
    const sid = mockVoiceBegin.mock.calls[0][0];
    expect(mockVoiceEnd.mock.calls[0][0]).toBe(sid);
    if (mockVoicePayload.mock.calls.length > 0) {
      expect(mockVoicePayload.mock.calls[0][0]).toBe(sid);
    }
  });

  it('prevents double start', async () => {
    const r1 = await voiceStart();
    expect(r1).toBe(1000);
    const r2 = await voiceStart();
    expect(r2).toBe(false);
    expect(mockVoiceBegin).toHaveBeenCalledTimes(1);
    voiceStop();
  });

  it('stops on app background', async () => {
    await voiceStart();
    const listeners = (AppState as any)._listeners as Array<(s: string) => void>;
    expect(listeners.length).toBeGreaterThan(0);
    listeners[listeners.length - 1]!('background');
    expect(mockVoiceEnd).toHaveBeenCalledTimes(1);
    // Session fully released — a new start succeeds with a fresh id.
    const again = await voiceStart();
    expect(again).toBe(1000);
    voiceStop();
  });

  it('voiceSearchUi sends search key', () => {
    voiceSearchUi();
    expect(mockKeyPress).toHaveBeenCalledTimes(1);
  });
});
