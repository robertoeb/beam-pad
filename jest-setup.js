jest.mock('react-native-mmkv', () => ({
  __esModule: true,
  createMMKV: () => ({
    getString: () => null,
    set: jest.fn(),
    remove: jest.fn(),
  }),
}));

jest.mock('expo-haptics', () => ({
  __esModule: true,
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
  },
  NotificationFeedbackType: {
    Success: 'Success',
    Warning: 'Warning',
    Error: 'Error',
  },
}));

jest.mock('@/modules/expo-ir-blaster', () => ({
  __esModule: true,
  IrBlaster: {
    hasIrEmitter: jest.fn(() => Promise.resolve(false)),
    getCarrierFrequencyRanges: jest.fn(() => Promise.resolve([])),
    transmit: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock('@/modules/expo-atv-discovery', () => ({
  __esModule: true,
  AtvDiscovery: {
    onEvent: jest.fn(() => ({ remove: jest.fn() })),
    startDiscovery: jest.fn(() => Promise.resolve()),
    stopDiscovery: jest.fn(),
  },
}));

jest.mock('@/modules/expo-atv-socket', () => ({
  __esModule: true,
  AtvSocket: {
    onEvent: jest.fn(() => ({ remove: jest.fn() })),
    connect: jest.fn(() => Promise.resolve()),
    disconnect: jest.fn(),
    send: jest.fn(),
  },
}));

jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView } = require('react-native');
  const createAnimatedComponent = (comp) => comp;
  const Animated = {
    View,
    Text,
    Image,
    ScrollView,
    createAnimatedComponent,
    call: jest.fn(),
  };
  return {
    __esModule: true,
    default: Animated,
    View,
    Text,
    Image,
    ScrollView,
    createAnimatedComponent,
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withSpring: (val) => val,
    withTiming: (val) => val,
    runOnJS: (fn) => fn,
    useAnimatedProps: (fn) => fn(),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    __esModule: true,
    GestureDetector: ({ children }) => children,
    Gesture: {
      Pan: () => ({
        minDistance: () => ({ onEnd: () => ({}) }),
      }),
    },
    GestureHandlerRootView: View,
  };
});

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    SafeAreaView: ({ children, ...props }) =>
      React.createElement(View, { testID: 'safe-area', ...props }, children),
    SafeAreaProvider: ({ children }) => children,
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockSvg = (props) => React.createElement(View, props);
  const MockCircle = (props) => React.createElement(View, props);
  MockSvg.Circle = MockCircle;
  return { __esModule: true, default: MockSvg, Circle: MockCircle };
});

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const createIcon = (name) => (props) => React.createElement(View, { testID: name, ...props });
  return new Proxy(
    { __esModule: true },
    {
      get: (target, prop) => {
        if (prop === '__esModule') return true;
        if (prop === 'default') return undefined;
        if (typeof prop === 'string') return createIcon(prop);
        return undefined;
      },
    },
  );
});
