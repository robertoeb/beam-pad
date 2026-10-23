import { harness } from '@/test/harness';
import { FrameCodec } from '../framing';
import { toB64 } from '../bytes';
import { pairing as pb } from '@/proto/bundle';

jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: require('@/test/harness').harness,
}));

import { PairingProtocol } from '../PairingProtocol';
import type { PairingStep } from '../PairingProtocol';

function encodePairing(fields: pb.IPairingMessage): string {
  const payload = pb.PairingMessage.encode(pb.PairingMessage.create(fields)).finish();
  return toB64(FrameCodec.encode(payload));
}

function track() {
  const steps: PairingStep[] = [];
  const errors: unknown[] = [];
  return {
    steps,
    errors,
    cb: {
      onStep: (s: PairingStep, e?: unknown) => {
        steps.push(s);
        if (e) errors.push(e);
      },
    },
  };
}

function driveToAwaitingCode() {
  harness.injectData(encodePairing({ status: 200, pairingRequestAck: {} }));
  harness.injectData(encodePairing({ status: 200, pairingOption: {} }));
  harness.injectData(encodePairing({ status: 200, pairingConfigurationAck: {} }));
}

beforeEach(() => {
  harness.reset();
  jest.useRealTimers();
});

afterEach(() => {
  jest.useRealTimers();
  harness.reset();
});

describe('PairingProtocol branch coverage', () => {
  it('happy path reaches done with a usable cert', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    expect(t.steps).toContain('request');
    driveToAwaitingCode();
    expect(t.steps).toContain('awaiting_code');
    p.submitCode('abc123');
    expect(t.steps).toContain('secret');
    harness.injectData(encodePairing({ status: 200, pairingSecretAck: {} }));
    expect(t.steps).toContain('done');
    const result = p.getResult();
    expect(result?.certPem).toContain('FAKE_CERT');
  });

  it('accepts alternate OK status numerics (null, 0, 1, 2)', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    harness.injectData(encodePairing({ pairingRequestAck: {} }));
    expect(t.steps).toContain('option');
    harness.injectData(encodePairing({ status: 0, pairingOption: {} }));
    expect(t.steps).toContain('configuration');
    harness.injectData(encodePairing({ status: 1 as pb.Status, pairingConfigurationAck: {} }));
    expect(t.steps).toContain('awaiting_code');
    p.cancel();
  });

  it('STATUS_ERROR while awaiting code cancels (TV-side cancel)', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    driveToAwaitingCode();
    harness.injectData(encodePairing({ status: 400 }));
    expect(t.steps).toContain('cancelled');
  });

  it('STATUS_ERROR retries across service names then fails', async () => {
    jest.useFakeTimers();
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    const startPromise = p.start();
    await startPromise;
    harness.injectData(encodePairing({ status: 400 }));
    await jest.advanceTimersByTimeAsync(200);
    harness.injectData(encodePairing({ status: 400 }));
    await jest.advanceTimersByTimeAsync(200);
    harness.injectData(encodePairing({ status: 400 }));
    expect(t.steps).toContain('failed');
    expect(t.errors.length).toBeGreaterThan(0);
    jest.useRealTimers();
  });

  it('unknown error status fails with TV status detail', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    harness.injectData(encodePairing({ status: 500 as pb.Status }));
    expect(t.steps).toContain('failed');
  });

  it('socket closed while awaiting code cancels; error state fails', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    driveToAwaitingCode();
    harness.emitState('closed', 'tv gone');
    expect(t.steps).toContain('cancelled');

    const t2 = track();
    const p2 = new PairingProtocol('192.168.1.51', t2.cb);
    await p2.start();
    harness.emitState('error', 'boom');
    expect(t2.steps).toContain('failed');
  });

  it('non-error socket drop mid-handshake fails', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    harness.emitState('connecting');
    expect(t.steps).toContain('failed');
  });

  it('handshake timeout fails a stalled request', async () => {
    jest.useFakeTimers();
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    expect(t.steps).toContain('request');
    await jest.advanceTimersByTimeAsync(20_000);
    expect(t.steps).toContain('failed');
    jest.useRealTimers();
  });

  it('start() failure (cert generation) fails cleanly', async () => {
    const t = track();
    const orig = harness.generateClientCertificate;
    harness.generateClientCertificate = (async () => {
      throw new Error('no keystore');
    }) as never;
    const p = new PairingProtocol('192.168.1.50', t.cb);
    try {
      await p.start();
    } finally {
      harness.generateClientCertificate = orig;
    }
    expect(t.steps).toContain('failed');
  });

  it('submitCode guards: cancelled, wrong step, missing components', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    p.cancel();
    expect(t.steps).toContain('cancelled');
    // Cancelled protocol ignores submitCode.
    p.submitCode('ABC123');
    expect(t.steps).not.toContain('secret');

    // Fresh protocol without start() has no components: force it to
    // awaiting_code via injected frames, then submitCode must fail.
    const t2 = track();
    const p2 = new PairingProtocol('192.168.1.50', t2.cb);
    const ackPayload = pb.PairingMessage.encode(
      pb.PairingMessage.create({ status: 200, pairingConfigurationAck: {} }),
    ).finish();
    p2._injectFrames([FrameCodec.encode(ackPayload)]);
    expect(t2.steps).toContain('awaiting_code');
    p2.submitCode('ABC123');
    expect(t2.steps).toContain('failed');
    expect(p2.getResult()).toBeNull();

    // Wrong step (request, not awaiting_code) ignores submitCode.
    const t3 = track();
    const p3 = new PairingProtocol('192.168.1.50', t3.cb);
    await p3.start();
    p3.submitCode('ABC123');
    expect(t3.steps).not.toContain('secret');
    p3.cancel();
  });

  it('cancel is idempotent and ignored after done/failed', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    p.cancel();
    p.cancel();
    expect(t.steps.filter((s) => s === 'cancelled')).toHaveLength(1);

    const t2 = track();
    const p2 = new PairingProtocol('192.168.1.50', t2.cb);
    await p2.start();
    harness.emitState('error', 'boom');
    expect(t2.steps).toContain('failed');
    p2.cancel();
    expect(t2.steps).not.toContain('cancelled');
  });

  it('ignores frames for other socket ids', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    await p.start();
    const ownId = harness.lastSocketId;
    const before = t.steps.length;
    // Emit a frame addressed to a foreign socket: p must ignore it.
    harness.lastSocketId = 'pairing-foreign-id';
    try {
      harness.injectData(encodePairing({ status: 200, pairingRequestAck: {} }));
    } finally {
      harness.lastSocketId = ownId;
    }
    expect(t.steps.length).toBe(before);
    p.cancel();
  });

  it('exposes current step for diagnostics', async () => {
    const t = track();
    const p = new PairingProtocol('192.168.1.50', t.cb);
    expect(p._step).toBe('probing');
    await p.start();
    expect(p._step).toBe('request');
    p.cancel();
  });
});
