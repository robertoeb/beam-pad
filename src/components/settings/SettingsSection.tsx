import { ReactNode } from 'react';
import { View } from 'react-native';
import { Micro } from '@/theme/typography';
import {space, tokens} from '@/theme/tokens';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ marginBottom: space[6] }}>
      <Micro style={{ marginBottom: space[3], color: tokens.colors.text.muted }}>{title}</Micro>
      {children}
    </View>
  );
}
