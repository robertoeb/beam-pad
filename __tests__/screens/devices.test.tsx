import { render, userEvent, fireEvent } from '@testing-library/react-native';
import DevicesScreen from '@/app/devices';
import { useDevicesStore } from '@/stores/devices';
import { router } from 'expo-router';

jest.mock('@/services/discovery', () => ({
  startDiscovery: jest.fn(),
  stopDiscovery: jest.fn(),
}));

describe('DevicesScreen', () => {
  it('shows looking for TVs when empty and supports manual entry', async () => {
    const user = userEvent.setup();
    useDevicesStore.setState({ found: {} });

    const { getByPlaceholderText, getAllByText, getByText } = await render(<DevicesScreen />);
    expect(getByText('Looking for TVs on your Wi-Fi…')).toBeTruthy();

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
