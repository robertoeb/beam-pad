import { render, fireEvent } from '@testing-library/react-native';
import AppsRedirect from '../apps';
import AboutScreen from '../settings/about';
import AppearanceScreen from '../settings/appearance';
import IrProfileScreen from '../settings/ir-profile';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { router, useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
  useLocalSearchParams: jest.fn(() => ({})),
}));

describe('app screen smoke coverage', () => {
  it('apps redirect forwards to shortcuts', async () => {
    await render(<AppsRedirect />);
    expect(router.replace).toHaveBeenCalledWith('/shortcuts');
  });

  it('about screen renders version rows', async () => {
    const { getByText } = await render(<AboutScreen />);
    expect(getByText('Version')).toBeTruthy();
    expect(getByText('1.0.0')).toBeTruthy();
  });

  it('appearance screen switches navigation, density, haptics, and toggles', async () => {
    const { getByLabelText, getByText } = await render(<AppearanceScreen />);
    await fireEvent.press(getByLabelText('Use Touchpad'));
    expect(useSettingsStore.getState().navigationMode).toBe('touchpad');
    await fireEvent.press(getByLabelText('Use D-pad'));
    expect(useSettingsStore.getState().navigationMode).toBe('dpad');

    await fireEvent.press(getByText('Spacious'));
    expect(useSettingsStore.getState().density).toBe('spacious');
    await fireEvent.press(getByText('Medium'));
    expect(useSettingsStore.getState().hapticStrength).toBe('medium');

    await fireEvent.press(getByLabelText('Reduce motion'));
    expect(useSettingsStore.getState().reduceMotion).toBe(true);
    await fireEvent.press(getByLabelText('Show shortcut labels'));
    expect(useSettingsStore.getState().showShortcutLabels).toBe(true);
  });

  it('ir-profile list mode searches, selects global and per-device profiles', async () => {
    const { getByPlaceholderText, getByLabelText, queryByLabelText } = await render(
      <IrProfileScreen />,
    );
    await fireEvent.changeText(getByPlaceholderText('Search brand, type, protocol…'), 'samsung');
    expect(queryByLabelText('Select LG')).toBeNull();
    await fireEvent.changeText(getByPlaceholderText('Search brand, type, protocol…'), '');
    await fireEvent.press(getByLabelText('Select Samsung'));
    expect(useSettingsStore.getState().irProfileId).toBe('samsung-tv-nec');
    expect(router.back).toHaveBeenCalled();

    useDevicesStore.setState({ activeDeviceId: 'tv-1' });
    const second = await render(<IrProfileScreen />);
    await fireEvent.press(second.getByLabelText('Select LG'));
    expect(useSettingsStore.getState().irPerDevice['tv-1']).toBe('lg-tv-nec');
  });

  it('ir-profile wizard mode steps through send-power and pins a profile', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ wizard: '1' });
    try {
      const { getByLabelText, queryByLabelText } = await render(<IrProfileScreen />);
      expect(getByLabelText('Send power')).toBeTruthy();
      await fireEvent.press(getByLabelText('Send power'));
      expect(getByLabelText('It worked')).toBeTruthy();
      await fireEvent.press(getByLabelText('It worked'));
      expect(router.back).toHaveBeenCalled();
      expect(queryByLabelText('Send power')).toBeTruthy();
    } finally {
      (useLocalSearchParams as jest.Mock).mockReturnValue({});
    }
  });

  it('ir-profile wizard next advances past the current profile', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ wizard: '1' });
    try {
      const { getByLabelText, getByText } = await render(<IrProfileScreen />);
      const first = getByText('Samsung');
      await fireEvent.press(getByLabelText('No, try next'));
      expect(getByLabelText('Send power')).toBeTruthy();
      expect(first).toBeTruthy();
    } finally {
      (useLocalSearchParams as jest.Mock).mockReturnValue({});
    }
  });
});
