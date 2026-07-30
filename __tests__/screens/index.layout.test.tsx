import { render } from '@testing-library/react-native';
import Index from '@/app/index';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getActiveClient } from '@/services/sessionManager';

jest.mock('@/services/sessionManager', () => ({
  getActiveClient: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    SafeAreaView: ({ children, ...props }: any) =>
      React.createElement(View, { testID: 'safe-area', ...props }, children),
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
    useSafeAreaInsets: jest.fn(() => ({ top: 47, bottom: 34, left: 0, right: 0 })),
  };
});

beforeEach(() => {
  (getActiveClient as jest.Mock).mockReturnValue(null);
  jest.mocked(useSafeAreaFrame).mockReturnValue({ x: 0, y: 0, width: 390, height: 844 });
  jest.mocked(useSafeAreaInsets).mockReturnValue({ top: 47, bottom: 34, left: 0, right: 0 });
});

describe('IndexScreen layout', () => {
  it('renders different D-pad diameters for small vs tall frames', async () => {
    jest.mocked(useSafeAreaFrame).mockReturnValue({ x: 0, y: 0, width: 360, height: 640 });
    const { getByTestId: getSmall } = await render(<Index />);
    const smallDpadContainer = getSmall('dpad-up').parent?.parent;
    const smallWidth = smallDpadContainer?.props?.style?.width;

    jest.mocked(useSafeAreaFrame).mockReturnValue({ x: 0, y: 0, width: 412, height: 915 });
    const { getByTestId: getTall } = await render(<Index />);
    const tallDpadContainer = getTall('dpad-up').parent?.parent;
    const tallWidth = tallDpadContainer?.props?.style?.width;

    expect(smallWidth).not.toBe(tallWidth);
  });

  it('renders D-pad, action row, and pinned apps row', async () => {
    const { getByTestId, getByLabelText } = await render(<Index />);
    expect(getByTestId('dpad-ok')).toBeTruthy();
    expect(getByLabelText('Back')).toBeTruthy();
    expect(getByLabelText('Home')).toBeTruthy();
    expect(getByLabelText('Add app')).toBeTruthy();
  });
});
