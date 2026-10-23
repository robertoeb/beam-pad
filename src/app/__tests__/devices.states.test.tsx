import { render, fireEvent, userEvent } from '@testing-library/react-native';
import DevicesScreen from '../devices';
import { useDevicesStore } from '@/stores/devices';
import { startDiscovery } from '@/services/discovery';
import { router } from 'expo-router';

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
    const user = userEvent.setup();
    useDevicesStore.setState({ found: {}, scanning: false });
    const { getByPlaceholderText, getAllByText } = await render(<DevicesScreen />);
    await user.type(getByPlaceholderText('TV IP address'), '   ');
    await user.press(getAllByText('Pair')[0]!);
    expect(router.push).not.toHaveBeenCalled();
  });

  it('manual entry navigates with COMMAND_PORT', async () => {
    const user = userEvent.setup();
    useDevicesStore.setState({ found: {}, scanning: false });
    const { getByPlaceholderText, getAllByText } = await render(<DevicesScreen />);
    await user.type(getByPlaceholderText('TV IP address'), '192.168.1.120');
    await user.press(getAllByText('Pair')[0]!);
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.120', port: 6466, name: 'Manual Entry' },
    });
  });
});
