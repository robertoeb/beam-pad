import { render, userEvent } from '@testing-library/react-native';
import IrStudioScreen from '@/app/settings/ir';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { IrBlaster } from '@/modules/expo-ir-blaster';

jest.mock('@/modules/expo-ir-blaster', () => ({
  IrBlaster: {
    hasIrEmitter: jest.fn(),
    getCarrierFrequencyRanges: jest.fn(),
    transmit: jest.fn(),
  },
}));

beforeEach(() => {
  (IrBlaster.hasIrEmitter as jest.Mock).mockResolvedValue(true);
  (IrBlaster.getCarrierFrequencyRanges as jest.Mock).mockResolvedValue([
    { min: 30000, max: 60000 },
  ]);
  (IrBlaster.transmit as jest.Mock).mockResolvedValue(undefined);
  useSettingsStore.setState({
    volumeTarget: 'tv-os',
    irProfileId: 'samsung-tv-nec',
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
  useDevicesStore.setState({ activeDeviceId: null, paired: {}, found: {} });
});

describe('IrStudioScreen', () => {
  it('renders all commands from the active profile', async () => {
    const { getByText } = await render(<IrStudioScreen />);

    expect(getByText('IR Studio')).toBeTruthy();
    expect(getByText('power')).toBeTruthy();
    expect(getByText('volUp')).toBeTruthy();
    expect(getByText('volDown')).toBeTruthy();
    expect(getByText('mute')).toBeTruthy();
    expect(getByText('input')).toBeTruthy();
  });

  it('shows profile info', async () => {
    const { getByText } = await render(<IrStudioScreen />);
    expect(getByText(/Samsung/)).toBeTruthy();
    expect(getByText(/NECX/)).toBeTruthy();
  });

  it('shows capability section with ranges', async () => {
    const { getByText } = await render(<IrStudioScreen />);
    expect(getByText('30–60 kHz')).toBeTruthy();
  });

  it('sends command on tap and shows sent status', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<IrStudioScreen />);

    await user.press(getByLabelText('Test power'));
    expect(IrBlaster.transmit).toHaveBeenCalled();
  });

  it('shows no-profile message when no profile selected', async () => {
    useSettingsStore.setState({ irProfileId: null });
    const { getByText } = await render(<IrStudioScreen />);
    expect(getByText('None')).toBeTruthy();
  });

  it('persists repeat count and gap changes', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<IrStudioScreen />);

    await user.press(getByLabelText('Repeat 3'));
    expect(useSettingsStore.getState().irRepeatCount).toBe(3);

    await user.press(getByLabelText('Gap 80 ms'));
    expect(useSettingsStore.getState().irGapMs).toBe(80);
  });
});
