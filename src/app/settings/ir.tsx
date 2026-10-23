import { useState, useMemo } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { type IrProfile } from '@/ir/profiles';
import { irSend, resolveProfile, type IrResult } from '@/services/volumeRouter';
import { IrBlaster } from '@/modules/expo-ir-blaster';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { SettingRow } from '@/components/settings/SettingRow';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Label } from '@/theme/typography';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { radius } from '@/theme/tokens';

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
    if (s === 'sent') return '#22D3EE';
    if (s === 'unsupported') return '#747B8A';
    if (s === 'failed') return '#FF453A';
    return '#B7BDCB';
  };

  return (
    <Screen>
      <ScreenHeader title="IR Studio" subtitle="Blast IR to your hardware" back />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Capability">
          <SettingRow label="IR Blaster" value={irAvailable ? 'Available' : 'Not available'} />
          {ranges.length > 0 && (
            <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {ranges.map((r, i) => (
                <View
                  key={i}
                  style={{
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.07)',
                    backgroundColor: '#13131E',
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                  }}
                >
                  <Label style={{ color: '#B7BDCB', fontSize: 11 }}>
                    {Math.round(r.min / 1000)}-{Math.round(r.max / 1000)} kHz
                  </Label>
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
            <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#34D399',
                }}
              />
              <Label style={{ color: '#B7BDCB', fontSize: 11 }}>Verified</Label>
            </View>
          )}
        </SettingsSection>

        <SettingsSection title="Command Matrix">
          {commands.length === 0 && (
            <Label style={{ color: '#747B8A' }}>Select a profile to test commands.</Label>
          )}
          {commands.map((name) => {
            const status = rowStatuses[name] ?? 'idle';
            const detail = rowDetails[name];
            return (
              <View key={name} style={{ marginBottom: 8 }}>
                <Pressable
                  onPress={() => handleSend(name)}
                  onLongPress={() => handleSend(name, 5)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: radius.xl,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.07)',
                    backgroundColor: 'rgba(19,19,30,0.8)',
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                    overflow: 'hidden',
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Test ${name}`}
                >
                  {status === 'sent' && (
                    <Gradient
                      colors={BRAND_GRADIENT}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      opacity={0.1}
                    />
                  )}
                  <Label style={{ color: '#F5F6FA', textTransform: 'capitalize' }}>{name}</Label>
                  <Label
                    style={{
                      color: statusColor(status),
                      fontSize: 11,
                      textTransform: 'capitalize',
                    }}
                  >
                    {status === 'idle' ? 'Tap to send' : status}
                  </Label>
                </Pressable>
                {detail ? (
                  <Label
                    style={{ marginTop: 4, paddingHorizontal: 16, color: '#747B8A', fontSize: 11 }}
                  >
                    {detail}
                  </Label>
                ) : null}
              </View>
            );
          })}
        </SettingsSection>

        <SettingsSection title="Tuning">
          <SettingRow label={`Repeat count: ${irRepeatCount}`} stack>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => {
                const selected = irRepeatCount === n;
                return (
                  <Pressable
                    key={n}
                    onPress={() => set({ irRepeatCount: n })}
                    style={{
                      flex: 1,
                      borderRadius: radius.lg,
                      borderWidth: 1,
                      borderColor: selected ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.07)',
                      backgroundColor: selected ? 'rgba(34,211,238,0.12)' : '#13131E',
                      paddingVertical: 8,
                      alignItems: 'center',
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Repeat ${n}`}
                  >
                    <Label style={{ color: selected ? '#22D3EE' : '#F5F6FA' }}>{n}</Label>
                  </Pressable>
                );
              })}
            </View>
          </SettingRow>
          <SettingRow label={`Gap: ${irGapMs} ms`} stack>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[20, 40, 60, 80, 120].map((ms) => {
                const selected = irGapMs === ms;
                return (
                  <Pressable
                    key={ms}
                    onPress={() => set({ irGapMs: ms })}
                    style={{
                      flex: 1,
                      borderRadius: radius.lg,
                      borderWidth: 1,
                      borderColor: selected ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.07)',
                      backgroundColor: selected ? 'rgba(34,211,238,0.12)' : '#13131E',
                      paddingVertical: 8,
                      alignItems: 'center',
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Gap ${ms} ms`}
                  >
                    <Label style={{ color: selected ? '#22D3EE' : '#F5F6FA' }}>{ms}</Label>
                  </Pressable>
                );
              })}
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
    </Screen>
  );
}
