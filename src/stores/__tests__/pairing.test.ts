import { usePairingStore } from '@/stores/pairing';

describe('pairingStore', () => {
  it('updates step, error, protocol, and resets state', () => {
    usePairingStore.getState().setStep('awaiting_code');
    expect(usePairingStore.getState().step).toBe('awaiting_code');

    usePairingStore.getState().setError('Failed');
    expect(usePairingStore.getState().error).toBe('Failed');

    const mockProto = {} as any;
    usePairingStore.getState().setProtocol(mockProto);
    expect(usePairingStore.getState().protocol).toBe(mockProto);

    usePairingStore.getState().reset();
    expect(usePairingStore.getState().step).toBe('probing');
    expect(usePairingStore.getState().error).toBeUndefined();
    expect(usePairingStore.getState().protocol).toBeNull();
  });
});
