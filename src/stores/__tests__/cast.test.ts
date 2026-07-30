import { useCastStore } from '../cast';

beforeEach(() => {
  useCastStore.setState({
    discovering: false,
    connected: false,
    deviceName: undefined,
    mediaStatus: 'idle',
    mediaTitle: undefined,
    castSheetOpen: false,
  });
});

describe('castStore', () => {
  it('has correct defaults', () => {
    const state = useCastStore.getState();
    expect(state.discovering).toBe(false);
    expect(state.connected).toBe(false);
    expect(state.deviceName).toBeUndefined();
    expect(state.mediaStatus).toBe('idle');
    expect(state.castSheetOpen).toBe(false);
  });

  it('set merges partial state', () => {
    useCastStore.getState().set({ connected: true, deviceName: 'Living Room TV' });
    const state = useCastStore.getState();
    expect(state.connected).toBe(true);
    expect(state.deviceName).toBe('Living Room TV');
  });

  it('transitions through connected -> deviceName set -> ended resets', () => {
    useCastStore.getState().set({ connected: true });
    expect(useCastStore.getState().connected).toBe(true);

    useCastStore.getState().set({ deviceName: 'Bedroom TV', mediaStatus: 'playing' });
    expect(useCastStore.getState().deviceName).toBe('Bedroom TV');
    expect(useCastStore.getState().mediaStatus).toBe('playing');

    useCastStore.getState().set({
      connected: false,
      deviceName: undefined,
      mediaStatus: 'idle',
    });
    const final = useCastStore.getState();
    expect(final.connected).toBe(false);
    expect(final.deviceName).toBeUndefined();
    expect(final.mediaStatus).toBe('idle');
  });

  it('setCastSheet toggles castSheetOpen', () => {
    useCastStore.getState().setCastSheet(true);
    expect(useCastStore.getState().castSheetOpen).toBe(true);
    useCastStore.getState().setCastSheet(false);
    expect(useCastStore.getState().castSheetOpen).toBe(false);
  });

  it('mediaStatus transitions through buffering -> playing -> paused', () => {
    useCastStore.getState().set({ mediaStatus: 'buffering' });
    expect(useCastStore.getState().mediaStatus).toBe('buffering');

    useCastStore.getState().set({ mediaStatus: 'playing' });
    expect(useCastStore.getState().mediaStatus).toBe('playing');

    useCastStore.getState().set({ mediaStatus: 'paused' });
    expect(useCastStore.getState().mediaStatus).toBe('paused');
  });
});
