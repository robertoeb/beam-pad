// Release automation: version comes from the git tag (APP_VERSION, e.g. "1.2.0"
// from tag v1.2.0) and the Play versionCode from VERSION_CODE. Both fall back
// to dev defaults so `npx expo prebuild` / tests work without env set.
// versionCode scheme: MAJOR * 10000 + MINOR * 100 + PATCH (bump per release;
// same-version rebuilds must bump the code manually).
const appVersion = process.env.APP_VERSION ?? '1.0.0';
const versionCode = Number(process.env.VERSION_CODE ?? 1);

const config = {
  name: 'BeamPad',
  slug: 'beampad',
  scheme: 'beampad',
  version: appVersion,
  orientation: 'portrait',
  platforms: ['android'],
  newArchEnabled: true,
  android: {
    package: 'com.beampad.app',
    versionCode,
    // Preflight pings TVs over cleartext LAN HTTP (http://<tv>:6466/).
    // Without this, Android 9+ blocks the check on release builds.
    usesCleartextTraffic: true,
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
