import { render } from '@testing-library/react-native';
import DevicesScreen from '../devices';
import { useDevicesStore } from '@/stores/devices';

jest.mock('@/services/discovery', () => ({
  startDiscovery: jest.fn(),
  stopDiscovery: jest.fn(),
}));

// NOTE: no fake timers here — RNTL renders while fake timers are installed
// wedge subsequent tests on some Node versions. The window is injectable,
// so this suite uses a real 60ms window instead.
describe('DevicesScreen scan window', () => {
  it('scan window expiry re-enables manual entry', async () => {
    useDevicesStore.setState({ found: {}, scanning: true });
    const { queryByPlaceholderText } = await render(<DevicesScreen scanWindowMs={60} />);
    expect(queryByPlaceholderText('TV IP address')).toBeNull();
    await new Promise((r) => setTimeout(r, 120));
    expect(queryByPlaceholderText('TV IP address')).toBeTruthy();
  }, 20000);
});
