import { render } from '@testing-library/react-native';
import { ShortcutRow } from '@/components/ShortcutRow';
import { useLayoutStore } from '@/stores/layout';
import { useConnectionStore } from '@/stores/connection';

jest.mock('@/services/shortcuts', () => ({
  fireShortcut: jest.fn(() => true),
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
    shortcuts: ['app:netflix', 'app:youtube', 'app:prime'],
    hidden: [],
  });
  useConnectionStore.setState({ currentApp: undefined });
  jest.clearAllMocks();
});

describe('ShortcutRow', () => {
  it('renders shortcut tiles', async () => {
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
    expect(getByLabelText('Open YouTube')).toBeTruthy();
    expect(getByLabelText('Open Prime Video')).toBeTruthy();
  });

  it('renders add button when no overflow', async () => {
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Add shortcut')).toBeTruthy();
  });

  it('add button navigates to /shortcuts', async () => {
    const { getByLabelText } = await render(<ShortcutRow />);
    const { press } = require('@testing-library/react-native').fireEvent;
    press(getByLabelText('Add shortcut'));
    expect(router.push).toHaveBeenCalledWith('/shortcuts');
  });

  it('renders every pinned shortcut in the scrollable row', async () => {
    useLayoutStore.setState({
      shortcuts: [
        'app:netflix',
        'app:youtube',
        'app:prime',
        'app:disney',
        'app:max',
        'app:hulu',
        'app:peacock',
      ],
    });
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
    expect(getByLabelText('Open Max')).toBeTruthy();
    expect(getByLabelText('Open Peacock')).toBeTruthy();
  });
});
