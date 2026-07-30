import { render, userEvent, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '@/app/settings';
import { useSettingsStore } from '@/stores/settings';
import { router } from 'expo-router';

beforeEach(() => {
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: 'lg-tv-1',
    irAvailable: true,
    haptics: true,
    powerKeyMode: 'toggle',
  });
});

describe('SettingsScreen', () => {
  it('renders options and toggles volumeTarget, haptics, and powerKeyMode', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = await render(<SettingsScreen />);

    expect(getByText('Settings')).toBeTruthy();

    await user.press(getByLabelText('Hardware (IR)'));
    expect(useSettingsStore.getState().volumeTarget).toBe('ir');

    await user.press(getByLabelText('Sleep/Wake'));
    expect(useSettingsStore.getState().powerKeyMode).toBe('sleep-wake');

    await user.press(getByLabelText('Toggle haptics'));
    expect(useSettingsStore.getState().haptics).toBe(false);

    await user.press(getByLabelText('Back'));
    expect(router.back).toHaveBeenCalled();
  });

  it('opens IR profile picker and allows filtering and selection', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByPlaceholderText, getByText } = await render(<SettingsScreen />);

    await user.press(getByLabelText('Select IR profile'));
    expect(getByText('IR Device Profile')).toBeTruthy();

    const searchInput = getByPlaceholderText('Search brand, type, protocol…');
    fireEvent.changeText(searchInput, 'Sony');

    await user.press(getByLabelText('Select Sony'));
    expect(useSettingsStore.getState().irProfileId).toBe('sony-tv-sirc12');
  });
});
