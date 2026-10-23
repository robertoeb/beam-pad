import { key } from '@/lib/key';
import { getClient } from '@/services/session';
import { useToastStore } from '@/stores/toast';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
  useToastStore.getState().reset();
  (getClient as jest.Mock).mockReturnValue(null);
});

afterEach(() => {
  jest.useRealTimers();
});

describe('key() helper — no-connection path', () => {
  it('shows toast when no client', () => {
    const result = key(KEYS.up);
    expect(result).toBe(false);
    expect(useToastStore.getState().message).toBe('No TV connected - pick a device');
    expect(useToastStore.getState().visible).toBe(true);
  });

  it('debounces toast to once per 3s (single policy in the Toast store)', () => {
    key(KEYS.up);
    const first = useToastStore.getState().lastFired;
    expect(first).toBeGreaterThan(0);

    key(KEYS.down);
    key(KEYS.ok);
    expect(useToastStore.getState().lastFired).toBe(first);

    jest.advanceTimersByTime(3000);

    key(KEYS.up);
    expect(useToastStore.getState().lastFired).toBeGreaterThan(first);
  });

  it('fires keyPress when client exists', () => {
    const mockKeyPress = jest.fn();
    (getClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });

    const result = key(KEYS.home);
    expect(result).toBe(true);
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.home);
    expect(useToastStore.getState().message).toBe('');
  });
});
