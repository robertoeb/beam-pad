import { useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { key } from '@/lib/key';
import { KEYS } from '@/protocol/keycodes';
import { radius } from '@/theme/tokens';

const DIRECTION_KEYS = {
  up: KEYS.up,
  down: KEYS.down,
  left: KEYS.left,
  right: KEYS.right,
} as const;

const THRESHOLD = 36;

interface TouchPadProps {
  size?: number;
}

export function TouchPad({ size = 228 }: TouchPadProps) {
  const scale = useSharedValue(1);
  const glowX = useSharedValue(0);
  const glowY = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const accum = useRef({ x: 0, y: 0 });
  const totalMoved = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [dir, setDir] = useState<string | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        accum.current = { x: 0, y: 0 };
        totalMoved.current = 0;
        last.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        setDir(null);
        scale.value = withTiming(0.98, { duration: 80 });
        glowX.value = (e.nativeEvent.locationX ?? size / 2) - size / 2;
        glowY.value = (e.nativeEvent.locationY ?? size / 2) - size / 2;
        glowOpacity.value = withTiming(1, { duration: 120 });
      },
      onPanResponderMove: (e) => {
        const now = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        if (!last.current) {
          last.current = now;
          return;
        }
        const dx = now.x - last.current.x;
        const dy = now.y - last.current.y;
        accum.current.x += dx;
        accum.current.y += dy;
        totalMoved.current += Math.abs(dx) + Math.abs(dy);
        last.current = now;

        glowX.value = e.nativeEvent.locationX - size / 2;
        glowY.value = e.nativeEvent.locationY - size / 2;

        const ax = Math.abs(accum.current.x);
        const ay = Math.abs(accum.current.y);
        if (ax < THRESHOLD && ay < THRESHOLD) return;

        const d =
          ax >= ay ? (accum.current.x > 0 ? 'right' : 'left') : accum.current.y > 0 ? 'down' : 'up';
        setDir(d);
        key(DIRECTION_KEYS[d as keyof typeof DIRECTION_KEYS]);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // Reset both so the user can freely switch axes mid-gesture while a
        // small perpendicular wobble never accumulates into a wrong direction.
        accum.current = { x: 0, y: 0 };
      },
      onPanResponderRelease: () => {
        scale.value = withTiming(1, { duration: 100 });
        glowOpacity.value = withTiming(0, { duration: 250 });
        if (totalMoved.current < 12) {
          key(KEYS.ok);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setDir(null);
        last.current = null;
      },
      onPanResponderTerminate: () => {
        scale.value = withTiming(1, { duration: 100 });
        glowOpacity.value = withTiming(0, { duration: 250 });
        setDir(null);
        last.current = null;
      },
    }),
  ).current;

  const padStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ translateX: glowX.value }, { translateY: glowY.value }],
  }));

  const G = 84;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        padStyle,
        {
          width: size,
          height: size,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: '#13131E',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Touchpad - swipe to navigate, tap to select"
    >
      <Animated.View
        pointerEvents="none"
        style={[
          glowStyle,
          {
            position: 'absolute',
            left: size / 2 - G / 2,
            top: size / 2 - G / 2,
            width: G,
            height: G,
            borderRadius: G / 2,
            backgroundColor: 'rgba(34,211,238,0.10)',
            borderWidth: 1,
            borderColor: 'rgba(34,211,238,0.35)',
          },
        ]}
      />
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          borderWidth: 2,
          borderColor: dir ? '#22D3EE' : '#5E6472',
          backgroundColor: dir ? 'rgba(34,211,238,0.15)' : 'transparent',
        }}
      />
    </Animated.View>
  );
}
