import { render, userEvent, fireEvent } from '@testing-library/react-native';
import DevicesScreen from '@/app/devices';
import { useDevicesStore } from '@/stores/devices';
import { router } from 'expo-router';

jest.mock('@/services/discovery', () => ({
  startDiscovery: jest.fn(),
  stopDiscovery: jest.fn(),
}));

describe('DevicesScreen', () => {
  it('shows scanning state while empty and hides manual entry', async () => {
    useDevicesStore.setState({ found: {}, scanning: true });

    const { getByText, queryByPlaceholderText } = await render(<DevicesScreen />);
    expect(getByText('Scanning for TVs…')).toBeTruthy();
    expect(queryByPlaceholderText('TV IP address')).toBeNull();
  });

  it('supports manual entry when not scanning', async () => {
    const user = userEvent.setup();
    useDevicesStore.setState({ found: {}, scanning: false });

    const { getByPlaceholderText, getAllByText, getByText } = await render(<DevicesScreen />);
    expect(getByText('No TVs found')).toBeTruthy();

    const hostInput = getByPlaceholderText('TV IP address');
    fireEvent.changeText(hostInput, '192.168.1.120');

    const pairButtons = getAllByText('Pair');
    await user.press(pairButtons[0]!);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.120', port: 6466, name: 'Manual Entry' },
    });
  });

  it('renders discovered devices and pairs on button press', async () => {
    const user = userEvent.setup();
    useDevicesStore.setState({
      found: {
        '192.168.1.50': {
          name: 'Living Room TV',
          host: '192.168.1.50',
          port: 6467,
          txt: {},
          lastSeen: Date.now(),
        },
      },
    });

    const { getByText, getAllByText } = await render(<DevicesScreen />);
    expect(getByText('Living Room TV')).toBeTruthy();

    const pairButton = getAllByText('Pair')[0]!;
    await user.press(pairButton);

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/pairing',
      params: { host: '192.168.1.50', port: 6467, name: 'Living Room TV' },
    });
  });
});
