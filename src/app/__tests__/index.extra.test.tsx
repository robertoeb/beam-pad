import { render, fireEvent, act } from '@testing-library/react-native';
import IndexScreen from '../index';
import { router } from 'expo-router';
import { getActiveClient } from '@/services/session';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { voiceStart, voiceStop, voiceSearchUi } from '@/services/voice';
import { key } from '@/lib/key';
import { aDevice } from '@/test/factories';

jest.mock('@/services/session', () => ({
  getClient: jest.fn(),
  getActiveClient: jest.fn(),
}));

jest.mock('@/lib/key', () => ({
  key: jest.fn(),
}));

jest.mock('@/services/voice', () => ({
  voiceStart: jest.fn(),
  voiceStop: jest.fn(),
  voiceSearchUi: jest.fn(),
}));

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue({ keyPress: jest.fn() });
  jest.clearAllMocks();
  useSettingsStore.setState({ navigationMode: 'dpad' });
});

describe('IndexScreen extra paths', () => {
  it('device switch sheet opens and closes', async () => {
    useDevicesStore.getState().addPaired(aDevice({ id: 'tv-1', name: 'Living Room TV' }));
    const { getByLabelText, queryByText } = await render(<IndexScreen />);
    expect(queryByText('Living Room TV')).toBeNull();
    await fireEvent.press(getByLabelText('Switch device'));
    expect(queryByText('Living Room TV')).not.toBeNull();
  });

  it('mic hold starts voice, release stops it', async () => {
    jest.useFakeTimers();
    const { getByLabelText } = await render(<IndexScreen />);
    const mic = getByLabelText('Voice');
    await fireEvent(mic, 'onPressIn', {});
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(voiceStart).toHaveBeenCalled();
    await fireEvent(mic, 'onPressOut', {});
    expect(voiceStop).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('mic tap without hold opens voice search UI', async () => {
    const { getByLabelText } = await render(<IndexScreen />);
    await fireEvent.press(getByLabelText('Voice'));
    expect(voiceSearchUi).toHaveBeenCalled();
    expect(key).not.toHaveBeenCalled();
  });

  it('settings gear is reachable', async () => {
    const { getByLabelText } = await render(<IndexScreen />);
    await fireEvent.press(getByLabelText('Settings'));
    expect(router.push).toHaveBeenCalledWith('/settings');
  });
});
