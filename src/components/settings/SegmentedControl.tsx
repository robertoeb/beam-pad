import { Pressable, View } from 'react-native';
import { Label } from '@/theme/typography';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import {radius, tokens} from '@/theme/tokens';

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  testID?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  testID,
}: SegmentedControlProps<T>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'rgba(19,19,30,0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        borderRadius: radius.xl,
        padding: 4,
      }}
      testID={testID}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            disabled={opt.disabled}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: selected ? 'transparent' : 'transparent',
              backgroundColor: selected ? 'transparent' : 'transparent',
              paddingVertical: 11,
              opacity: opt.disabled ? 0.5 : 1,
              overflow: 'hidden',
            }}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected, disabled: opt.disabled }}
          >
            {selected ? (
              <Gradient
                colors={BRAND_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                opacity={0.92}
              />
            ) : null}
            <Label
              style={{
                color: selected ? tokens.colors.background : tokens.colors.text.secondary,
                fontWeight: selected ? '600' : '400',
              }}
            >
              {opt.label}
            </Label>
          </Pressable>
        );
      })}
    </View>
  );
}
