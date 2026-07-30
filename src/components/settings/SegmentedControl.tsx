import { Pressable, View, Text } from 'react-native';
import { tokens } from '@/theme/tokens';

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
    <View className="flex-row gap-2" testID={testID}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            disabled={opt.disabled}
            className={`flex-1 items-center rounded-xl border py-3 ${
              selected
                ? 'border-accent-cyan bg-accent-cyan/10'
                : opt.disabled
                  ? 'border-surface-border bg-surface opacity-50'
                  : 'border-surface-border bg-surface'
            }`}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected, disabled: opt.disabled }}
          >
            <Text
              className={`font-medium text-sm ${
                selected ? 'text-accent-cyan' : 'text-text-primary'
              }`}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
