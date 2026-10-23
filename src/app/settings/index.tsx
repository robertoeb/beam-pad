import { ScrollView, View } from 'react-native';
import Constants from 'expo-constants';
import { useSettingsStore } from '@/stores/settings';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Toggle } from '@/components/settings/Toggle';
import { SegmentedControl } from '@/components/settings/SegmentedControl';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label, Title } from '@/theme/typography';
import {
  RadioTower,
  Palette,
  Info,
  Zap,
  SlidersHorizontal,
  Repeat,
  Volume2,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { radius, space } from '@/theme/tokens';

export default function SettingsIndex() {
  const volumeTarget = useSettingsStore((s) => s.volumeTarget);
  const powerKeyMode = useSettingsStore((s) => s.powerKeyMode);
  const backDoubleTapHome = useSettingsStore((s) => s.backDoubleTapHome);
  const wakeOnConnect = useSettingsStore((s) => s.wakeOnConnect);
  const set = useSettingsStore((s) => s.set);
  const setVolumeTarget = useSettingsStore((s) => s.setVolumeTarget);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen>
      <ScreenHeader title="Settings" back />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: space[6],
            borderRadius: radius.xl,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.07)',
            backgroundColor: 'rgba(19,19,30,0.85)',
            padding: space[5],
            overflow: 'hidden',
          }}
        >
          <Gradient
            colors={BRAND_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.12}
          />
          <Title style={{ fontSize: 24, lineHeight: 30 }}>BeamPad</Title>
          <Label style={{ color: '#B7BDCB', marginTop: 2 }}>
            Remote for Android TV &amp; Google TV
          </Label>
          <Label style={{ color: '#747B8A', fontSize: 11, marginTop: 10 }}>Version {version}</Label>
        </View>

        <SettingsSection title="Volume">
          <SettingRow label="Volume target" icon={Volume2} stack>
            <SegmentedControl
              options={[
                { value: 'tv-os', label: 'TV (Wi-Fi)' },
                { value: 'ir', label: 'Hardware (IR)' },
              ]}
              value={volumeTarget}
              onChange={setVolumeTarget}
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="IR Control">
          <SettingRow
            label="IR Studio"
            icon={RadioTower}
            onPress={() => router.push('/settings/ir' as any)}
          />
        </SettingsSection>

        <SettingsSection title="Buttons">
          <SettingRow label="Power mode" icon={Zap} stack>
            <SegmentedControl
              options={[
                { value: 'toggle', label: 'Toggle' },
                { value: 'sleep-wake', label: 'Sleep/Wake' },
              ]}
              value={powerKeyMode}
              onChange={(v) => set({ powerKeyMode: v })}
            />
          </SettingRow>
          <SettingRow label="Double-tap back → Home" icon={Repeat}>
            <Toggle
              value={backDoubleTapHome}
              onValueChange={(v) => set({ backDoubleTapHome: v })}
              accessibilityLabel="Double-tap back to go home"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingRow
            label="Appearance"
            icon={Palette}
            onPress={() => router.push('/settings/appearance' as any)}
          />
        </SettingsSection>

        <SettingsSection title="Advanced">
          <SettingRow label="Wake on connect" icon={SlidersHorizontal}>
            <Toggle
              value={wakeOnConnect}
              onValueChange={(v) => set({ wakeOnConnect: v })}
              accessibilityLabel="Wake on connect"
            />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="About">
          <SettingRow
            label="About"
            icon={Info}
            onPress={() => router.push('/settings/about' as any)}
          />
        </SettingsSection>

        <View style={{ height: space[10] }} />
      </ScrollView>
    </Screen>
  );
}
