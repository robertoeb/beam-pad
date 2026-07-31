import { ReactNode } from 'react';
import { View } from 'react-native';
import { Micro } from '@/theme/typography';
import { space } from '@/theme/tokens';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ marginBottom: space[6] }}>
      <Micro style={{ marginBottom: space[3], color: '#747B8A' }}>{title}</Micro>
      {children}
    </View>
  );
}
