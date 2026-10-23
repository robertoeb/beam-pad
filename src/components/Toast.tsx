import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label } from '@/theme/typography';
import { zIndex } from '@/theme/tokens';
import { TOAST_VISIBLE_MS, useToastStore } from '@/stores/toast';

export { showToast } from '@/stores/toast';

export function ToastHost() {
  const message = useToastStore((s) => s.message);
  const visible = useToastStore((s) => s.visible);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => useToastStore.getState().hide(), TOAST_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [visible, message]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible ? 1 : 0, { duration: 200 }),
    transform: [{ translateY: withTiming(visible ? 0 : 20, { duration: 200 }) }],
  }));

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        animStyle,
        {
          position: 'absolute',
          bottom: 96,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: zIndex.toast,
        },
      ]}
    >
      <View
        style={{
          borderRadius: 999,
          borderWidth: 1,
          borderColor: 'rgba(34,211,238,0.3)',
          backgroundColor: '#13131E',
          paddingHorizontal: 16,
          paddingVertical: 9,
          overflow: 'hidden',
        }}
      >
        <Gradient
          colors={BRAND_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          opacity={0.12}
        />
        <Label style={{ color: '#E8EAF2' }}>{message}</Label>
      </View>
    </Animated.View>
  );
}
