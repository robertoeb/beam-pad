import { render, userEvent } from '@testing-library/react-native';
import { RemoteButton } from '@/components/RemoteButton';
import * as Haptics from 'expo-haptics';
import { CircleDot } from 'lucide-react-native';

beforeEach(() => {
  jest.useFakeTimers();
  (Haptics.impactAsync as jest.Mock).mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('RemoteButton', () => {
  it('fires onPress on tap', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    const utils = await render(
      <RemoteButton icon={CircleDot} onPress={onPress} accessibilityLabel="OK" testID="btn-ok" />,
    );

    await user.press(utils.getByTestId('btn-ok'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('fires long-press after 800ms hold', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    const utils = await render(
      <RemoteButton
        icon={CircleDot}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityLabel="OK"
        testID="btn-ok-2"
      />,
    );

    await user.longPress(utils.getByTestId('btn-ok-2'), { duration: 800 });

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('cancels long-press if released before 800ms', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    const utils = await render(
      <RemoteButton
        icon={CircleDot}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityLabel="OK"
        testID="btn-ok-3"
      />,
    );

    await user.longPress(utils.getByTestId('btn-ok-3'), { duration: 400 });

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('repeat mode fires and repeats at 150ms after 400ms delay', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    const utils = await render(
      <RemoteButton
        icon={CircleDot}
        onPress={onPress}
        repeat
        accessibilityLabel="Up"
        testID="btn-up"
      />,
    );

    await user.longPress(utils.getByTestId('btn-up'), { duration: 700 });

    expect(onPress).toHaveBeenCalledTimes(4);
  });

  it('renders with red accent', async () => {
    const utils = await render(
      <RemoteButton
        icon={CircleDot}
        onPress={() => {}}
        accent="red"
        accessibilityLabel="Power"
        testID="btn-power"
      />,
    );

    expect(utils.getByTestId('btn-power')).toBeTruthy();
  });
});
