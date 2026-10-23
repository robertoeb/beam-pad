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
  // Launcher + splash artwork (sources: assets/*.svg, PNGs via scripts/gen-icon.sh).
  icon: './assets/icon.png',
  splash: {
    image: './assets/icon.png',
    imageWidth: 200,
    resizeMode: 'contain',
    backgroundColor: '#0A0A12',
    dark: {
      image: './assets/icon.png',
      imageWidth: 200,
      resizeMode: 'contain',
      backgroundColor: '#0A0A12',
    },
  },
  android: {
    package: 'com.beampad.app',
    versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      monochromeImage: './assets/adaptive-icon-monochrome.png',
      backgroundColor: '#0A0A12',
    },
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
    // play-services-cast ships Kotlin 2.4 metadata; the template compiler
    // (2.2) rejects it — align the toolchain.
    ['expo-build-properties', { android: { kotlinVersion: '2.4.0' } }],
  ],
};

export default config;
