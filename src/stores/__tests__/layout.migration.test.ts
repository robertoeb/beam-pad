import { useLayoutStore } from '../layout';

describe('layout store migration', () => {
  afterEach(() => {
    useLayoutStore.setState(useLayoutStore.getInitialState());
  });

  it('migrates old pinned ids to shortcuts format', () => {
    const state = useLayoutStore.getState();
    expect(state.shortcuts).toEqual(['app:netflix', 'app:youtube', 'app:prime', 'app:disney']);
  });

  it('preserves already-migrated shortcut ids', () => {
    useLayoutStore.setState({
      shortcuts: ['app:netflix', 'key:guide', 'user:abc'],
      hidden: [],
    });
    expect(useLayoutStore.getState().shortcuts).toEqual(['app:netflix', 'key:guide', 'user:abc']);
  });

  it('addShortcut appends without duplicates', () => {
    useLayoutStore.setState({ shortcuts: ['app:netflix'], hidden: [] });
    useLayoutStore.getState().addShortcut('app:youtube');
    expect(useLayoutStore.getState().shortcuts).toEqual(['app:netflix', 'app:youtube']);

    useLayoutStore.getState().addShortcut('app:netflix');
    expect(useLayoutStore.getState().shortcuts).toEqual(['app:netflix', 'app:youtube']);
  });

  it('removeShortcut removes by id', () => {
    useLayoutStore.setState({
      shortcuts: ['app:netflix', 'app:youtube'],
      hidden: [],
    });
    useLayoutStore.getState().removeShortcut('app:netflix');
    expect(useLayoutStore.getState().shortcuts).toEqual(['app:youtube']);
  });

  it('moveShortcut reorders', () => {
    useLayoutStore.setState({
      shortcuts: ['app:netflix', 'app:youtube', 'app:prime'],
      hidden: [],
    });
    useLayoutStore.getState().moveShortcut(0, 2);
    expect(useLayoutStore.getState().shortcuts).toEqual([
      'app:youtube',
      'app:prime',
      'app:netflix',
    ]);
  });
});
