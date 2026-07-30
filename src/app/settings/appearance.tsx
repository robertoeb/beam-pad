import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSettingsStore, type Density, type HapticStrength } from '@/stores/settings';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Toggle } from '@/components/settings/Toggle';
import { SegmentedControl } from '@/components/settings/SegmentedControl';
import { tokens } from '@/theme/tokens';

export default function AppearanceScreen() {
  const density = useSettingsStore((s) => s.density);
  const hapticStrength = useSettingsStore((s) => s.hapticStrength);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const showShortcutLabels = useSettingsStore((s) => s.showShortcutLabels);
  const set = useSettingsStore((s) => s.set);

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
        <Text className="font-semibold text-lg text-text-primary">Appearance</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        <SettingsSection title="Density">
          <SegmentedControl
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'spacious', label: 'Spacious' },
            ]}
            value={density}
            onChange={(v) => set({ density: v as Density })}
          />
        </SettingsSection>

        <SettingsSection title="Haptics">
          <SegmentedControl
            options={[
              { value: 'off', label: 'Off' },
              { value: 'light', label: 'Light' },
              { value: 'medium', label: 'Medium' },
            ]}
            value={hapticStrength}
            onChange={(v) => set({ hapticStrength: v as HapticStrength })}
          />
        </SettingsSection>

        <SettingsSection title="Motion">
          <SettingRow label="Reduce motion">
            <Toggle
              value={reduceMotion === true}
              onValueChange={(v) => set({ reduceMotion: v ? true : 'system' })}
              accessibilityLabel="Reduce motion"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Labels">
          <SettingRow label="Show shortcut labels">
            <Toggle
              value={showShortcutLabels}
              onValueChange={(v) => set({ showShortcutLabels: v })}
              accessibilityLabel="Show shortcut labels"
            />
          </SettingRow>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
