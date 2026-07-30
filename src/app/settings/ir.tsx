import { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { IR_PROFILES, encodeCommand, type IrProfile } from '@/ir/profiles';
import { irSend, resolveProfile, type IrResult, type CommandName } from '@/services/volumeRouter';
import { IrBlaster } from '@/modules/expo-ir-blaster';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { tokens } from '@/theme/tokens';

type RowStatus = 'idle' | 'sent' | 'unsupported' | 'failed';

const REASON_LABEL: Record<string, string> = {
  'no-profile': 'No IR profile selected',
  'no-command': 'Command not in profile',
  'freq-unsupported': 'Carrier frequency not supported by this phone',
  'no-emitter': 'No IR emitter detected',
  'transmit-failed': 'Transmit failed',
};

export default function IrStudioScreen() {
  const irAvailable = useSettingsStore((s) => s.irAvailable);
  const irRepeatCount = useSettingsStore((s) => s.irRepeatCount);
  const irGapMs = useSettingsStore((s) => s.irGapMs);
  const set = useSettingsStore((s) => s.set);
  const activeDeviceId = useDevicesStore((s) => s.activeDeviceId);

  const profile = resolveProfile(activeDeviceId);
  const [ranges, setRanges] = useState<{ min: number; max: number }[]>([]);
  const [rowStatuses, setRowStatuses] = useState<Record<string, RowStatus>>({});
  const [rowDetails, setRowDetails] = useState<Record<string, string>>({});

  useState(() => {
    IrBlaster.getCarrierFrequencyRanges().then(setRanges);
  });

  const commands = useMemo(() => {
    if (!profile) return [];
    return Object.keys(profile.commands) as (keyof IrProfile['commands'])[];
  }, [profile]);

  const handleSend = async (name: keyof IrProfile['commands'], repeat = 1) => {
    let lastResult: IrResult = { ok: false, reason: 'no-profile' };
    for (let i = 0; i < repeat; i++) {
      lastResult = await irSend(name);
      if (i < repeat - 1 && lastResult.ok) {
        await new Promise((r) => setTimeout(r, irGapMs));
      }
    }
    const status: RowStatus = lastResult.ok
      ? 'sent'
      : lastResult.reason === 'freq-unsupported' || lastResult.reason === 'no-emitter'
        ? 'unsupported'
        : 'failed';
    setRowStatuses((prev) => ({ ...prev, [name]: status }));
    if (!lastResult.ok) {
      setRowDetails((prev) => ({
        ...prev,
        [name]: REASON_LABEL[lastResult.reason] ?? lastResult.reason,
      }));
    }
  };

  const statusColor = (s: RowStatus) => {
    if (s === 'sent') return tokens.colors.accent.cyan;
    if (s === 'unsupported') return tokens.colors.text.muted;
    if (s === 'failed') return tokens.colors.accent.red;
    return tokens.colors.text.secondary;
  };

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
        <Text className="font-semibold text-lg text-text-primary">IR Studio</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        <SettingsSection title="Capability">
          <SettingRow
            label="IR Blaster"
            value={irAvailable ? 'Available' : 'Not available'}
          />
          {ranges.length > 0 && (
            <View className="mt-2 flex-row flex-wrap gap-2">
              {ranges.map((r, i) => (
                <View
                  key={i}
                  className="rounded-full border border-surface-border bg-surface px-3 py-1"
                >
                  <Text className="text-xs text-text-secondary">
                    {Math.round(r.min / 1000)}–{Math.round(r.max / 1000)} kHz
                  </Text>
                </View>
              ))}
            </View>
          )}
        </SettingsSection>

        <SettingsSection title="Profile">
          <SettingRow
            label="Active Profile"
            value={profile ? `${profile.brand} (${profile.protocol.toUpperCase()})` : 'None'}
            onPress={() => router.push('/settings/ir-profile' as any)}
          />
          {profile?.verified && (
            <View className="mt-1 flex-row items-center gap-1">
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: tokens.colors.accent.green,
                }}
              />
              <Text className="text-xs text-text-secondary">Verified</Text>
            </View>
          )}
        </SettingsSection>

        <SettingsSection title="Command Matrix">
          {commands.length === 0 && (
            <Text className="text-sm text-text-muted">Select a profile to test commands.</Text>
          )}
          {commands.map((name) => {
            const status = rowStatuses[name] ?? 'idle';
            const detail = rowDetails[name];
            return (
              <View key={name} className="mb-2">
                <Pressable
                  onPress={() => handleSend(name)}
                  onLongPress={() => handleSend(name, 5)}
                  className="flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3"
                  accessibilityRole="button"
                  accessibilityLabel={`Test ${name}`}
                >
                  <Text className="text-sm text-text-primary capitalize">{name}</Text>
                  <Text className="text-xs capitalize" style={{ color: statusColor(status) }}>
                    {status === 'idle' ? 'Tap to send' : status}
                  </Text>
                </Pressable>
                {detail ? (
                  <Text className="mt-1 px-4 text-xs text-text-muted">{detail}</Text>
                ) : null}
              </View>
            );
          })}
        </SettingsSection>

        <SettingsSection title="Tuning">
          <SettingRow label={`Repeat count: ${irRepeatCount}`}>
            <View className="flex-row gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable
                  key={n}
                  onPress={() => set({ irRepeatCount: n })}
                  className={`rounded-lg border px-3 py-1 ${
                    irRepeatCount === n
                      ? 'border-accent-cyan bg-accent-cyan/10'
                      : 'border-surface-border bg-surface'
                  }`}
                  accessibilityRole="button"
                  accessibilityLabel={`Repeat ${n}`}
                >
                  <Text
                    className={`text-sm ${
                      irRepeatCount === n ? 'text-accent-cyan' : 'text-text-primary'
                    }`}
                  >
                    {n}
                  </Text>
                </Pressable>
              ))}
            </View>
          </SettingRow>
          <SettingRow label={`Gap: ${irGapMs} ms`}>
            <View className="flex-row gap-2">
              {[20, 40, 60, 80, 120].map((ms) => (
                <Pressable
                  key={ms}
                  onPress={() => set({ irGapMs: ms })}
                  className={`rounded-lg border px-3 py-1 ${
                    irGapMs === ms
                      ? 'border-accent-cyan bg-accent-cyan/10'
                      : 'border-surface-border bg-surface'
                  }`}
                  accessibilityRole="button"
                  accessibilityLabel={`Gap ${ms} ms`}
                >
                  <Text
                    className={`text-sm ${
                      irGapMs === ms ? 'text-accent-cyan' : 'text-text-primary'
                    }`}
                  >
                    {ms}
                  </Text>
                </Pressable>
              ))}
            </View>
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Wizard">
          <SettingRow
            label="Find my TV"
            onPress={() => router.push('/settings/ir-profile?wizard=1' as any)}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
