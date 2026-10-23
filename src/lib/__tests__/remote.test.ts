import { remote } from '../remote';
import { getClient } from '@/services/session';
import { showToast } from '@/components/Toast';
import { voiceStart, voiceStop } from '@/services/voice';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

jest.mock('@/components/Toast', () => ({
  showToast: jest.fn(),
  ToastHost: () => null,
}));

jest.mock('@/services/voice', () => ({
  voiceStart: jest.fn(),
  voiceStop: jest.fn(),
  voiceSearchUi: jest.fn(),
}));

const mockClient = {
  keyPress: jest.fn(),
  keyLongStart: jest.fn(),
  keyLongEnd: jest.fn(),
  launchApp: jest.fn(),
  imeBatchEdit: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (getClient as jest.Mock).mockReturnValue(mockClient);
});

describe('remote command facade', () => {
  it('key() sends keyPress and returns true', () => {
    expect(remote.key(KEYS.home)).toBe(true);
    expect(mockClient.keyPress).toHaveBeenCalledWith(KEYS.home);
  });

  it('key() toasts and returns false with no TV', () => {
    (getClient as jest.Mock).mockReturnValue(null);
    expect(remote.key(KEYS.home)).toBe(false);
    expect(showToast).toHaveBeenCalledWith('No TV connected - pick a device');
  });

  it('longPress() starts long press; end() finishes it', () => {
    const handle = remote.longPress(KEYS.volUp);
    expect(mockClient.keyLongStart).toHaveBeenCalledWith(KEYS.volUp);
    handle.end();
    expect(mockClient.keyLongEnd).toHaveBeenCalledWith(KEYS.volUp);
  });

  it('longPress() with no TV is a safe no-op', () => {
    (getClient as jest.Mock).mockReturnValue(null);
    const handle = remote.longPress(KEYS.volUp);
    expect(() => handle.end()).not.toThrow();
    expect(showToast).toHaveBeenCalled();
  });

  it('launch() opens known app deep link', () => {
    expect(remote.launch('netflix')).toBe(true);
    expect(mockClient.launchApp).toHaveBeenCalledWith(
      expect.stringContaining('netflix'),
    );
  });

  it('launch() returns false for unknown app id', () => {
    expect(remote.launch('no-such-app')).toBe(false);
    expect(mockClient.launchApp).not.toHaveBeenCalled();
  });

  it('launch() toasts and returns false with no TV', () => {
    (getClient as jest.Mock).mockReturnValue(null);
    expect(remote.launch('netflix')).toBe(false);
    expect(showToast).toHaveBeenCalled();
  });

  it('ime() delegates batch edit to the client', () => {
    const batch = { imeCounter: 1, fieldCounter: 2, editInfo: [] as never[] };
    remote.ime(batch);
    expect(mockClient.imeBatchEdit).toHaveBeenCalledWith(batch);
  });

  it('ime() without client is a no-op', () => {
    (getClient as jest.Mock).mockReturnValue(null);
    expect(() => remote.ime({ imeCounter: 1 } as never)).not.toThrow();
  });

  it('voice delegates to the voice service', async () => {
    (voiceStart as jest.Mock).mockResolvedValue(7);
    await expect(remote.voice.start()).resolves.toBe(7);
    remote.voice.stop();
    expect(voiceStop).toHaveBeenCalled();
  });
});
