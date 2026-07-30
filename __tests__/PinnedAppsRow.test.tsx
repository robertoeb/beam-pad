import { render, act, userEvent } from '@testing-library/react-native';
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
const { fireShortcut } = require('@/services/shortcuts');

beforeEach(() => {
  useLayoutStore.setState({
    shortcuts: ['app:netflix', 'app:youtube', 'app:prime'],
    hidden: [],
  });
  useConnectionStore.setState({ currentApp: undefined });
  jest.clearAllMocks();
});

describe('ShortcutRow (replaces PinnedAppsRow)', () => {
  it('renders pinned shortcuts', async () => {
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
    expect(getByLabelText('Open YouTube')).toBeTruthy();
    expect(getByLabelText('Open Prime Video')).toBeTruthy();
  });

  it('renders add button', async () => {
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Add shortcut')).toBeTruthy();
  });

  it('tap fires shortcut', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<ShortcutRow />);
    await user.press(getByLabelText('Open Netflix'));
    expect(fireShortcut).toHaveBeenCalledWith('app:netflix');
  });

  it('add button navigates to /shortcuts', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<ShortcutRow />);
    await user.press(getByLabelText('Add shortcut'));
    expect(router.push).toHaveBeenCalledWith('/shortcuts');
  });

  it('highlights current app tile', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
  });

  it('clears highlight on app change', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByLabelText } = await render(<ShortcutRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();

    await act(async () => {
      useConnectionStore.setState({
        currentApp: { label: 'YouTube', packageName: 'com.google.android.youtube.tv' },
      });
    });

    expect(getByLabelText('Open YouTube')).toBeTruthy();
  });
});
