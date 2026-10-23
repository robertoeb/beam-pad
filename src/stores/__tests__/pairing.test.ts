import { usePairingStore } from '@/stores/pairing';

describe('pairingStore', () => {
  it('updates step and error, and resets UI state (protocol lives in services/pairing)', () => {
    usePairingStore.getState().setStep('awaiting_code');
    expect(usePairingStore.getState().step).toBe('awaiting_code');

    usePairingStore.getState().setError('Failed');
    expect(usePairingStore.getState().error).toBe('Failed');

    usePairingStore.getState().reset();
    expect(usePairingStore.getState().step).toBe('probing');
    expect(usePairingStore.getState().error).toBeUndefined();
  });

  it('holds no protocol instance (non-serializable, owned by the service)', () => {
    expect('protocol' in usePairingStore.getState()).toBe(false);
    expect('setProtocol' in usePairingStore.getState()).toBe(false);
  });
});
