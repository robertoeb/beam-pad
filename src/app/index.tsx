import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPRING } from '@/lib/spring';
import { DevicePill } from '@/components/DevicePill';
import { DeviceSwitchSheet } from '@/components/DeviceSwitchSheet';

export default function Index() {
  const scale = useRef(new Animated.Value(1)).current;
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const loop = () => {
      scale.setValue(1);
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }).start(loop);
      });
    };
    loop();
  }, [scale]);

  const handleSheetOpen = useCallback(() => setSheetOpen(true), []);
  const handleSheetClose = useCallback(() => setSheetOpen(false), []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-start px-4 pt-2">
        <DevicePill onPress={handleSheetOpen} />
      </View>

      <View className="flex-1 items-center justify-center gap-4">
        <Text className="font-semibold text-2xl tracking-tight text-text-primary">BeamPad</Text>
        <Animated.View
          style={[
            { transform: [{ scale }] },
            { width: 12, height: 12, borderRadius: 6, backgroundColor: '#00E5FF' },
          ]}
        />
        <Text className="mt-8 font-medium text-xs text-text-muted">
          Foundation OK — {JSON.stringify(SPRING)}
        </Text>
      </View>

      <DeviceSwitchSheet visible={sheetOpen} onClose={handleSheetClose} />
    </SafeAreaView>
  );
}
