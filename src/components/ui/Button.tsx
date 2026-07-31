import { Pressable, StyleSheet, View } from 'react-native';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label } from '@/theme/typography';
import { radius } from '@/theme/tokens';
import type { LucideIcon } from 'lucide-react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  disabled?: boolean;
  fullWidth?: boolean;
  testID?: string;
}

const palette: Record<ButtonVariant, { fg: string; bg?: string }> = {
  primary: { fg: '#0A0A12' },
  secondary: { fg: '#F5F6FA' },
  ghost: { fg: '#B7BDCB' },
  danger: { fg: '#FF453A' },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon: Icon,
  disabled = false,
  fullWidth = false,
  testID,
}: ButtonProps) {
  const { fg, bg } = palette[variant];
  const isPrimary = variant === 'primary';

  const content = (
    <View style={[styles.base, fullWidth && styles.fullWidth, isPrimary && styles.primaryPad]}>
      {isPrimary ? (
        <Gradient colors={BRAND_GRADIENT} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} />
      ) : null}
      {Icon ? <Icon size={18} strokeWidth={1.8} color={fg} style={{ marginRight: 6 }} /> : null}
      <Label style={{ color: fg, fontSize: 15, fontWeight: isPrimary ? '600' : '400' }}>
        {label}
      </Label>
    </View>
  );

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: isPrimary
          ? undefined
          : (bg ?? (variant === 'ghost' ? 'transparent' : '#13131E')),
        borderWidth: variant === 'secondary' || variant === 'danger' ? 1 : 0,
        borderColor: variant === 'danger' ? 'rgba(255,69,58,0.4)' : 'rgba(255,255,255,0.08)',
        alignSelf: fullWidth ? 'stretch' : 'flex-start',
      })}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  primaryPad: {
    paddingVertical: 15,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
});
