import { harness } from '@/test/harness';
import { aDevice } from '@/test/factories';

jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: require('@/test/harness').harness,
}));

import { RemoteClient } from '../RemoteClient';
import type { RemoteClientEvents } from '../RemoteClient';
import { COMMAND_PORT } from '../ports';

function trackEvents() {
  const states: string[] = [];
  const telemetry: unknown[] = [];
  const imeShows: unknown[] = [];
  const events: RemoteClientEvents = {
    onState: (s) => states.push(s),
    onTelemetry: (t) => telemetry.push(t),
    onImeShow: (s) => imeShows.push(s),
  };
  return { states, telemetry, imeShows, events };
}

beforeEach(() => {
  harness.reset();
});

afterEach(() => {
  jest.useRealTimers();
  harness.reset();
});

describe('RemoteClient branch coverage', () => {
  it('ignores socket data/state for other socket ids', async () => {
    const a = trackEvents();
    const clientA = new RemoteClient(aDevice({ id: 'a' }), a.events);
    const pA = clientA.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await pA;
    expect(a.states).toContain('ACTIVE');

    // Connect a second client: harness routes to the newest id, so A's
    // listener now sees foreign-id frames and must ignore them.
    const b = trackEvents();
    const clientB = new RemoteClient(aDevice({ id: 'b' }), b.events);
    clientB.connect();
    const before = a.states.length;
    harness.pushFrame({ remotePingRequest: { val1: 1 } });
    expect(a.states.length).toBe(before);
    clientA.destroy();
    clientB.destroy();
  });

  it('falls back to COMMAND_PORT when device port is undefined', async () => {
    const t = trackEvents();
    const device = aDevice();
    delete (device as { port?: number }).port;
    const client = new RemoteClient(device, t.events);
    const p = client.connect();
    expect(harness.connectCallCount).toBe(1);
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    expect(t.states).toContain('ACTIVE');
    expect(COMMAND_PORT).toBe(6466);
    client.destroy();
  });

  it('ping without val1 echoes 0; start without flag reports false', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    harness.clearSent();
    harness.pushFrame({ remotePingRequest: {} });
    harness.pushFrame({ remoteStart: {} });
    const out = harness.outbound();
    expect(out[0]!.remotePingResponse?.val1).toBe(0);
    expect(t.telemetry).toContainEqual({ powerOn: false });
    client.destroy();
  });

  it('volume telemetry defaults missing fields', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    harness.pushFrame({ remoteSetVolumeLevel: {} });
    expect(t.telemetry[t.telemetry.length - 1]).toEqual({
      volume: { level: 0, max: 0, muted: false, playerModel: '' },
    });
    client.destroy();
  });

  it('imeKeyInject without appInfo and imeShow without status are ignored', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    const n = t.telemetry.length;
    harness.pushFrame({ remoteImeKeyInject: {} });
    harness.pushFrame({ remoteImeShowRequest: {} });
    expect(t.telemetry.length).toBe(n);
    expect(t.imeShows.length).toBe(0);
    client.destroy();
  });

  it('second configure while ACTIVE does not re-emit setActive', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    harness.clearSent();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    // No new ACTIVE transition and no second setActive emission.
    expect(t.states.filter((s) => s === 'ACTIVE').length).toBe(1);
    expect(harness.outbound().filter((m) => m.remoteSetActive).length).toBe(0);
    client.destroy();
  });

  it('sync connect throw routes to onDrop/RECONNECTING', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const orig = harness.connect;
    harness.connect = (() => {
      throw new Error('EHOSTUNREACH');
    }) as never;
    try {
      client.connect();
    } finally {
      harness.connect = orig;
    }
    expect(t.states).toContain('RECONNECTING');
    expect(client.getLastConnectError()).toBeDefined();
    client.destroy();
    jest.useRealTimers();
  });

  it('async connect rejection routes to onDrop', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const orig = harness.connect;
    harness.connect = (async () => {
      throw new Error('connection refused');
    }) as never;
    let p: Promise<void>;
    try {
      p = client.connect();
    } finally {
      harness.connect = orig;
    }
    await Promise.resolve();
    await Promise.resolve();
    expect(t.states).toContain('RECONNECTING');
    client.destroy();
    await p!.catch(() => {});
    jest.useRealTimers();
  });

  it('destroy before activation rejects the pending connect promise', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    const assertion = expect(p).rejects.toMatchObject({ code: expect.any(String) });
    client.destroy();
    await assertion;
    expect(t.states).toContain('IDLE');
    expect(client.getLastConnectError()).toBeUndefined();
  });

  it('onDrop after destroy is a no-op', async () => {
    const t = trackEvents();
    const client = new RemoteClient(aDevice(), t.events);
    const p = client.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p;
    const n = t.states.length;
    client.destroy();
    harness.emitClose('late close');
    expect(t.states.length).toBe(n + 1);
    expect(t.states[t.states.length - 1]).toBe('IDLE');
  });
});
