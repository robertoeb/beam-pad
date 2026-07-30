import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Toggle } from '@/components/settings/Toggle';
import { SegmentedControl } from '@/components/settings/SegmentedControl';
import { tokens } from '@/theme/tokens';

export default function SettingsIndex() {
  const volumeTarget = useSettingsStore((s) => s.volumeTarget);
  const powerKeyMode = useSettingsStore((s) => s.powerKeyMode);
  const hapticStrength = useSettingsStore((s) => s.hapticStrength);
  const backDoubleTapHome = useSettingsStore((s) => s.backDoubleTapHome);
  const wakeOnConnect = useSettingsStore((s) => s.wakeOnConnect);
  const set = useSettingsStore((s) => s.set);
  const setVolumeTarget = useSettingsStore((s) => s.setVolumeTarget);

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
        <Text className="font-semibold text-lg text-text-primary">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        <SettingsSection title="Volume">
          <SegmentedControl
            options={[
              { value: 'tv-os', label: 'TV (Wi-Fi)' },
              { value: 'ir', label: 'Hardware (IR)' },
            ]}
            value={volumeTarget}
            onChange={setVolumeTarget}
          />
        </SettingsSection>

        <SettingsSection title="IR Control">
          <SettingRow label="IR Studio" onPress={() => router.push('/settings/ir' as any)} />
        </SettingsSection>

        <SettingsSection title="Buttons">
          <SettingRow label="Power Mode">
            <SegmentedControl
              options={[
                { value: 'toggle', label: 'Toggle' },
                { value: 'sleep-wake', label: 'Sleep/Wake' },
              ]}
              value={powerKeyMode}
              onChange={(v) => set({ powerKeyMode: v })}
            />
          </SettingRow>
          <SettingRow label="Double-tap back → Home">
            <Toggle
              value={backDoubleTapHome}
              onValueChange={(v) => set({ backDoubleTapHome: v })}
              accessibilityLabel="Double-tap back to go home"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingRow label="Appearance" onPress={() => router.push('/settings/appearance' as any)} />
        </SettingsSection>

        <SettingsSection title="Advanced">
          <SettingRow label="Wake on connect">
            <Toggle
              value={wakeOnConnect}
              onValueChange={(v) => set({ wakeOnConnect: v })}
              accessibilityLabel="Wake on connect"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="About">
          <SettingRow label="About" onPress={() => router.push('/settings/about' as any)} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
