import { tokens } from '@/theme/tokens';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LoaderCircle } from 'lucide-react-native';

interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Spinner({ size = 22, color = tokens.colors.accent.cyan, strokeWidth = 2 }: SpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 900 }), -1, false);
    return () => {
      rotation.value = 0;
    };
  }, [rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <LoaderCircle size={size} color={color} strokeWidth={strokeWidth} />
    </Animated.View>
  );
}
