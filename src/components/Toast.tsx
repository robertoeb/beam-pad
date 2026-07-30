import { useCallback, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

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

  return (
    <Animated.View
      pointerEvents="none"
      style={animStyle}
      className="absolute bottom-24 left-0 right-0 items-center"
    >
      <View className="rounded-full border border-surface-border bg-surface px-4 py-2">
        <Text className="font-medium text-[13px] text-text-secondary">{toast.message}</Text>
      </View>
    </Animated.View>
  );
}
