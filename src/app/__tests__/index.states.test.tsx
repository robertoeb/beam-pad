import { render, fireEvent } from '@testing-library/react-native';
import IndexScreen from '../index';
import { router } from 'expo-router';
import { getActiveClient } from '@/services/session';
import { useSettingsStore } from '@/stores/settings';
import { useImeStore } from '@/stores/ime';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

jest.mock('@/lib/key', () => ({
  key: jest.fn(),
}));

const mockKeyPress = jest.fn();

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue({ keyPress: mockKeyPress });
  mockKeyPress.mockClear();
  (key as jest.Mock).mockClear();
  useSettingsStore.setState({ navigationMode: 'dpad' });
  useImeStore.setState(useImeStore.getInitialState());
});

describe('IndexScreen states', () => {
  it('dpad mode renders DPad navigation', async () => {
    useSettingsStore.setState({ navigationMode: 'dpad' });
    const { getByLabelText } = await render(<IndexScreen />);
    expect(getByLabelText('Back')).toBeTruthy();
    expect(getByLabelText('Home')).toBeTruthy();
    expect(getByLabelText('TV Settings')).toBeTruthy();
  });

  it('touchpad mode swaps in TouchPad', async () => {
    useSettingsStore.setState({ navigationMode: 'touchpad' });
    const { toJSON } = await render(<IndexScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('back/home/tv-settings buttons send keys', async () => {
    const { getByLabelText } = await render(<IndexScreen />);
    await fireEvent.press(getByLabelText('Back'));
    await fireEvent.press(getByLabelText('Home'));
    await fireEvent.press(getByLabelText('TV Settings'));
    expect(key).toHaveBeenCalledWith(KEYS.back);
    expect(key).toHaveBeenCalledWith(KEYS.home);
    expect(key).toHaveBeenCalledWith(KEYS.settings);
  });

  it('keyboard button opens IME field', async () => {
    const { getByLabelText } = await render(<IndexScreen />);
    await fireEvent.press(getByLabelText('Keyboard'));
    expect(useImeStore.getState().visible).toBe(true);
  });

  it('settings gear navigates to /settings', async () => {
    const { getByLabelText } = await render(<IndexScreen />);
    await fireEvent.press(getByLabelText('Settings'));
    expect(router.push).toHaveBeenCalledWith('/settings');
  });
});
