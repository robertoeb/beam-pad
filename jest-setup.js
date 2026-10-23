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
    close: jest.fn(),
    generateClientCertificate: jest.fn(() =>
      Promise.resolve({
        pem: 'FAKE_CERT',
        privateKeyPem: 'FAKE_KEY',
        modulusB64: 'BQRFBA==',
        exponentB64: 'AgM=',
      }),
    ),
    getServerPublicKeyComponents: jest.fn(() =>
      Promise.resolve({ modulusB64: 'AQIDBA==', exponentB64: 'AQAB' }),
    ),
    getPeerPublicKeyComponents: jest.fn(() =>
      Promise.resolve({ modulusB64: 'AQIDBA==', exponentB64: 'AQAB' }),
    ),
    onSocketData: jest.fn(() => ({ remove: jest.fn() })),
    onSocketState: jest.fn(() => ({ remove: jest.fn() })),
    onMicData: jest.fn(() => ({ remove: jest.fn() })),
    startMicStream: jest.fn(() => Promise.resolve()),
    stopMicStream: jest.fn(),
  },
}));

jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView, FlatList } = require('react-native');
  const createAnimatedComponent = (comp) => comp;
  const Animated = {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
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
    FlatList,
    createAnimatedComponent,
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withSpring: (val) => val,
    withTiming: (val) => val,
    withRepeat: (val) => val,
    withSequence: (val) => val,
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    useAnimatedProps: (fn) => fn(),
    useAnimatedReaction: () => {},
    useAnimatedScrollHandler: () => () => {},
    useDerivedValue: (fn) => ({ value: typeof fn === 'function' ? fn() : fn }),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  const State = {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  };
  const gestureProxy = new Proxy(
    {},
    {
      get: (_t, prop) => {
        if (prop === '__esModule') return undefined;
        return (..._args) => gestureProxy;
      },
    },
  );
  return {
    __esModule: true,
    GestureDetector: ({ children }) => children,
    Gesture: new Proxy(
      {},
      {
        get: (_t, prop) => {
          if (prop === '__esModule') return undefined;
          return (..._args) => gestureProxy;
        },
      },
    ),
    GestureHandlerRootView: View,
    FlatList: View,
    ScrollView: View,
    State,
    GestureState: State,
    Directions: { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 },
  };
});

jest.mock('expo-router', () => ({
  __esModule: true,
  router: { push: jest.fn(), back: jest.fn() },
  Stack: () => null,
  Link: require('react-native').Text,
  useLocalSearchParams: () => ({}),
}));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { version: '1.0.0' } },
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    SafeAreaView: ({ children, ...props }) =>
      React.createElement(View, { testID: 'safe-area', ...props }, children),
    SafeAreaProvider: ({ children }) => children,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    useSafeAreaInsets: () => ({ top: 47, bottom: 34, left: 0, right: 0 }),
  };
});

