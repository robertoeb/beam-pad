import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ArrowLeft, House } from 'lucide-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { router } from 'expo-router';

import { DevicePill } from '@/components/DevicePill';
import { DeviceSwitchSheet } from '@/components/DeviceSwitchSheet';
import { RemoteButton } from '@/components/RemoteButton';
import { DPad } from '@/components/DPad';
import { PowerButton } from '@/components/PowerButton';
import { VolumeRail } from '@/components/VolumeRail';
import { PinnedAppsRow } from '@/components/PinnedAppsRow';
import { NowPlayingStrip } from '@/components/NowPlayingStrip';
import { MoreSheet } from '@/components/MoreSheet';
import { ImeSheet } from '@/components/ImeSheet';
import { ToastHost } from '@/components/Toast';
import { useLayoutStore } from '@/stores/layout';
import { useRemoteMetrics } from '@/lib/useRemoteMetrics';
import { space } from '@/theme/tokens';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';

export default function Index() {
  const [switchOpen, setSwitchOpen] = useState(false);
  const moreSheetOpen = useLayoutStore((s) => s.moreSheetOpen);
  const setMoreSheet = useLayoutStore((s) => s.setMoreSheet);
  const metrics = useRemoteMetrics();

  const handleSheetOpen = useCallback(() => setSwitchOpen(true), []);
  const handleSheetClose = useCallback(() => setSwitchOpen(false), []);

  const panGesture = Gesture.Pan()
    .minDistance(50)
    .onEnd((event) => {
      if (event.translationY < -80) {
        setMoreSheet(true);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaView className="flex-1 bg-background">
        <View style={{ flex: 1, paddingHorizontal: metrics.gutter, paddingTop: space[4] }}>
          <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <DevicePill onPress={handleSheetOpen} />
            <RemoteButton
              icon={Settings}
              size={44}
              accessibilityLabel="Settings"
              onPress={() => router.push('/settings' as any)}
            />
          </View>

          {metrics.showNowPlaying && <NowPlayingStrip />}

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DPad diameter={metrics.dpad} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: metrics.zoneGap,
                marginTop: metrics.zoneGap,
              }}
            >
              <PowerButton />
              <RemoteButton
                icon={ArrowLeft}
                accessibilityLabel="Back"
                onPress={() => key(KEYS.back)}
              />
              <RemoteButton icon={House} accessibilityLabel="Home" onPress={() => key(KEYS.home)} />
            </View>
          </View>

          <PinnedAppsRow />
        </View>

        <VolumeRail />
        <ToastHost />
        <DeviceSwitchSheet visible={switchOpen} onClose={handleSheetClose} />
        <MoreSheet />
        <ImeSheet />
      </SafeAreaView>
    </GestureDetector>
  );
}
