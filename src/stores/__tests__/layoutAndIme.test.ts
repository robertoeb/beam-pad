import { useImeStore } from '@/stores/ime';
import { useLayoutStore } from '@/stores/layout';

describe('imeStore & layoutStore', () => {
  it('updates IME store visibility and field status', () => {
    const status = { text: 'hello' } as any;
    useImeStore.getState().showField(status);
    expect(useImeStore.getState().visible).toBe(true);
    expect(useImeStore.getState().field).toBe(status);

    useImeStore.getState().hideField();
    expect(useImeStore.getState().visible).toBe(false);
    expect(useImeStore.getState().field).toBeNull();
  });

  it('updates layout store pinned apps and sheet state', () => {
    useLayoutStore.getState().setPinned(['youtube']);
    expect(useLayoutStore.getState().pinned).toEqual(['youtube']);

    useLayoutStore.getState().setMoreSheet(true);
    expect(useLayoutStore.getState().moreSheetOpen).toBe(true);
  });
});
