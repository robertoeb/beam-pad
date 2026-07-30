import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { tokens } from '@/theme/tokens';

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center gap-3 px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Back"
          accessibilityRole="button"
        >
          <ArrowLeft size={22} color={tokens.colors.text.primary} />
        </Pressable>
        <Text className="font-semibold text-lg text-text-primary">About</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        <SettingsSection title="App">
          <SettingRow label="Version" value={version} />
          <SettingRow label="Protocol" value="v2" />
        </SettingsSection>

        <SettingsSection title="Diagnostics">
          <SettingRow label="Connection" value="See devices screen" />
        </SettingsSection>

        <SettingsSection title="Licences">
          <SettingRow label="Open-source licences" onPress={() => {}} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
