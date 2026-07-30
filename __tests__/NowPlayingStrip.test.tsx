import { render, act } from '@testing-library/react-native';
import { NowPlayingStrip } from '@/components/NowPlayingStrip';
import { useConnectionStore } from '@/stores/connection';

beforeEach(() => {
  useConnectionStore.setState({
    state: 'IDLE',
    currentApp: undefined,
    volume: undefined,
  });
});

describe('NowPlayingStrip', () => {
  it('renders nothing when no current app', async () => {
    const { toJSON } = await render(<NowPlayingStrip />);
    expect(toJSON()).toBeNull();
  });

  it('renders app label from telemetry', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByText } = await render(<NowPlayingStrip />);
    expect(getByText('Netflix')).toBeTruthy();
  });

  it('shows RECONNECTING state', async () => {
    useConnectionStore.setState({ state: 'RECONNECTING' });
    const { getByText } = await render(<NowPlayingStrip />);
    expect(getByText('RECONNECTING')).toBeTruthy();
  });

  it('hides when current app is cleared', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByText } = await render(<NowPlayingStrip />);
    expect(getByText('Netflix')).toBeTruthy();

    await act(async () => {
      useConnectionStore.setState({ currentApp: undefined });
    });

    const { toJSON } = await render(<NowPlayingStrip />);
    expect(toJSON()).toBeNull();
  });
});
