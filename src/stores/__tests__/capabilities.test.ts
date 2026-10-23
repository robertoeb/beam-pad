import { useCapabilitiesStore, resetCapabilities } from '../capabilities';

describe('capabilities store', () => {
  it('defaults to unavailable', () => {
    resetCapabilities();
    expect(useCapabilitiesStore.getState().irAvailable).toBe(false);
  });

  it('setIrAvailable toggles and reset restores default', () => {
    useCapabilitiesStore.getState().setIrAvailable(true);
    expect(useCapabilitiesStore.getState().irAvailable).toBe(true);
    resetCapabilities();
    expect(useCapabilitiesStore.getState().irAvailable).toBe(false);
  });
});
