import { ReactNode } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { tokens } from '@/theme/tokens';

interface SettingRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  children?: ReactNode;
  testID?: string;
}

export function SettingRow({ label, value, onPress, children, testID }: SettingRowProps) {
  const content = (
    <View className="flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3">
      <Text className="text-sm text-text-primary">{label}</Text>
      {children ?? (
        <View className="flex-row items-center gap-1">
          {value ? <Text className="text-sm text-text-secondary">{value}</Text> : null}
          {onPress ? <ChevronRight size={16} color={tokens.colors.text.secondary} /> : null}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        testID={testID}
        className="mb-2"
      >
        {content}
      </Pressable>
    );
  }

  return <View className="mb-2">{content}</View>;
}
