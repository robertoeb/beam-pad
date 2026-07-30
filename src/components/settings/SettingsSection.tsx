import { ReactNode } from 'react';
import { View, Text } from 'react-native';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
        {title}
      </Text>
      {children}
    </View>
  );
}
