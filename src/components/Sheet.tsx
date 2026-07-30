import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { SPRING } from '@/lib/spring';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  testID?: string;
}

export function Sheet({ open, onClose, children, testID }: SheetProps) {
  const translateY = useSharedValue(600);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      translateY.value = withSpring(0, SPRING);
      backdropOpacity.value = withTiming(0.6, { duration: 200 });
    } else {
      translateY.value = withTiming(600, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [open, translateY, backdropOpacity]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

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
            backgroundColor: '#000',
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
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',
              backgroundColor: '#0C0C0E',
              overflow: 'hidden',
            },
          ]}
        >
          <View
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignSelf: 'center',
              marginTop: 8,
              marginBottom: 8,
            }}
          />
          {children}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
