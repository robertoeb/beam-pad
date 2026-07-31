import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface MicButtonProps {
  voiceHolding: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  onPress: () => void;
}

export function MicButton({ voiceHolding, onPressIn, onPressOut, onPress }: MicButtonProps) {
  const pulse = useSharedValue(0);
  const [pressed, setPressed] = useState(false);
  const active = voiceHolding || pressed;

  useEffect(() => {
    if (voiceHolding) {
      pulse.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    } else {
      pulse.value = 0;
    }
  }, [voiceHolding, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.6 - 0.6 * pulse.value,
    transform: [{ scale: 1 + 0.4 * pulse.value }],
  }));

  return (
    <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
      {voiceHolding ? (
        <Animated.View
          style={[
            ringStyle,
            {
              position: 'absolute',
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: '#22D3EE',
            },
          ]}
        />
      ) : null}
      <Pressable
        onPressIn={() => {
          setPressed(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPressIn();
        }}
        onPressOut={() => {
          setPressed(false);
          onPressOut();
        }}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Voice"
        style={({ pressed: p }) => ({
          width: 44,
          height: 44,
          borderRadius: 22,
          borderWidth: 1,
          borderColor: active ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.08)',
          backgroundColor: active ? 'rgba(34,211,238,0.12)' : '#15151F',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale: p ? 0.92 : 1 }],
        })}
      >
        <Mic size={20} strokeWidth={1.6} color={active ? '#22D3EE' : '#F5F6FA'} />
      </Pressable>
    </View>
  );
}
