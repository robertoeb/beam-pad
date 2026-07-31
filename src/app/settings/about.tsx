import { ScrollView, View } from 'react-native';
import Constants from 'expo-constants';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Tag, ShieldCheck, Cable, Scale } from 'lucide-react-native';
import { space } from '@/theme/tokens';

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen>
      <ScreenHeader title="About" back />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <SettingsSection title="App">
          <SettingRow label="Version" value={version} icon={Tag} />
          <SettingRow label="Protocol" value="v2" icon={ShieldCheck} />
        </SettingsSection>

        <SettingsSection title="Diagnostics">
          <SettingRow label="Connection" value="See devices screen" icon={Cable} />
        </SettingsSection>

        <SettingsSection title="Licences">
          <SettingRow label="Open-source licences" icon={Scale} onPress={() => {}} />
        </SettingsSection>

        <View style={{ height: space[10] }} />
      </ScrollView>
    </Screen>
  );
}
