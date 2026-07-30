// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  expo: {
    name: 'BeamPad',
    slug: 'beampad',
    scheme: 'beampad',
    version: '1.0.0',
    orientation: 'portrait',
    ios: {
      bundleIdentifier: 'com.beampad.app',
    },
    android: {
      package: 'com.beampad.app',
      permissions: [
        'INTERNET',
        'ACCESS_NETWORK_STATE',
        'ACCESS_WIFI_STATE',
        'CHANGE_WIFI_MULTICAST_STATE',
        'RECORD_AUDIO',
        'VIBRATE',
        'TRANSMIT_IR',
      ],
      blockedPermissions: [],
    },
    plugins: ['expo-router', 'expo-font', 'expo-splash-screen'],
  },
};

export default config;
