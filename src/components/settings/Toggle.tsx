import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SPRING } from '@/lib/spring';
import { tokens } from '@/theme/tokens';
import { useSettingsStore } from '@/stores/settings';

interface ToggleProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  accessibilityLabel: string;
  testID?: string;
}

export function Toggle({ value, onValueChange, disabled, accessibilityLabel, testID }: ToggleProps) {
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
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: value
          ? tokens.colors.accent.cyan
          : 'rgba(255,255,255,0.12)',
        justifyContent: 'center',
        paddingHorizontal: 2,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Animated.View
        style={[
          {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: tokens.colors.text.primary,
          },
          knobStyle,
        ]}
      />
    </Pressable>
  );
}