jest.mock('react-native/Libraries/AppState/AppState', () => {
  const listeners = [];
  return {
    __esModule: true,
    default: {
      addEventListener: jest.fn((_, cb) => {
        listeners.push(cb);
        return {
          remove: () => listeners.splice(listeners.indexOf(cb), 1),
        };
      }),
      currentState: 'active',
      _listeners: listeners,
    },
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockSvg = (props) => React.createElement(View, props);
  const MockCircle = (props) => React.createElement(View, props);
  const MockPath = (props) => React.createElement(View, props);
  const MockRect = (props) => React.createElement(View, props);
  const MockDefs = (props) => React.createElement(View, props);
  const MockStop = (props) => React.createElement(View, props);
  const MockLinearGradient = (props) => React.createElement(View, props);
  const MockRadialGradient = (props) => React.createElement(View, props);
  MockSvg.Circle = MockCircle;
  MockSvg.Path = MockPath;
  MockSvg.Rect = MockRect;
  MockSvg.Defs = MockDefs;
  MockSvg.Stop = MockStop;
  MockSvg.LinearGradient = MockLinearGradient;
  MockSvg.RadialGradient = MockRadialGradient;
  return {
    __esModule: true,
    default: MockSvg,
    Circle: MockCircle,
    Path: MockPath,
    Rect: MockRect,
    Defs: MockDefs,
    Stop: MockStop,
    LinearGradient: MockLinearGradient,
    RadialGradient: MockRadialGradient,
  };
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

const castStateListeners = [];
const sessionStartedListeners = [];
const sessionEndedListeners = [];
const mediaStatusListeners = [];

const mockRemoteMediaClient = {
  loadMedia: jest.fn(() => Promise.resolve()),
  play: jest.fn(() => Promise.resolve()),
  pause: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  getMediaStatus: jest.fn(() => Promise.resolve(null)),
  onMediaStatusUpdated: jest.fn((handler) => {
    mediaStatusListeners.push(handler);
    return { remove: () => mediaStatusListeners.splice(mediaStatusListeners.indexOf(handler), 1) };
  }),
};

const mockSession = {
  client: mockRemoteMediaClient,
  id: 'test-session',
  getCastDevice: jest.fn(() => Promise.resolve({ friendlyName: 'Test TV', deviceId: 'dev-1' })),
  getVolume: jest.fn(() => Promise.resolve(0.5)),
  setVolume: jest.fn(),
  isMute: jest.fn(() => Promise.resolve(false)),
  setMute: jest.fn(),
};

const mockSessionManager = {
  getCurrentCastSession: jest.fn(() => Promise.resolve(null)),
  endCurrentSession: jest.fn(() => Promise.resolve()),
  onSessionStarted: jest.fn((handler) => {
    sessionStartedListeners.push(handler);
    return {
      remove: () => sessionStartedListeners.splice(sessionStartedListeners.indexOf(handler), 1),
    };
  }),
  onSessionEnded: jest.fn((handler) => {
    sessionEndedListeners.push(handler);
    return {
      remove: () => sessionEndedListeners.splice(sessionEndedListeners.indexOf(handler), 1),
    };
  }),
};

const mockCastContext = {
  onCastStateChanged: jest.fn((handler) => {
    castStateListeners.push(handler);
    return { remove: () => castStateListeners.splice(castStateListeners.indexOf(handler), 1) };
  }),
  getSessionManager: jest.fn(() => mockSessionManager),
  showCastDialog: jest.fn(() => Promise.resolve(true)),
  getCastState: jest.fn(() => Promise.resolve(null)),
};

// ─── Global test policy (TASK_17) ────────────────────────────────────────────
// - Real timers after every test (fake timers are opt-in per test via
//   jest.useFakeTimers(); leaked fakes fail loudly otherwise).
// - Every Zustand store resets BEFORE each test (no tree is mounted yet, so
//   no act() warnings and no corruption of the act queue for the next render.
//   Isolation is identical — every test still starts from initial state;
//   suites needing specific state set it explicitly in beforeEach/it).
// - No .skip/.only allowed in committed suites (enforced by eslint
//   no-focused-tests / no-disabled-tests where configured).
try {
  const { resetAllStores } = require('@/test/storeRegistry');
  beforeEach(() => {
    resetAllStores();
  });
} catch {
  // storeRegistry may be unavailable in exotic runners; timers policy below
  // still applies.
}

afterEach(() => {
  jest.useRealTimers();
  // Drain cast listener arrays: suites push handlers into the module-level
  // mocks on every render, and without this they accumulate across suites.
  castStateListeners.length = 0;
  sessionStartedListeners.length = 0;
  sessionEndedListeners.length = 0;
  mediaStatusListeners.length = 0;
});
jest.mock('react-native-google-cast', () => {
  const CastState = {
    NO_DEVICES_AVAILABLE: 'noDevicesAvailable',
    NOT_CONNECTED: 'notConnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
  };
  const MediaPlayerState = {
    BUFFERING: 'buffering',
    IDLE: 'idle',
    LOADING: 'loading',
    PAUSED: 'paused',
    PLAYING: 'playing',
  };
  return {
    __esModule: true,
    default: mockCastContext,
    CastContext: mockCastContext,
    CastState,
    MediaPlayerState,
    _mockSession: mockSession,
    _mockRemoteMediaClient: mockRemoteMediaClient,
    _mockSessionManager: mockSessionManager,
    _castStateListeners: castStateListeners,
    _sessionStartedListeners: sessionStartedListeners,
    _sessionEndedListeners: sessionEndedListeners,
    _mediaStatusListeners: mediaStatusListeners,
  };
});
