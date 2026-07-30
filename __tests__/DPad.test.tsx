import { render, userEvent } from '@testing-library/react-native';
import { DPad } from '@/components/DPad';
import { KEYS } from '@/protocol/keycodes';
import { getActiveClient } from '@/services/sessionManager';

jest.mock('@/services/sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

const mockKeyPress = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  (getActiveClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });
  mockKeyPress.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('DPad', () => {
  it('renders 5 controls', async () => {
    const { getByLabelText } = await render(<DPad />);
    expect(getByLabelText('Up')).toBeTruthy();
    expect(getByLabelText('Down')).toBeTruthy();
    expect(getByLabelText('Left')).toBeTruthy();
    expect(getByLabelText('Right')).toBeTruthy();
    expect(getByLabelText('OK')).toBeTruthy();
  });

  it('injects correct keycodes', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<DPad />);

    await user.press(getByLabelText('Up'));
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.up);

    await user.press(getByLabelText('Down'));
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.down);

    await user.press(getByLabelText('Left'));
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.left);

    await user.press(getByLabelText('Right'));
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.right);

    await user.press(getByLabelText('OK'));
    expect(mockKeyPress).toHaveBeenCalledWith(KEYS.ok);
  });

  it('repeat is enabled on directions but not OK', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<DPad />);

    await user.longPress(getByLabelText('Up'), { duration: 400 });
    expect(mockKeyPress).toHaveBeenCalledTimes(2);

    mockKeyPress.mockClear();
    await user.longPress(getByLabelText('OK'), { duration: 400 });
    expect(mockKeyPress).toHaveBeenCalledTimes(1);
  });
});
