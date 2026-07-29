import { switchTo, registerConnector, registerDisconnect } from '@/services/sessionManager';
import { useDevicesStore } from '@/stores/devices';

describe('sessionManager', () => {
  beforeEach(() => {
    // Reset store to initial state while preserving action functions
    useDevicesStore.setState(useDevicesStore.getInitialState());
  });

  it('switchTo returns ok with elapsedMs under budget', async () => {
    const disconnectSpy = jest.fn();
    registerDisconnect(disconnectSpy);

    registerConnector(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    const result = await switchTo('tv-1');

    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBeLessThan(1500);
    expect(disconnectSpy).toHaveBeenCalled();
    expect(useDevicesStore.getState().activeDeviceId).toBe('tv-1');
  });

  it('switchTo returns elapsedMs 0 when already active', async () => {
    useDevicesStore.getState().setActive('tv-1');
    registerConnector(jest.fn());

    const result = await switchTo('tv-1');

    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBe(0);
  });

  it('switchTo returns error on connector failure', async () => {
    registerConnector(async () => {
      throw new Error('connection refused');
    });

    const result = await switchTo('tv-2');

    expect(result.ok).toBe(false);
    expect(result.error).toContain('connection refused');
    expect(result.elapsedMs).toBeLessThan(1500);
  });
});
