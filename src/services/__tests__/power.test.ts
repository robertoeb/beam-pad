import { powerShortPress, powerHoldStart, powerHoldEnd } from '../power';
import { getActiveClient } from '../sessionManager';
import { KEYS } from '@/protocol/keycodes';

jest.mock('../sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

const mockKeyPress = jest.fn();
const mockKeyLongStart = jest.fn();
const mockKeyLongEnd = jest.fn();

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue({
    keyPress: mockKeyPress,
    keyLongStart: mockKeyLongStart,
    keyLongEnd: mockKeyLongEnd,
  });
  mockKeyPress.mockClear();
  mockKeyLongStart.mockClear();
  mockKeyLongEnd.mockClear();
});

describe('power service', () => {
  it('short press sends KEYCODE_POWER as SHORT', () => {
    powerShortPress();
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.power);
  });

  it('hold start sends START_LONG', () => {
    powerHoldStart();
    expect(mockKeyLongStart).toHaveBeenCalledWith(KEYS.power);
  });

  it('hold end sends END_LONG', () => {
    powerHoldEnd();
    expect(mockKeyLongEnd).toHaveBeenCalledWith(KEYS.power);
  });

  it('no-op when no active client', () => {
    (getActiveClient as jest.Mock).mockReturnValue(null);
    expect(() => powerShortPress()).not.toThrow();
    expect(() => powerHoldStart()).not.toThrow();
    expect(() => powerHoldEnd()).not.toThrow();
    expect(mockKeyPress).not.toHaveBeenCalled();
    expect(mockKeyLongStart).not.toHaveBeenCalled();
    expect(mockKeyLongEnd).not.toHaveBeenCalled();
  });
});
