import { tokens } from '@/theme/tokens';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.colors.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
