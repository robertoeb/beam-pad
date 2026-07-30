import { useRef } from 'react';
import { Pressable } from 'react-native';
import { Power } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SPRING } from '@/lib/spring';
import { powerShortPress, powerHoldStart, powerHoldEnd } from '@/services/power';
import { useSettingsStore } from '@/stores/settings';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 56;
const R = 26;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function PowerButton() {
  const scale = useSharedValue(1);
  const ringProgress = useSharedValue(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - ringProgress.value),
  }));

  const pressIn = () => {
    fired.current = false;
    scale.value = withSpring(0.95, SPRING);
    ringProgress.value = withTiming(1, { duration: 800 });

    holdTimer.current = setTimeout(() => {
      fired.current = true;
      if (useSettingsStore.getState().haptics) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      powerHoldStart();
    }, 800);
  };

  const pressOut = () => {
    scale.value = withSpring(1, SPRING);
    ringProgress.value = withTiming(0, { duration: 120 });

    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (fired.current) {
      powerHoldEnd();
    } else {
      if (useSettingsStore.getState().haptics) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      powerShortPress();
    }
  };

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      accessibilityRole="button"
      accessibilityLabel="Power"
      testID="power-button"
      style={{
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={2}
        />
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#FF3B30"
          strokeWidth={2}
          strokeDasharray={CIRCUMFERENCE}
          strokeLinecap="round"
          animatedProps={animatedCircleProps}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </Svg>
      <Animated.View
        style={{
          transform: [{ scale }],
          width: SIZE,
          height: SIZE,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Power size={22} strokeWidth={1.5} color="#FF3B30" />
      </Animated.View>
    </Pressable>
  );
}
