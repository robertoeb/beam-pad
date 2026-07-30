import { useRef } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SPRING } from '@/lib/spring';
import type { LucideIcon } from 'lucide-react-native';

export interface RemoteButtonProps {
  icon: LucideIcon;
  label?: string;
  onPress: () => void;
  onLongPress?: () => void;
  repeat?: boolean;
  accent?: 'cyan' | 'red';
  size?: number;
  round?: boolean;
  accessibilityLabel: string;
  testID?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function RemoteButton({
  icon: Icon,
  label,
  onPress,
  onLongPress,
  repeat,
  accent,
  size = 56,
  round,
  accessibilityLabel,
  testID,
}: RemoteButtonProps) {
  const scale = useSharedValue(1);
  const flash = useSharedValue(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fired = useRef(false);

  const style = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [{ scale: scale.value }],
    backgroundColor: flash.value > 0 ? `rgba(0,229,255,${0.2 * flash.value})` : 'transparent',
  }));

  const clearTimers = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (repeatTimer.current) clearInterval(repeatTimer.current);
    holdTimer.current = null;
    repeatTimer.current = null;
  };

  const pressIn = () => {
    fired.current = false;
    scale.value = withSpring(0.95, SPRING);
    flash.value = withTiming(1, { duration: 90 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (onLongPress && !repeat) {
      holdTimer.current = setTimeout(() => {
        fired.current = true;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onLongPress();
      }, 800);
    }

    if (repeat) {
      holdTimer.current = setTimeout(() => {
        onPress();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        repeatTimer.current = setInterval(() => {
          onPress();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, 150);
      }, 400);
    }
  };

  const pressOut = () => {
    scale.value = withSpring(1, SPRING);
    flash.value = withTiming(0, { duration: 140 });
    clearTimers();

    if (repeat) {
      onPress();
    } else if (!fired.current) {
      onPress();
    }
  };

  const iconColor = accent === 'red' ? '#FF3B30' : '#FFFFFF';

  return (
    <AnimatedPressable
      testID={testID}
      onPressIn={pressIn}
      onPressOut={pressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        style,
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: '#0C0C0E',
          borderRadius: round ? size / 2 : 18,
        },
      ]}
    >
      <Icon size={label ? 22 : 22} strokeWidth={1.5} color={iconColor} />
      {label ? (
        <Text
          style={{
            marginTop: 4,
            fontWeight: '500',
            fontSize: 11,
            color: '#A1A1AA',
          }}
        >
          {label}
        </Text>
      ) : null}
    </AnimatedPressable>
  );
}
