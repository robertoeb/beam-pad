import { render, userEvent } from '@testing-library/react-native';
import SettingsIndex from '@/app/settings/index';
import { useSettingsStore } from '@/stores/settings';
import { router } from 'expo-router';

beforeEach(() => {
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: 'lg-tv-nec',
    irAvailable: true,
    haptics: true,
    hapticStrength: 'light',
    powerKeyMode: 'toggle',
    density: 'comfortable',
    reduceMotion: 'system',
    showShortcutLabels: false,
    volumeStep: 1,
    backDoubleTapHome: false,
    okLongPress: 'voice',
    wakeOnConnect: false,
    irPerDevice: {},
    irRepeatCount: 1,
    irGapMs: 40,
  });
});

describe('SettingsIndex', () => {
  it('renders all sections and navigates to sub-routes', async () => {
    const user = userEvent.setup();
    const { getByText, getByLabelText, getAllByText } = await render(<SettingsIndex />);

    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Volume')).toBeTruthy();
    expect(getByText('IR Control')).toBeTruthy();
    expect(getByText('Buttons')).toBeTruthy();
    expect(getAllByText('Appearance').length).toBeGreaterThanOrEqual(1);
    expect(getAllByText('About').length).toBeGreaterThanOrEqual(1);

    await user.press(getByLabelText('IR Studio'));
    expect(router.push).toHaveBeenCalledWith('/settings/ir');

    await user.press(getByLabelText('Appearance'));
    expect(router.push).toHaveBeenCalledWith('/settings/appearance');

    await user.press(getByLabelText('Back'));
    expect(router.back).toHaveBeenCalled();
  });

  it('toggles volume target via SegmentedControl', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<SettingsIndex />);

    await user.press(getByLabelText('Hardware (IR)'));
    expect(useSettingsStore.getState().volumeTarget).toBe('ir');
  });

  it('toggles wake on connect', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<SettingsIndex />);

    await user.press(getByLabelText('Wake on connect'));
    expect(useSettingsStore.getState().wakeOnConnect).toBe(true);
  });
});
