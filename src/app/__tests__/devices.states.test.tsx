import { render, fireEvent, act, userEvent } from '@testing-library/react-native';
import DevicesScreen from '../devices';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { startDiscovery } from '@/services/discovery';
import { aDevice } from '@/test/factories';
import { router } from 'expo-router';

jest.mock('@/services/discovery', () => ({
  startDiscovery: jest.fn(),
  stopDiscovery: jest.fn(),
}));

// handlePair defers removeFound by 0ms so navigation wins the race; flush
// it inside act so the store update never lands outside a test scope.
async function flushPairTimer() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

function foundDevice(overrides = {}) {
  return {
    name: 'Living Room TV',
    host: '192.168.1.50',
    port: 6467,
    txt: {},
    lastSeen: Date.now(),
    ...overrides,
  };
}

beforeEach(() => {
  useDevicesStore.setState({ found: {}, paired: {}, activeDeviceId: null, scanning: false });
  jest.clearAllMocks();
});

describe('DevicesScreen states', () => {
  it('scanning + empty shows scanning copy and hides manual entry', async () => {
    await act(async () => {
      useDevicesStore.setState({ found: {}, scanning: true });
    });
    const { getByText, queryByPlaceholderText } = await render(<DevicesScreen />);
    expect(getByText('Scanning for TVs…')).toBeTruthy();
    expect(queryByPlaceholderText('TV IP address')).toBeNull();
  });

  it('idle + empty shows No TVs found with rescan action', async () => {
    await act(async () => {
      useDevicesStore.setState({ found: {}, scanning: false });
    });
    const { getByText, getByPlaceholderText } = await render(<DevicesScreen />);
    expect(getByText('No TVs found')).toBeTruthy();
    expect(getByPlaceholderText('TV IP address')).toBeTruthy();
    await fireEvent.press(getByText('Scan again'));
    expect(startDiscovery).toHaveBeenCalled();
  });

  it('lists found devices with host:port', async () => {
    await act(async () => {
      useDevicesStore.setState({ found: { '192.168.1.50': foundDevice() }, scanning: true });
    });
    const { getByText } = await render(<DevicesScreen />);
    expect(getByText('Living Room TV')).toBeTruthy();
    expect(getByText('192.168.1.50:6467')).toBeTruthy();
  });

  it('pair button navigates to pairing screen', async () => {
    await act(async () => {
      useDevicesStore.setState({ found: { '192.168.1.50': foundDevice() } });
    });
    const { getAllByText } = await render(<DevicesScreen />);
    await fireEvent.press(getAllByText('Pair')[0]!);
    await flushPairTimer();
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.50', port: 6467, name: 'Living Room TV' },
    });
  });

  it('scan window expiry re-enables manual entry', async () => {
    jest.useFakeTimers();
    try {
      await act(async () => {
        useDevicesStore.setState({ found: {}, scanning: true });
      });
      const { queryByPlaceholderText } = await render(<DevicesScreen />);
      expect(queryByPlaceholderText('TV IP address')).toBeNull();
      await act(async () => {
        await jest.advanceTimersByTimeAsync(15_000);
      });
      expect(queryByPlaceholderText('TV IP address')).toBeTruthy();
    } finally {
      jest.useRealTimers();
    }
  });

  it('manual entry with blank host does not navigate', async () => {
    const user = userEvent.setup();
    await act(async () => {
      useDevicesStore.setState({ found: {}, scanning: false });
    });
    const { getByPlaceholderText, getAllByText } = await render(<DevicesScreen />);
    await user.type(getByPlaceholderText('TV IP address'), '   ');
    await user.press(getAllByText('Pair')[0]!);
    expect(router.push).not.toHaveBeenCalled();
  });

  it('manual entry navigates with COMMAND_PORT', async () => {
    const user = userEvent.setup();
    await act(async () => {
      useDevicesStore.setState({ found: {}, scanning: false });
    });
    const { getByPlaceholderText, getAllByText } = await render(<DevicesScreen />);
    await user.type(getByPlaceholderText('TV IP address'), '192.168.1.120');
    await user.press(getAllByText('Pair')[0]!);
    await flushPairTimer();
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.120', port: 6466, name: 'Manual Entry' },
    });
  });

  it('lists paired TVs with forget buttons', async () => {
    await act(async () => {
      useDevicesStore.setState({
        found: {},
        scanning: false,
        paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
        activeDeviceId: 'tv-1',
      });
    });
    const { getByText, getByLabelText } = await render(<DevicesScreen />);
    expect(getByText('Paired TVs')).toBeTruthy();
    expect(getByText('Living Room')).toBeTruthy();
    expect(getByLabelText('Forget Living Room')).toBeTruthy();
  });

  it('forget removes a non-active device', async () => {
    const user = userEvent.setup();
    await act(async () => {
      useDevicesStore.setState({
        found: {},
        scanning: false,
        paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
        activeDeviceId: null,
      });
    });
    const { getByLabelText, queryByText } = await render(<DevicesScreen />);
    await user.press(getByLabelText('Forget Living Room'));
    expect(useDevicesStore.getState().paired['tv-1']).toBeUndefined();
    expect(queryByText('Living Room')).toBeNull();
  });

  it('forgetting the active device disconnects and clears it', async () => {
    const user = userEvent.setup();
    await act(async () => {
      useDevicesStore.setState({
        found: {},
        scanning: false,
        paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
        activeDeviceId: 'tv-1',
      });
    });
    await act(async () => {
      useConnectionStore.setState({ state: 'ACTIVE' } as never);
    });
    const { getByLabelText } = await render(<DevicesScreen />);
    await user.press(getByLabelText('Forget Living Room'));
    expect(useDevicesStore.getState().paired['tv-1']).toBeUndefined();
    expect(useDevicesStore.getState().activeDeviceId).toBeNull();
    expect(useConnectionStore.getState().state).toBe('IDLE');
  });
});
