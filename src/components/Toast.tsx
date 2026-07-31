import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label } from '@/theme/typography';
import { zIndex } from '@/theme/tokens';

interface ToastState {
  message: string;
  visible: boolean;
}

let _showToast: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  _showToast?.(msg);
}

const DEBOUNCE_MS = 3000;

export function ToastHost() {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const lastFired = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    const now = Date.now();
    if (now - lastFired.current < DEBOUNCE_MS) return;
    lastFired.current = now;

    if (hideTimer.current) clearTimeout(hideTimer.current);
    setToast({ message: msg, visible: true });
    hideTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      hideTimer.current = null;
    }, 2000);
  }, []);

  _showToast = show;

  const animStyle = useAnimatedStyle(() => ({
    opacity: withTiming(toast.visible ? 1 : 0, { duration: 200 }),
    transform: [{ translateY: withTiming(toast.visible ? 0 : 20, { duration: 200 }) }],
  }));

  if (!toast.message) return null;

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
        <Label style={{ color: '#E8EAF2' }}>{toast.message}</Label>
      </View>
    </Animated.View>
  );
}
