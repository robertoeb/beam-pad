import 'fast-text-encoding';
import { tokens } from '@/theme/tokens';
import '../../global.css';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { initCastListeners } from '@/services/cast';

// protobufjs instantiates a TextDecoder at import time, but Hermes has no
// such global. fast-text-encoding defines it (side effect) and must load
// before any route module (which pulls in src/proto/bundle.js) evaluates.
// (Import order above matters — do not move this below other imports.)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      initCastListeners();
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: tokens.colors.background }}>
      <View style={{ flex: 1, backgroundColor: tokens.colors.background }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens.colors.background } }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
