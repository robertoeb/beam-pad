import { harness } from '@/test/harness';
import { aDevice } from '@/test/factories';

jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: require('@/test/harness').harness,
}));

import {
  connect,
  disconnect,
  switchTo,
  reset,
  getClient,
  getActiveClient,
  session,
} from '../session';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';

const DEVICE_ID = 'tv-session-1';

beforeEach(() => {
  harness.reset();
  reset();
  useDevicesStore.setState({ found: {}, paired: {}, activeDeviceId: null, scanning: false });
  useDevicesStore.getState().addPaired(aDevice({ id: DEVICE_ID }));
  useConnectionStore.setState({ state: 'IDLE', error: undefined });
});

afterEach(() => {
  jest.useRealTimers();
  reset();
  harness.reset();
});

function activate() {
  harness.pushFrame({ remoteConfigure: { code1: 622 } });
}

describe('session switchTo', () => {
  it('returns ok:false for unknown device', async () => {
    const r = await switchTo('nope');
    expect(r.ok).toBe(false);
    expect(r.error).toBeDefined();
  });

  it('resolves ok:true when client reaches ACTIVE', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    activate();
    const r = await p;
    expect(r.ok).toBe(true);
    expect(r.elapsedMs).toBeGreaterThanOrEqual(0);
    expect(useConnectionStore.getState().state).toBe('ACTIVE');
    jest.useRealTimers();
  });

  it('short-circuits when already on the device', async () => {
    useDevicesStore.getState().setActive(DEVICE_ID);
    const r = await switchTo(DEVICE_ID);
    expect(r).toMatchObject({ ok: true, elapsedMs: 0 });
    expect(harness.connectCallCount).toBe(0);
  });

  it('returns ok:false on timeout without server configure', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    jest.advanceTimersByTime(13_000);
    const r = await p;
    expect(r.ok).toBe(false);
    expect(r.error).toBeDefined();
    jest.useRealTimers();
  });

  it('returns ok:false after repeated native failures (ERROR_STATE)', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    for (let i = 0; i < 6; i++) {
      harness.emitClose('auth failed');
      jest.advanceTimersByTime(8000);
    }
    const r = await p;
    expect(r.ok).toBe(false);
    jest.useRealTimers();
  });
});

describe('session connect/disconnect/reset', () => {
  it('connect throws for unknown device', async () => {
    await expect(connect('ghost')).rejects.toThrow('unknown device ghost');
  });

  it('disconnect and reset clear the active client', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    activate();
    await p;
    expect(getClient()).not.toBeNull();
    disconnect();
    expect(getClient()).toBeNull();
    expect(getActiveClient()).toBeNull();
    jest.useRealTimers();
  });

  it('getClient identity is stable and matches session facade', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    activate();
    await p;
    expect(getClient()).toBe(getActiveClient());
    expect(session.client).toBe(getClient());
    expect(session.getClient()).toBe(getClient());
    expect(session.getActiveClient()).toBe(getClient());
    jest.useRealTimers();
  });

  it('telemetry merges into connection store', async () => {
    jest.useFakeTimers();
    const p = switchTo(DEVICE_ID);
    activate();
    await p;
    harness.pushFrame({
      remoteSetVolumeLevel: { volumeMax: 30, volumeLevel: 15, volumeMuted: true, playerModel: 'X' },
    });
    expect(useConnectionStore.getState().volume).toMatchObject({ level: 15, max: 30, muted: true });
    jest.useRealTimers();
  });
});
