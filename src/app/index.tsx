import { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ArrowLeft, House, Keyboard } from 'lucide-react-native';
import { router } from 'expo-router';

import { DevicePill } from '@/components/DevicePill';
import { DeviceSwitchSheet } from '@/components/DeviceSwitchSheet';
import { RemoteButton } from '@/components/RemoteButton';
import { DPad } from '@/components/DPad';
import { TouchPad } from '@/components/TouchPad';
import { PowerButton } from '@/components/PowerButton';
import { VolumeControl } from '@/components/VolumeControl';
import { MicButton } from '@/components/MicButton';
import { MuteButton } from '@/components/MuteButton';
import { CastTile } from '@/components/CastTile';
import { CastSheet } from '@/components/CastSheet';
import { ShortcutRow } from '@/components/ShortcutRow';
import { NowPlayingStrip } from '@/components/NowPlayingStrip';
import { ImeSheet } from '@/components/ImeSheet';
import { VoiceOverlay } from '@/components/VoiceOverlay';
import { ToastHost } from '@/components/Toast';
import { useImeStore } from '@/stores/ime';
import { useSettingsStore } from '@/stores/settings';
import { useRemoteMetrics } from '@/lib/useRemoteMetrics';
import { AuroraBackground } from '@/components/AuroraBackground';
import {space, tokens, radius} from '@/theme/tokens';
import { KEYS } from '@/protocol/keycodes';
import { key } from '@/lib/key';
import { voiceStart, voiceStop, voiceSearchUi } from '@/services/voice';

export default function Index() {
  const [switchOpen, setSwitchOpen] = useState(false);
  const metrics = useRemoteMetrics();
  const navigationMode = useSettingsStore((s) => s.navigationMode);
  const [voiceHolding, setVoiceHolding] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHolding = useRef(false);

  const handleSheetOpen = useCallback(() => setSwitchOpen(true), []);
  const handleSheetClose = useCallback(() => setSwitchOpen(false), []);

  const openIme = useCallback(() => {
    useImeStore.getState().showField({
      counterField: 0,
      label: 'Text Input',
      value: '',
      start: 0,
      end: 0,
    });
  }, []);

  const onMicPressIn = () => {
    isHolding.current = false;
    holdTimer.current = setTimeout(() => {
      isHolding.current = true;
      setVoiceHolding(true);
      voiceStart();
    }, 300);
  };

  const onMicPressOut = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (isHolding.current) {
      voiceStop();
      setVoiceHolding(false);
    }
  };

  const onMicPress = () => {
    if (!isHolding.current) voiceSearchUi();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: tokens.colors.background }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <AuroraBackground />

      <View style={{ flex: 1, paddingHorizontal: metrics.gutter, paddingTop: space[2] }}>
        {/* Header: power left, device centered, app settings right */}
        <View style={{ height: 56, alignItems: 'center' }}>
          <View style={{ position: 'absolute', left: 0, top: 0 }}>
            <PowerButton />
          </View>
          <View style={{ position: 'absolute', right: 0, top: 6 }}>
            <Pressable
              onPress={() => router.push('/settings' as any)}
              accessibilityRole="button"
              accessibilityLabel="Settings"
              style={{
                width: 44,
                height: 44,
                borderRadius: radius.xl,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              <Settings size={20} strokeWidth={1.6} color={tokens.colors.text.secondary} />
            </Pressable>
          </View>
          <DevicePill onPress={handleSheetOpen} />
        </View>

        {metrics.showNowPlaying && <NowPlayingStrip />}

        {/* Thumb zone */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {navigationMode === 'touchpad' ? (
            <TouchPad size={metrics.dpad} />
          ) : (
            <DPad diameter={metrics.dpad} />
          )}

          {/* First row: back, home, TV settings */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: metrics.zoneGap,
              marginTop: metrics.zoneGap,
            }}
          >
            <RemoteButton
              icon={ArrowLeft}
              accessibilityLabel="Back"
              onPress={() => key(KEYS.back)}
            />
            <RemoteButton icon={House} accessibilityLabel="Home" onPress={() => key(KEYS.home)} />
            <RemoteButton
              icon={Settings}
              accessibilityLabel="TV Settings"
              onPress={() => key(KEYS.settings)}
            />
          </View>

          {/* Second row: volume */}
          <View style={{ marginTop: metrics.zoneGap, alignSelf: 'stretch' }}>
            <VolumeControl />
          </View>

          {/* Bottom row: mic, keyboard, cast */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: metrics.zoneGap,
              marginTop: metrics.zoneGap,
            }}
          >
            <MicButton
              voiceHolding={voiceHolding}
              onPressIn={onMicPressIn}
              onPressOut={onMicPressOut}
              onPress={onMicPress}
            />
            <RemoteButton
              size={44}
              icon={Keyboard}
              accessibilityLabel="Keyboard"
              onPress={openIme}
            />
            <MuteButton />
            <CastTile size={44} />
          </View>
        </View>

        {/* Bottom bar: full-bleed shortcuts, edge to edge */}
        <ShortcutRow />
      </View>

      <ToastHost />
      <DeviceSwitchSheet visible={switchOpen} onClose={handleSheetClose} />
      <ImeSheet />
      <CastSheet />
      <VoiceOverlay active={voiceHolding} />
    </SafeAreaView>
  );
}
