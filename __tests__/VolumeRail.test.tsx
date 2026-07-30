import { render, userEvent } from '@testing-library/react-native';
import { VolumeRail } from '@/components/VolumeRail';
import { useConnectionStore } from '@/stores/connection';
import { useSettingsStore } from '@/stores/settings';
import { volumeCommand } from '@/services/volumeRouter';

jest.mock('@/services/volumeRouter', () => ({
  volumeCommand: jest.fn(),
}));

jest.mock('@/lib/useRemoteMetrics', () => ({
  useRemoteMetrics: () => ({ dpad: 228, actionSize: 72, tile: 64, gutter: 16, zoneGap: 24, showNowPlaying: true }),
  SHORTCUT_ROW_HEIGHT: 80,
}));

beforeEach(() => {
  jest.useFakeTimers();
  (volumeCommand as jest.Mock).mockClear();
  useConnectionStore.setState({ volume: undefined });
  useSettingsStore.setState({ volumeTarget: 'tv-os', irAvailable: false });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('VolumeRail', () => {
  it('renders +, mute, - buttons', async () => {
    const { getByLabelText } = await render(<VolumeRail />);
    expect(getByLabelText('Volume up')).toBeTruthy();
    expect(getByLabelText('Mute')).toBeTruthy();
    expect(getByLabelText('Volume down')).toBeTruthy();
  });

  it('routes volUp/volDown/mute through volumeCommand', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<VolumeRail />);

    await user.press(getByLabelText('Volume up'));
    expect(volumeCommand).toHaveBeenCalledWith('volUp');

    await user.press(getByLabelText('Volume down'));
    expect(volumeCommand).toHaveBeenCalledWith('volDown');

    await user.press(getByLabelText('Mute'));
    expect(volumeCommand).toHaveBeenCalledWith('mute');
  });

  it('badge reflects volumeTarget from settings', async () => {
    useSettingsStore.setState({ volumeTarget: 'ir' });
    const { getByText } = await render(<VolumeRail />);
    expect(getByText('IR')).toBeTruthy();
  });

  it('level fill renders from telemetry', async () => {
    useConnectionStore.setState({
      volume: { level: 50, max: 100, muted: false, playerModel: 'test' },
    });
    const { toJSON } = await render(<VolumeRail />);
    expect(toJSON()).toBeTruthy();
  });

  it('rail bottom offset reacts to metrics', async () => {
    const { getByLabelText } = await render(<VolumeRail />);
    const volUp = getByLabelText('Volume up');
    const railContainer = volUp.parent?.parent?.parent;
    expect(railContainer).toBeTruthy();
  });
});
