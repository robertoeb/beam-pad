import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { radius } from '@/theme/tokens';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: any;
}

export function Skeleton({ width = '100%', height = 20, style }: SkeletonProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius.md, backgroundColor: '#1A1A2A' },
        animStyle,
        style,
      ]}
    />
  );
}

export function SkeletonRow({ style }: { style?: any }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 4,
        },
        style,
      ]}
    >
      <Skeleton width={44} height={44} style={{ borderRadius: 22 }} />
      <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
        <Skeleton width="55%" height={16} />
        <Skeleton width="35%" height={12} />
      </View>
      <Skeleton width={56} height={32} />
    </View>
  );
}
