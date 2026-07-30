import { View, Text } from 'react-native';
import { Mic } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface VoiceOverlayProps {
  active: boolean;
}

export function VoiceOverlay({ active }: VoiceOverlayProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(withTiming(1.15, { duration: 800 }), -1, true);
    } else {
      scale.value = 1;
    }
  }, [active, scale]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      testID="voice-overlay"
      pointerEvents={active ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: active ? 1 : 0,
      }}
    >
      <Animated.View
        style={[
          {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: '#00E5FF',
            justifyContent: 'center',
            alignItems: 'center',
          },
          ringStyle,
        ]}
      >
        <Mic size={48} strokeWidth={1.5} color="#00E5FF" />
      </Animated.View>
      <Text
        className="mt-6 text-[15px] text-text-secondary"
        style={{ fontFamily: 'Inter-Medium' }}
      >
        Listening… release to send
      </Text>
    </View>
  );
}
