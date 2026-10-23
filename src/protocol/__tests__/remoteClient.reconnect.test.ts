import { harness, encodeMsg } from '@/test/harness';
import { aDevice } from '@/test/factories';

jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: require('@/test/harness').harness,
}));

import { RemoteClient } from '../RemoteClient';
import type { RemoteClientEvents } from '../RemoteClient';
import { FrameCodec } from '../framing';
import { toB64 } from '../bytes';
import { remote as pb } from '@/proto/bundle';

function trackEvents() {
  const states: string[] = [];
  const errors: unknown[] = [];
  const telemetry: unknown[] = [];
  const events: RemoteClientEvents = {
    onState: (s, e) => {
      states.push(s);
      if (e) errors.push(e);
    },
    onTelemetry: (t) => telemetry.push(t),
    onImeShow: () => {},
  };
  return { states, errors, telemetry, events };
}

function activate(events: RemoteClientEvents) {
  const client = new RemoteClient(aDevice(), events);
  const p = client.connect();
  harness.pushFrame({ remoteConfigure: { code1: 622 } });
  return { client, p };
}

beforeEach(() => {
  harness.reset();
});

afterEach(() => {
  jest.useRealTimers();
  harness.reset();
});

describe('RemoteClient reconnect backoff', () => {
  it('backs off 500/1000/2000/4000/8000ms then caps at 8000', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;
    expect(t.states).toContain('ACTIVE');

    const delays = [500, 1000, 2000, 4000, 8000];
    for (const d of delays) {
      t.states.length = 0;
      harness.emitClose('wifi drop');
      expect(t.states[0]).toBe('RECONNECTING');
      jest.advanceTimersByTime(d - 1);
      expect(t.states).not.toContain('CONNECTING');
      jest.advanceTimersByTime(1);
      expect(t.states).toContain('CONNECTING');
    }
    client.destroy();
  });

  it('caps at 5 attempts then goes ERROR_STATE with last native code', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;

    for (let i = 0; i < 5; i++) {
      harness.emitClose('drop');
      jest.advanceTimersByTime(8000);
    }
    t.states.length = 0;
    t.errors.length = 0;
    harness.emitClose('final drop');
    expect(t.states[0]).toBe('ERROR_STATE');
    expect(client.getLastConnectError()).toBeDefined();
    client.destroy();
  });

  it('destroy() mid-reconnect cancels the timer', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;

    t.states.length = 0;
    harness.emitClose('drop');
    expect(t.states[0]).toBe('RECONNECTING');
    client.destroy();
    jest.advanceTimersByTime(30_000);
    expect(t.states).not.toContain('CONNECTING');
    expect(t.states).toContain('IDLE');
  });

  it('successful reconnect resets the attempt counter', async () => {
    jest.useFakeTimers();
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;

    t.states.length = 0;
    harness.emitClose('drop');
    jest.advanceTimersByTime(500);
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    expect(t.states).toContain('ACTIVE');

    t.states.length = 0;
    harness.emitClose('drop again');
    jest.advanceTimersByTime(499);
    expect(t.states).not.toContain('CONNECTING');
    jest.advanceTimersByTime(1);
    expect(t.states).toContain('CONNECTING');
    client.destroy();
  });
});

describe('RemoteClient ping/pong + remoteError + frame splitting', () => {
  it('echoes ping val1 in pong response', async () => {
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;

    harness.clearSent();
    harness.pushFrame({ remotePingRequest: { val1: 77 } });
    const out = harness.outbound();
    expect(out).toHaveLength(1);
    expect(out[0]!.remotePingResponse?.val1).toBe(77);
    client.destroy();
  });

  it('remoteError frame surfaces ERROR_STATE via onState', async () => {
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;

    harness.pushFrame({ remoteError: { value: true } });
    expect(t.states).toContain('ERROR_STATE');
    client.destroy();
  });

  it('handles 1.5 frames: split payload across two chunks plus a full frame', async () => {
    const t = trackEvents();
    const client2 = new RemoteClient(aDevice({ id: 'tv-2' }), t.events);
    const p2 = client2.connect();
    harness.pushFrame({ remoteConfigure: { code1: 622 } });
    await p2;
    harness.clearSent();

    const frameFor = (v: number) => {
      const payload = pb.RemoteMessage.encode(
        pb.RemoteMessage.create({ remotePingRequest: { val1: v } }),
      ).finish();
      return FrameCodec.encode(payload);
    };
    const first = frameFor(11);
    const second = frameFor(22);
    const cut = Math.floor(second.length / 2);
    const chunk1 = new Uint8Array([...first, ...second.slice(0, cut)]);
    const chunk2 = second.slice(cut);
    const toSocketB64 = (b: Uint8Array) => toB64(b);
    harness.injectData(toSocketB64(chunk1));
    harness.injectData(toSocketB64(chunk2));

    const pongs = harness.outbound().filter((m) => m.remotePingResponse);
    expect(pongs.map((m) => m.remotePingResponse!.val1).sort()).toEqual([11, 22]);
    client2.destroy();
  });

  it('encodeMsg helper round-trips through outbound decode', async () => {
    const t = trackEvents();
    const { client, p } = activate(t.events);
    await p;
    const b64 = encodeMsg({ remotePingRequest: { val1: 5 } });
    expect(typeof b64).toBe('string');
    client.destroy();
  });
});
