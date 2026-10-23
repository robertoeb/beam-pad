import { render, userEvent } from '@testing-library/react-native';
import ShortcutsScreen from '@/app/shortcuts';
import { useLayoutStore } from '@/stores/layout';
import { useConnectionStore } from '@/stores/connection';

jest.mock('@/services/shortcuts', () => ({
  fireShortcut: jest.fn(() => true),
  executeMacro: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('react-native-draggable-flatlist', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    __esModule: true,
    default: (props: any) =>
      React.createElement(FlatList, {
        ...props,
        testID: 'draggable-flatlist',
      }),
  };
});

const { router } = require('expo-router');

beforeEach(() => {
  useLayoutStore.setState({
    shortcuts: ['app:netflix', 'app:youtube'],
    hidden: [],
  });
  useConnectionStore.setState({ currentApp: undefined });
  jest.clearAllMocks();
});

describe('ShortcutsScreen', () => {
  it('renders shortcuts list', async () => {
    const { getByLabelText } = await render(<ShortcutsScreen />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
    expect(getByLabelText('Open YouTube')).toBeTruthy();
  });

  it('shows empty state with defaults CTA when no shortcuts', async () => {
    useLayoutStore.setState({ shortcuts: [], hidden: [] });
    const { getByLabelText } = await render(<ShortcutsScreen />);
    expect(getByLabelText('Add default shortcuts')).toBeTruthy();
  });

  it('defaults CTA adds 4 default shortcuts', async () => {
    useLayoutStore.setState({ shortcuts: [], hidden: [] });
    const { getByLabelText } = await render(<ShortcutsScreen />);
    await userEvent.setup().press(getByLabelText('Add default shortcuts'));
    expect(useLayoutStore.getState().shortcuts).toEqual([
      'app:netflix',
      'app:youtube',
      'app:prime',
      'app:disney',
    ]);
  });

  it('edit toggle works', async () => {
    const { getByLabelText } = await render(<ShortcutsScreen />);
    await userEvent.setup().press(getByLabelText('Edit shortcuts'));
    expect(getByLabelText('Done editing')).toBeTruthy();
  });

  it('back button navigates back', async () => {
    const { getByLabelText } = await render(<ShortcutsScreen />);
    await userEvent.setup().press(getByLabelText('Go back'));
    expect(router.back).toHaveBeenCalled();
  });
});
