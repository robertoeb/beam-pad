import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SPRING } from '@/lib/spring';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { useSettingsStore } from '@/stores/settings';

interface ToggleProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  accessibilityLabel: string;
  testID?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
  testID,
}: ToggleProps) {
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);

  const knobStyle = useAnimatedStyle(() => {
    const translateX = value ? 20 : 0;
    const x = reduceMotion === true ? translateX : withSpring(translateX, SPRING);
    return { transform: [{ translateX: x }] };
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      disabled={disabled}
      style={{
        width: 48,
        height: 28,
        minHeight: 28,
        borderRadius: 14,
        backgroundColor: value ? 'transparent' : 'rgba(255,255,255,0.12)',
        justifyContent: 'center',
        paddingHorizontal: 2,
        opacity: disabled ? 0.5 : 1,
        overflow: 'hidden',
      }}
    >
      {value ? (
        <Gradient colors={BRAND_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      ) : null}
      <Animated.View
        style={[
          {
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#F5F6FA',
          },
          knobStyle,
        ]}
      />
    </Pressable>
  );
}
