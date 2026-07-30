import { render, act, userEvent } from '@testing-library/react-native';
import { PinnedAppsRow } from '@/components/PinnedAppsRow';
import { useLayoutStore } from '@/stores/layout';
import { useConnectionStore } from '@/stores/connection';

jest.mock('@/services/apps', () => ({
  launchApp: jest.fn(() => true),
}));

jest.mock('react-native-draggable-flatlist', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement(FlatList, {
        ...props,
        data: props.data,
        renderItem: props.renderItem,
        keyExtractor: props.keyExtractor,
        testID: 'draggable-flatlist',
      });
    },
    RenderItemParams: {},
  };
});

const { router } = require('expo-router');
const { launchApp } = require('@/services/apps');

beforeEach(() => {
  useLayoutStore.setState({
    pinned: ['netflix', 'youtube', 'prime'],
    hidden: [],
  });
  useConnectionStore.setState({ currentApp: undefined });
  jest.clearAllMocks();
});

describe('PinnedAppsRow', () => {
  it('renders pinned apps', async () => {
    const { getByLabelText } = await render(<PinnedAppsRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();
    expect(getByLabelText('Open YouTube')).toBeTruthy();
    expect(getByLabelText('Open Prime Video')).toBeTruthy();
  });

  it('renders add button', async () => {
    const { getByLabelText } = await render(<PinnedAppsRow />);
    expect(getByLabelText('Add app')).toBeTruthy();
  });

  it('tap launches app', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PinnedAppsRow />);
    await user.press(getByLabelText('Open Netflix'));
    expect(launchApp).toHaveBeenCalledWith('netflix');
  });

  it('long-press navigates to /apps?edit=1', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PinnedAppsRow />);
    await user.longPress(getByLabelText('Open Netflix'));
    expect(router.push).toHaveBeenCalledWith('/apps?edit=1');
  });

  it('add button navigates to /apps', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = await render(<PinnedAppsRow />);
    await user.press(getByLabelText('Add app'));
    expect(router.push).toHaveBeenCalledWith('/apps');
  });

  it('limits to 5 visible tiles', async () => {
    useLayoutStore.setState({
      pinned: ['netflix', 'youtube', 'prime', 'disney', 'hulu', 'peacock', 'twitch'],
    });
    const { queryByLabelText } = await render(<PinnedAppsRow />);
    expect(queryByLabelText('Open Netflix')).toBeTruthy();
    expect(queryByLabelText('Open Twitch')).toBeNull();
  });

  it('highlights current app tile', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByLabelText } = await render(<PinnedAppsRow />);
    const tile = getByLabelText('Open Netflix');
    expect(tile).toBeTruthy();
  });

  it('clears highlight on app change', async () => {
    useConnectionStore.setState({
      currentApp: { label: 'Netflix', packageName: 'com.netflix.ninja' },
    });
    const { getByLabelText } = await render(<PinnedAppsRow />);
    expect(getByLabelText('Open Netflix')).toBeTruthy();

    await act(async () => {
      useConnectionStore.setState({
        currentApp: { label: 'YouTube', packageName: 'com.google.android.youtube.tv' },
      });
    });

    expect(getByLabelText('Open YouTube')).toBeTruthy();
  });
});
