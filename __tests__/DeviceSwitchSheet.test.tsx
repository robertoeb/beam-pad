import { render, userEvent } from '@testing-library/react-native';
import { DeviceSwitchSheet } from '@/components/DeviceSwitchSheet';
import { useDevicesStore } from '@/stores/devices';
import { switchTo } from '@/services/sessionManager';

jest.mock('@/services/sessionManager', () => ({
  switchTo: jest.fn(() => Promise.resolve({ ok: true })),
}));

describe('DeviceSwitchSheet', () => {
  it('renders no paired devices when empty', async () => {
    useDevicesStore.setState({ paired: {} });
    const { getByText } = await render(<DeviceSwitchSheet visible={true} onClose={jest.fn()} />);
    expect(getByText('No paired devices')).toBeTruthy();
  });

  it('renders paired devices and handles switching', async () => {
    const user = userEvent.setup();
    useDevicesStore.setState({
      paired: {
        'dev-1': {
          id: 'dev-1',
          name: 'Living Room',
          host: '192.168.1.50',
          port: 6467,
          certPem: '',
          keyPem: '',
        },
      },
      activeDeviceId: 'dev-1',
    });
    const onClose = jest.fn();

    const { getByText } = await render(<DeviceSwitchSheet visible={true} onClose={onClose} />);

    expect(getByText('Living Room')).toBeTruthy();

    await user.press(getByText('Living Room'));
    expect(switchTo).toHaveBeenCalledWith('dev-1');
    expect(onClose).toHaveBeenCalled();
  });
});
