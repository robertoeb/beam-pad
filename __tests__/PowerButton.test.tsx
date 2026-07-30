import { render, userEvent } from '@testing-library/react-native';
import { PowerButton } from '@/components/PowerButton';
import { powerShortPress, powerHoldStart, powerHoldEnd } from '@/services/power';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settings';

jest.mock('@/services/power', () => ({
  powerShortPress: jest.fn(),
  powerHoldStart: jest.fn(),
  powerHoldEnd: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
  (powerShortPress as jest.Mock).mockClear();
  (powerHoldStart as jest.Mock).mockClear();
  (powerHoldEnd as jest.Mock).mockClear();
  (Haptics.impactAsync as jest.Mock).mockClear();
  useSettingsStore.setState({ haptics: true });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('PowerButton', () => {
  it('short press calls powerShortPress', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PowerButton />);

    await user.press(getByLabelText('Power'));

    expect(powerShortPress).toHaveBeenCalled();
    expect(powerHoldStart).not.toHaveBeenCalled();
    expect(powerHoldEnd).not.toHaveBeenCalled();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('hold for 800ms calls powerHoldStart + Heavy haptic', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PowerButton />);

    await user.longPress(getByLabelText('Power'), { duration: 800 });

    expect(powerHoldStart).toHaveBeenCalled();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
    expect(powerHoldEnd).toHaveBeenCalled();
    expect(powerShortPress).not.toHaveBeenCalled();
  });

  it('early release fires short press, no hold', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PowerButton />);

    await user.longPress(getByLabelText('Power'), { duration: 400 });

    expect(powerShortPress).toHaveBeenCalled();
    expect(powerHoldStart).not.toHaveBeenCalled();
    expect(powerHoldEnd).not.toHaveBeenCalled();
  });

  it('suppresses haptics when haptics disabled', async () => {
    useSettingsStore.setState({ haptics: false });
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PowerButton />);

    await user.press(getByLabelText('Power'));

    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(powerShortPress).toHaveBeenCalled();
  });
});
