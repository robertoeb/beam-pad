import { powerShortPress, powerHoldStart, powerHoldEnd } from '../power';
import { remote } from '@/lib/remote';
import { KEYS } from '@/protocol/keycodes';

jest.mock('@/lib/remote', () => ({
  remote: {
    key: jest.fn(),
    longPress: jest.fn(),
  },
}));

const mockKey = jest.mocked(remote.key);
const mockLongPress = jest.mocked(remote.longPress);
const mockEnd = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockLongPress.mockReturnValue({ end: mockEnd });
});

describe('power service', () => {
  it('short press sends KEYCODE_POWER via remote.key', () => {
    powerShortPress();
    expect(mockKey).toHaveBeenCalledWith(KEYS.power);
  });

  it('hold start begins a long press', () => {
    powerHoldStart();
    expect(mockLongPress).toHaveBeenCalledWith(KEYS.power);
  });

  it('hold end finishes the long press', () => {
    powerHoldStart();
    powerHoldEnd();
    expect(mockEnd).toHaveBeenCalledTimes(1);
  });

  it('does not throw when there is no active client', () => {
    mockKey.mockReturnValue(false);
    mockLongPress.mockReturnValue({ end: () => {} });
    expect(() => powerShortPress()).not.toThrow();
    expect(() => powerHoldStart()).not.toThrow();
    expect(() => powerHoldEnd()).not.toThrow();
  });
});
