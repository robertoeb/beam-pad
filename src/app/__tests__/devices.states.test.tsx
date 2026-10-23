import { render, fireEvent, act } from '@testing-library/react-native';
import DevicesScreen from '../devices';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { startDiscovery } from '@/services/discovery';
import { aDevice } from '@/test/factories';
import { router } from 'expo-router';

// TextInput-driven suite: CI runners can stall past the 5s default under
// load. 15s still catches real hangs.
jest.setTimeout(15_000);

jest.mock('@/services/discovery', () => ({
  startDiscovery: jest.fn(),
  stopDiscovery: jest.fn(),
}));

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
    useDevicesStore.setState({ found: {}, scanning: true });
    const { getByText, queryByPlaceholderText } = await render(<DevicesScreen />);
    expect(getByText('Scanning for TVs…')).toBeTruthy();
    expect(queryByPlaceholderText('TV IP address')).toBeNull();
  });

  it('idle + empty shows No TVs found with rescan action', async () => {
    useDevicesStore.setState({ found: {}, scanning: false });
    const { getByText, getByPlaceholderText } = await render(<DevicesScreen />);
    expect(getByText('No TVs found')).toBeTruthy();
    expect(getByPlaceholderText('TV IP address')).toBeTruthy();
    await fireEvent.press(getByText('Scan again'));
    expect(startDiscovery).toHaveBeenCalled();
  });

  it('lists found devices with host:port', async () => {
    useDevicesStore.setState({ found: { '192.168.1.50': foundDevice() }, scanning: true });
    const { getByText } = await render(<DevicesScreen />);
    expect(getByText('Living Room TV')).toBeTruthy();
    expect(getByText('192.168.1.50:6467')).toBeTruthy();
  });

  it('pair button navigates to pairing screen', async () => {
    useDevicesStore.setState({ found: { '192.168.1.50': foundDevice() } });
    const { getAllByText } = await render(<DevicesScreen />);
    await fireEvent.press(getAllByText('Pair')[0]!);
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.50', port: 6467, name: 'Living Room TV' },
    });
  });

  it('manual entry with blank host does not navigate', async () => {
    useDevicesStore.setState({ found: {}, scanning: false });
    const { getAllByText } = await render(<DevicesScreen />);
    // Initial value is '' (blank) — no typing needed; pressing Pair is a no-op.
    await fireEvent.press(getAllByText('Pair')[0]!);
    expect(router.push).not.toHaveBeenCalled();
  });

  it('manual entry navigates with COMMAND_PORT', async () => {
    useDevicesStore.setState({ found: {}, scanning: false });
    const { getByPlaceholderText, getAllByText } = await render(<DevicesScreen />);
    const input = getByPlaceholderText('TV IP address');
    await act(async () => {
      fireEvent(input, 'onChangeText', '192.168.1.120');
    });
    expect(
      (getByPlaceholderText('TV IP address') as unknown as { props: { value: string } })
        .props.value,
    ).toBe('192.168.1.120');
    await fireEvent.press(getAllByText('Pair')[0]!);
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.120', port: 6466, name: 'Manual Entry' },
    });
  });

  it('lists paired TVs with forget buttons', async () => {
    useDevicesStore.setState({
      found: {},
      scanning: false,
      paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
      activeDeviceId: 'tv-1',
    });
    const { getByText, getByLabelText } = await render(<DevicesScreen />);
    expect(getByText('Paired TVs')).toBeTruthy();
    expect(getByText('Living Room')).toBeTruthy();
    expect(getByLabelText('Forget Living Room')).toBeTruthy();
  });

  it('forget removes a non-active device', async () => {
    useDevicesStore.setState({
      found: {},
      scanning: false,
      paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
      activeDeviceId: null,
    });
    const { getByLabelText, queryByText } = await render(<DevicesScreen />);
    await fireEvent.press(getByLabelText('Forget Living Room'));
    expect(useDevicesStore.getState().paired['tv-1']).toBeUndefined();
    expect(queryByText('Living Room')).toBeNull();
  });

  it('forgetting the active device disconnects and clears it', async () => {
    useDevicesStore.setState({
      found: {},
      scanning: false,
      paired: { 'tv-1': aDevice({ id: 'tv-1', name: 'Living Room' }) },
      activeDeviceId: 'tv-1',
    });
    useConnectionStore.setState({ state: 'ACTIVE' } as never);
    const { getByLabelText } = await render(<DevicesScreen />);
    await fireEvent.press(getByLabelText('Forget Living Room'));
    expect(useDevicesStore.getState().paired['tv-1']).toBeUndefined();
    expect(useDevicesStore.getState().activeDeviceId).toBeNull();
    expect(useConnectionStore.getState().state).toBe('IDLE');
  });
});
