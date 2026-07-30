import { useImeStore } from '@/stores/ime';
import { useLayoutStore } from '@/stores/layout';

describe('imeStore & layoutStore', () => {
  afterEach(() => {
    useImeStore.setState(useImeStore.getInitialState());
    useLayoutStore.setState(useLayoutStore.getInitialState());
  });

  it('updates IME store visibility and field status', () => {
    useImeStore.getState().showField({
      counterField: 3,
      label: 'Search',
      value: 'hello',
      start: 0,
      end: 5,
    });
    expect(useImeStore.getState().visible).toBe(true);
    expect(useImeStore.getState().label).toBe('Search');
    expect(useImeStore.getState().value).toBe('hello');
    expect(useImeStore.getState().fieldCounter).toBe(3);

    useImeStore.getState().dismiss();
    expect(useImeStore.getState().visible).toBe(false);
  });

  it('setValue updates value and cursor', () => {
    useImeStore.getState().showField({
      counterField: 1,
      label: 'Test',
      value: '',
      start: 0,
      end: 0,
    });
    useImeStore.getState().setValue('abc', 2, 3);
    expect(useImeStore.getState().value).toBe('abc');
    expect(useImeStore.getState().start).toBe(2);
    expect(useImeStore.getState().end).toBe(3);
  });

  it('updates layout store shortcuts and sheet state', () => {
    useLayoutStore.getState().setShortcuts(['app:youtube']);
    expect(useLayoutStore.getState().shortcuts).toEqual(['app:youtube']);

    useLayoutStore.getState().setMoreSheet(true);
    expect(useLayoutStore.getState().moreSheetOpen).toBe(true);
  });
});
