import { useImeStore } from '../ime';
import { useLayoutStore } from '../layout';
import { useSettingsStore } from '../settings';

describe('store action/branch residuals', () => {
  it('ime showField defaults every missing field', () => {
    useImeStore.getState().showField({} as never);
    const s = useImeStore.getState();
    expect(s).toMatchObject({
      visible: true,
      fieldCounter: 0,
      label: '',
      value: '',
      start: 0,
      end: 0,
    });
  });

  it('ime setValue defaults start/end to value length', () => {
    useImeStore.getState().setValue('hey');
    expect(useImeStore.getState()).toMatchObject({ value: 'hey', start: 3, end: 3 });
    useImeStore.getState().setValue('hey', 1);
    expect(useImeStore.getState()).toMatchObject({ start: 1, end: 3 });
    useImeStore.getState().dismiss();
    expect(useImeStore.getState().visible).toBe(false);
  });

  it('layout setShortcuts/addShortcut dedupe/remove/move/setMoreSheet', () => {
    const store = useLayoutStore.getState();
    store.setShortcuts(['app:netflix', 'app:youtube']);
    expect(useLayoutStore.getState().shortcuts).toHaveLength(2);
    store.addShortcut('app:netflix');
    expect(useLayoutStore.getState().shortcuts).toHaveLength(2);
    store.addShortcut('app:prime');
    expect(useLayoutStore.getState().shortcuts).toContain('app:prime');
    store.moveShortcut(0, 2);
    expect(useLayoutStore.getState().shortcuts[2]).toBe('app:netflix');
    store.moveShortcut(9, 0);
    expect(useLayoutStore.getState().shortcuts).toHaveLength(3);
    store.removeShortcut('app:prime');
    expect(useLayoutStore.getState().shortcuts).not.toContain('app:prime');
    store.setMoreSheet(true);
    expect(useLayoutStore.getState().moreSheetOpen).toBe(true);
  });

  it('settings setVolumeTarget/setDensity/set actions work', () => {
    useSettingsStore.getState().setVolumeTarget('ir');
    expect(useSettingsStore.getState().volumeTarget).toBe('ir');
    useSettingsStore.getState().setDensity('spacious');
    expect(useSettingsStore.getState().density).toBe('spacious');
    useSettingsStore.getState().set({ volumeStep: 2 });
    expect(useSettingsStore.getState().volumeStep).toBe(2);
  });

  it('layout migrate defaults expose callable no-op actions', () => {
    const migrate = (useLayoutStore as any).persist.getOptions().migrate;
    const out = migrate({}, 1);
    out.setShortcuts([]);
    out.addShortcut('app:netflix');
    out.removeShortcut('app:netflix');
    out.moveShortcut(0, 0);
    out.setMoreSheet(false);
  });
});
