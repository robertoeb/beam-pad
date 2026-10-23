import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { haptic } from '@/lib/haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useConnectionStore } from '@/stores/connection';
import { volumeCommand } from '@/services/volumeRouter';
import { SPRING } from '@/lib/spring';
import { Label } from '@/theme/typography';
import { radius } from '@/theme/tokens';

function VolButton({
  icon,
  onPress,
  accessibilityLabel,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  const flash = useSharedValue(0);
  const scale = useSharedValue(1);

  const flashStyle = useAnimatedStyle(() => ({ opacity: flash.value }));
  const scaleStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.9, SPRING);
        flash.value = withTiming(1, { duration: 80 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, SPRING);
        flash.value = withTiming(0, { duration: 240 });
      }}
      onPress={() => {
        haptic('light');
        onPress();
      }}
      style={{
        width: 48,
        height: 48,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          flashStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#22D3EE',
          },
        ]}
      />
      <Animated.View style={scaleStyle}>{icon}</Animated.View>
    </Pressable>
  );
}

export function VolumeControl() {
  const volume = useConnectionStore((s) => s.volume);
  const muted = volume?.muted ?? false;
  const level = volume ? volume.level : 0;
  const max = volume ? volume.max : 100;
  const pct = max > 0 ? Math.round((level / max) * 100) : 0;
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withSequence(withTiming(1, { duration: 120 }), withTiming(0, { duration: 260 }));
  }, [pct, pulse]);

  const numStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.3 * pulse.value }],
  }));

  return (
    <View
      style={{
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        backgroundColor: 'rgba(19,19,30,0.85)',
        padding: 5,
        gap: 6,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          backgroundColor: muted ? 'rgba(94,100,114,0.18)' : 'rgba(34,211,238,0.14)',
        }}
      />
      <VolButton
        accessibilityLabel="Volume down"
        onPress={() => volumeCommand('volDown')}
        icon={<Minus size={24} strokeWidth={2} color="#F5F6FA" />}
      />
      <View style={{ minWidth: 52, alignItems: 'center' }}>
        <Animated.View style={numStyle}>
          <Label
            style={{
              fontSize: 16,
              lineHeight: 20,
              fontWeight: '700',
              color: '#F5F6FA',
            }}
          >
            {muted ? '0' : pct}
          </Label>
        </Animated.View>
      </View>
      <VolButton
        accessibilityLabel="Volume up"
        onPress={() => volumeCommand('volUp')}
        icon={<Plus size={24} strokeWidth={2} color="#F5F6FA" />}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${pct}%`,
            backgroundColor: muted ? '#5E6472' : '#22D3EE',
          }}
        />
      </View>
    </View>
  );
}
