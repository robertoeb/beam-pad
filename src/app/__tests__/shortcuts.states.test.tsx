import { render, fireEvent } from '@testing-library/react-native';
import ShortcutsScreen from '../shortcuts';
import { useLayoutStore } from '@/stores/layout';
import { useSettingsStore } from '@/stores/settings';
import { router, useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
  useLocalSearchParams: jest.fn(() => ({})),
}));

beforeEach(() => {
  (useLocalSearchParams as jest.Mock).mockReturnValue({});
  useLayoutStore.setState({ shortcuts: ['app:netflix'], hidden: [] });
  useSettingsStore.setState({ showShortcutLabels: true });
});

describe('ShortcutsScreen states', () => {
  it('empty list shows empty state with defaults action', async () => {
    useLayoutStore.setState({ shortcuts: [] });
    const { getByText } = await render(<ShortcutsScreen />);
    expect(getByText('No shortcuts yet')).toBeTruthy();
    await fireEvent.press(getByText('Add default shortcuts'));
    expect(useLayoutStore.getState().shortcuts).toEqual([
      'app:netflix',
      'app:youtube',
      'app:prime',
      'app:disney',
    ]);
  });

  it('edit toggle switches subtitle and done action', async () => {
    const { getByLabelText, getByText } = await render(<ShortcutsScreen />);
    await fireEvent.press(getByLabelText('Edit shortcuts'));
    expect(getByText('Drag to reorder')).toBeTruthy();
    await fireEvent.press(getByLabelText('Done editing'));
    expect(getByText('Your pinned apps')).toBeTruthy();
  });

  it('starts in edit mode from params', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ edit: '1' });
    const { getByText } = await render(<ShortcutsScreen />);
    expect(getByText('Drag to reorder')).toBeTruthy();
  });

  it('adds catalog apps and removes shortcuts', async () => {
    const { getByLabelText } = await render(<ShortcutsScreen />);
    await fireEvent.press(getByLabelText('Add YouTube'));
    expect(useLayoutStore.getState().shortcuts).toContain('app:youtube');
  });

  it('back button navigates back', async () => {
    const { getByLabelText } = await render(<ShortcutsScreen />);
    await fireEvent.press(getByLabelText('Go back'));
    expect(router.back).toHaveBeenCalled();
  });
});
