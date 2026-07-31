import { ReactNode, useEffect } from 'react';
import { BackHandler, Pressable, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SPRING } from '@/lib/spring';
import { radius, zIndex } from '@/theme/tokens';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeightRatio?: number;
  bottomInset?: number;
  testID?: string;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export function Sheet({
  open,
  onClose,
  children,
  maxHeightRatio = 0.72,
  bottomInset = 0,
  testID,
}: SheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      translateY.value = withSpring(0, SPRING);
      backdropOpacity.value = withTiming(0.6, { duration: 200 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [open, translateY, backdropOpacity]);

  useEffect(() => {
    if (!open) return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => handler.remove();
  }, [open, onClose]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const maxHeight = SCREEN_HEIGHT * maxHeightRatio;

  return (
    <View
      testID={testID}
      pointerEvents={open ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: zIndex.sheet,
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#05050A',
          },
          backdropStyle,
        ]}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close sheet"
        />
      </Animated.View>

      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={[
            sheetStyle,
            {
              borderRadius: radius.sheet,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.09)',
              backgroundColor: '#10101A',
              overflow: 'hidden',
              maxHeight,
              marginHorizontal: 8,
              marginBottom: 8 + bottomInset,
            },
          ]}
        >
          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            <View
              style={{
                width: 44,
                height: 5,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.16)',
              }}
            />
          </View>
          <View style={{ maxHeight: maxHeight - 44 }}>{children}</View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
