import { startDiscovery, stopDiscovery } from '@/services/discovery';
import { AtvDiscovery } from '@/modules/expo-atv-discovery';
import { useDevicesStore } from '@/stores/devices';

jest.mock('@/modules/expo-atv-discovery', () => ({
  AtvDiscovery: {
    onEvent: jest.fn(),
    startDiscovery: jest.fn(() => Promise.resolve()),
    stopDiscovery: jest.fn(),
  },
}));

beforeEach(() => {
  useDevicesStore.setState({ found: {} });
  jest.clearAllMocks();
});

describe('discovery service', () => {
  it('starts discovery and handles resolved and lost events', () => {
    let callback: (e: any) => void = () => {};
    (AtvDiscovery.onEvent as jest.Mock).mockImplementation((cb) => {
      callback = cb;
      return { remove: jest.fn() };
    });

    startDiscovery();
    expect(AtvDiscovery.startDiscovery).toHaveBeenCalled();

    callback({
      type: 'resolved',
      name: 'Living Room TV',
      host: '192.168.1.100',
      port: 6467,
      txt: { model: 'AppleTV' },
    });

    expect(useDevicesStore.getState().found['192.168.1.100']).toMatchObject({
      name: 'Living Room TV',
      host: '192.168.1.100',
      port: 6467,
    });

    callback({
      type: 'lost',
      name: 'Living Room TV',
    });

    expect(useDevicesStore.getState().found['192.168.1.100']).toBeUndefined();

    stopDiscovery();
    expect(AtvDiscovery.stopDiscovery).toHaveBeenCalled();
  });
});
