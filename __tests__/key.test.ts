import { act } from '@testing-library/react-native';
import { key, resetLastToast } from '@/lib/key';
import { showToast } from '@/components/Toast';
import { getActiveClient } from '@/services/sessionManager';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/services/sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

jest.mock('@/components/Toast', () => ({
  showToast: jest.fn(),
  ToastHost: () => null,
}));

beforeEach(() => {
  jest.useFakeTimers();
  resetLastToast();
  (getActiveClient as jest.Mock).mockReturnValue(null);
  (showToast as jest.Mock).mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('key() helper — no-connection path', () => {
  it('shows toast when no client', () => {
    const result = key(KEYS.up);
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith('No TV connected — pick a device');
  });

  it('debounces toast to once per 3s', () => {
    key(KEYS.up);
    key(KEYS.down);
    key(KEYS.ok);
    expect(showToast).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    key(KEYS.up);
    expect(showToast).toHaveBeenCalledTimes(2);
  });

  it('fires keyPress when client exists', () => {
    const mockKeyPress = jest.fn();
    (getActiveClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });

    const result = key(KEYS.home);
    expect(result).toBe(true);
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.home);
    expect(showToast).not.toHaveBeenCalled();
  });
});
