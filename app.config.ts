const config = {
  name: 'BeamPad',
  slug: 'beampad',
  scheme: 'beampad',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['android'],
  newArchEnabled: true,
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
  plugins: [
    'expo-router',
    'expo-font',
    'expo-splash-screen',
    ['react-native-google-cast', { receiverAppId: 'CC1AD845' }],
  ],
};

export default config;
