import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useConnectionStore } from '@/stores/connection';
import {space, tokens} from '@/theme/tokens';
import { Label } from '@/theme/typography';

export function NowPlayingStrip() {
  const currentApp = useConnectionStore((s) => s.currentApp);
  const state = useConnectionStore((s) => s.state);
  const volume = useConnectionStore((s) => s.volume);
  const volumeOpacity = useSharedValue(0);

  const level = volume ? volume.level : 0;
  const max = volume ? volume.max : 100;
  const fillRatio = max > 0 ? Math.min(level / max, 1) : 0;

  useEffect(() => {
    if (volume && level > 0) {
      volumeOpacity.value = withTiming(1, { duration: 150 });
      const timer = setTimeout(() => {
        volumeOpacity.value = withTiming(0, { duration: 300 });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [level, volume, volumeOpacity]);

  const volumeBarStyle = useAnimatedStyle(() => ({
    opacity: volumeOpacity.value,
  }));

  if (state === 'RECONNECTING') {
    return (
      <View style={{ height: 28, justifyContent: 'center', alignItems: 'center' }}>
        <Label style={{ color: tokens.colors.accent.yellow }}>RECONNECTING</Label>
      </View>
    );
  }

  if (!currentApp) return null;

  return (
    <View style={{ height: 28, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[2],
          borderRadius: 999,
          backgroundColor: 'rgba(34,211,238,0.08)',
          borderWidth: 1,
          borderColor: 'rgba(34,211,238,0.2)',
          paddingHorizontal: 10,
          paddingVertical: 3,
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: tokens.colors.accent.cyan,
          }}
        />
        <Label style={{ color: tokens.colors.text.secondary, fontSize: 11 }} numberOfLines={1}>
          {currentApp.label}
        </Label>
      </View>
      <Animated.View
        style={[
          volumeBarStyle,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'rgba(34,211,238,0.3)',
            borderRadius: 1,
          },
        ]}
      >
        <View
          style={{
            height: '100%',
            width: `${fillRatio * 100}%`,
            backgroundColor: tokens.colors.accent.cyan,
            borderRadius: 1,
          }}
        />
      </Animated.View>
    </View>
  );
}
