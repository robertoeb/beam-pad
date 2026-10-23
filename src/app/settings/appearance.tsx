import { Pressable, ScrollView, View } from 'react-native';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Hand,
} from 'lucide-react-native';
import {
  useSettingsStore,
  type Density,
  type HapticStrength,
  type NavigationMode,
} from '@/stores/settings';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Toggle } from '@/components/settings/Toggle';
import { SegmentedControl } from '@/components/settings/SegmentedControl';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Label } from '@/theme/typography';
import {radius, space, tokens} from '@/theme/tokens';

function ExampleDpad() {
  const size = 20;
  const dot = {
    width: size,
    height: size,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
  return (
    <View style={{ width: 88, height: 88, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 6, left: 34, ...dot }}>
        <ChevronUp size={12} color={tokens.colors.text.secondary} />
      </View>
      <View style={{ position: 'absolute', bottom: 6, left: 34, ...dot }}>
        <ChevronDown size={12} color={tokens.colors.text.secondary} />
      </View>
      <View style={{ position: 'absolute', left: 6, top: 34, ...dot }}>
        <ChevronLeft size={12} color={tokens.colors.text.secondary} />
      </View>
      <View style={{ position: 'absolute', right: 6, top: 34, ...dot }}>
        <ChevronRight size={12} color={tokens.colors.text.secondary} />
      </View>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          backgroundColor: 'rgba(34,211,238,0.14)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircleDot size={12} color={tokens.colors.accent.cyan} />
      </View>
    </View>
  );
}

function ExampleTouchpad() {
  return (
    <View
      style={{
        width: 88,
        height: 88,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(19,19,30,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: tokens.colors.accent.cyan,
          marginBottom: 8,
        }}
      />
      <Hand size={20} color={tokens.colors.text.muted} />
    </View>
  );
}

export default function AppearanceScreen() {
  const density = useSettingsStore((s) => s.density);
  const hapticStrength = useSettingsStore((s) => s.hapticStrength);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const showShortcutLabels = useSettingsStore((s) => s.showShortcutLabels);
  const navigationMode = useSettingsStore((s) => s.navigationMode);
  const set = useSettingsStore((s) => s.set);

  const navOptions: { value: NavigationMode; label: string; example: React.ReactNode }[] = [
    { value: 'dpad', label: 'D-pad', example: <ExampleDpad /> },
    { value: 'touchpad', label: 'Touchpad', example: <ExampleTouchpad /> },
  ];

  return (
    <Screen>
      <ScreenHeader title="Appearance" back />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Navigation">
          <View style={{ flexDirection: 'row', gap: space[3] }}>
            {navOptions.map((opt) => {
              const selected = navigationMode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => set({ navigationMode: opt.value })}
                  accessibilityRole="button"
                  accessibilityLabel={`Use ${opt.label}`}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRadius: radius.xl,
                    borderWidth: 1,
                    borderColor: selected ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.07)',
                    backgroundColor: selected ? 'rgba(34,211,238,0.07)' : 'rgba(19,19,30,0.8)',
                    paddingVertical: 12,
                  }}
                >
                  {opt.example}
                  <Label style={{ marginTop: 8, color: selected ? tokens.colors.accent.cyan : tokens.colors.text.primary }}>
                    {opt.label}
                  </Label>
                </Pressable>
              );
            })}
          </View>
        </SettingsSection>

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

        <View style={{ height: space[10] }} />
      </ScrollView>
    </Screen>
  );
}
