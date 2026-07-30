import { useDevicesStore } from '@/stores/devices';

beforeEach(() => {
  useDevicesStore.setState({
    found: {},
    paired: {},
    activeDeviceId: null,
  });
});

describe('devicesStore', () => {
  it('upserts, removes, and clears found devices', () => {
    const dev = { name: 'TV', host: '192.168.1.50', port: 6467, txt: {}, lastSeen: 12345 };
    useDevicesStore.getState().upsertFound(dev);

    expect(useDevicesStore.getState().found['192.168.1.50']).toEqual(dev);

    useDevicesStore.getState().removeFound('192.168.1.50');
    expect(useDevicesStore.getState().found['192.168.1.50']).toBeUndefined();

    useDevicesStore.getState().upsertFound(dev);
    useDevicesStore.getState().clearFound();
    expect(useDevicesStore.getState().found).toEqual({});
  });

  it('manages paired devices and activeDeviceId', () => {
    const paired = {
      id: 'dev-1',
      name: 'Living Room TV',
      host: '192.168.1.50',
      port: 6467,
      certPem: '',
      keyPem: '',
    };
    useDevicesStore.getState().addPaired(paired);

    expect(useDevicesStore.getState().paired['dev-1']).toEqual(paired);

    useDevicesStore.getState().setActive('dev-1');
    expect(useDevicesStore.getState().activeDeviceId).toBe('dev-1');

    useDevicesStore.getState().removePaired('dev-1');
    expect(useDevicesStore.getState().paired['dev-1']).toBeUndefined();
  });
});
