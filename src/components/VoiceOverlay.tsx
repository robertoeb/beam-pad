import { tokens } from '@/theme/tokens';
import { View } from 'react-native';
import { Mic } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label } from '@/theme/typography';

interface VoiceOverlayProps {
  active: boolean;
}

export function VoiceOverlay({ active }: VoiceOverlayProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(withTiming(1.12, { duration: 800 }), -1, true);
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
        backgroundColor: 'rgba(5,5,10,0.92)',
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
            borderWidth: 2,
            borderColor: tokens.colors.accent.cyan,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: tokens.colors.surface.sheet,
          },
          ringStyle,
        ]}
      >
        <Gradient
          colors={BRAND_GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          opacity={0.18}
        />
        <Mic size={48} strokeWidth={1.5} color={tokens.colors.accent.cyan} />
      </Animated.View>
      <Label style={{ marginTop: 24, color: tokens.colors.text.secondary }}>Listening… release to send</Label>
    </View>
  );
}
