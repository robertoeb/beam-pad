import {
  startPairing,
  submitPairingCode,
  cancelPairing,
  getPairingResult,
  resetPairing,
  type PairingStep,
} from '../pairing';

afterEach(() => {
  resetPairing();
});

function collect() {
  const steps: PairingStep[] = [];
  return {
    steps,
    onStep: (s: PairingStep) => {
      steps.push(s);
    },
  };
}

describe('pairing facade', () => {
  it('starts the handshake and emits early steps', async () => {
    const c = collect();
    startPairing('192.168.1.50', c.onStep);
    await new Promise((r) => setTimeout(r, 25));
    expect(c.steps).toContain('probing');
    expect(c.steps).toContain('connecting');
    expect(c.steps).toContain('request');
    cancelPairing();
  });

  it('ignores a submitted code before the TV shows one', async () => {
    const c = collect();
    startPairing('192.168.1.50', c.onStep);
    await new Promise((r) => setTimeout(r, 25));
    expect(() => submitPairingCode('ABCDEF')).not.toThrow();
    expect(c.steps).not.toContain('secret');
    cancelPairing();
  });

  it('cancel emits cancelled and drops the result', async () => {
    const c = collect();
    startPairing('192.168.1.50', c.onStep);
    await new Promise((r) => setTimeout(r, 25));
    cancelPairing();
    expect(c.steps).toContain('cancelled');
    expect(getPairingResult()).toBeNull();
  });

  it('restarting replaces the in-flight attempt', async () => {
    const first = collect();
    startPairing('192.168.1.50', first.onStep);
    const second = collect();
    startPairing('192.168.1.51', second.onStep);
    await new Promise((r) => setTimeout(r, 25));
    expect(first.steps).toContain('cancelled');
    expect(second.steps).toContain('request');
    cancelPairing();
  });
});
