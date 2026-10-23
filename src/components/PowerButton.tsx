import { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Power } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { haptic } from '@/lib/haptics';
import { SPRING } from '@/lib/spring';
import { Glow } from '@/theme/gradient';
import { powerShortPress, powerHoldStart, powerHoldEnd } from '@/services/power';

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
      haptic('heavy');
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
      haptic('light');
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
      <Glow color="#FF453A" size={120} x={-32} y={-32} opacity={0.16} />
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={2}
        />
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#FF453A"
          strokeWidth={2}
          strokeDasharray={CIRCUMFERENCE}
          strokeLinecap="round"
          animatedProps={animatedCircleProps}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </Svg>
      <View
        style={{
          width: SIZE,
          height: SIZE,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Power size={22} strokeWidth={1.6} color="#FF453A" />
        </Animated.View>
      </View>
    </Pressable>
  );
}
