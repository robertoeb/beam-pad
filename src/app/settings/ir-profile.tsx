import { useState, useMemo } from 'react';
import { View, Pressable, ScrollView, TextInput } from 'react-native';
import { Search, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { IR_PROFILES, type IrProfile } from '@/ir/profiles';
import { irSend } from '@/services/volumeRouter';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label, Micro, Title } from '@/theme/typography';
import { space, radius } from '@/theme/tokens';

export default function IrProfileScreen() {
  const irProfileId = useSettingsStore((s) => s.irProfileId);
  const irPerDevice = useSettingsStore((s) => s.irPerDevice);
  const set = useSettingsStore((s) => s.set);
  const activeDeviceId = useDevicesStore((s) => s.activeDeviceId);

  const { wizard } = useLocalSearchParams<{ wizard?: string }>();
  const isWizard = wizard === '1';

  const [searchQuery, setSearchQuery] = useState('');
  const [wizardIndex, setWizardIndex] = useState(0);
  const [wizardPinned, setWizardPinned] = useState<string | null>(null);

  const filteredProfiles = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return IR_PROFILES;
    return IR_PROFILES.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) ||
        p.deviceType.toLowerCase().includes(q) ||
        p.protocol.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const groupedProfiles = useMemo(() => {
    const groups: Record<string, IrProfile[]> = {};
    for (const p of filteredProfiles) {
      if (!groups[p.deviceType]) groups[p.deviceType] = [];
      groups[p.deviceType]!.push(p);
    }
    return groups;
  }, [filteredProfiles]);

  const selectProfile = (id: string) => {
    if (activeDeviceId) {
      set({ irPerDevice: { ...irPerDevice, [activeDeviceId]: id }, irProfileId: id });
    } else {
      set({ irProfileId: id });
    }
  };

  const handleWizardNext = async () => {
    if (wizardIndex >= IR_PROFILES.length) return;
    const profile = IR_PROFILES[wizardIndex]!;
    await irSend('power', { deviceId: activeDeviceId ?? undefined });
    setWizardPinned(profile.id);
    selectProfile(profile.id);
  };

  const handleWizardItWorked = () => {
    if (wizardPinned) {
      selectProfile(wizardPinned);
    }
    router.back();
  };

  if (isWizard) {
    const currentProfile = IR_PROFILES[wizardIndex] ?? null;
    return (
      <Screen>
        <ScreenHeader title="Find my TV" back />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: space[8],
          }}
        >
          {currentProfile ? (
            <>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: 'rgba(139,140,248,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(139,140,248,0.25)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: space[5],
                  overflow: 'hidden',
                }}
              >
                <Gradient
                  colors={BRAND_GRADIENT}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  opacity={0.2}
                />
                <Title style={{ fontSize: 28, color: '#F5F6FA' }}>
                  {currentProfile.brand[0]?.toUpperCase() ?? 'T'}
                </Title>
              </View>
              <Title style={{ marginBottom: 8, textAlign: 'center' }}>{currentProfile.brand}</Title>
              <Label style={{ marginBottom: 32, textAlign: 'center', color: '#B7BDCB' }}>
                Trying {currentProfile.protocol.toUpperCase()} - did your TV respond?
              </Label>
              <Pressable
                onPress={handleWizardNext}
                style={{
                  marginBottom: 16,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: radius.xl,
                  borderWidth: 1,
                  borderColor: 'rgba(34,211,238,0.4)',
                  backgroundColor: 'rgba(34,211,238,0.1)',
                  paddingVertical: 16,
                  overflow: 'hidden',
                }}
                accessibilityRole="button"
                accessibilityLabel="Send power"
              >
                <Gradient
                  colors={BRAND_GRADIENT}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  opacity={0.08}
                />
                <Label style={{ color: '#22D3EE' }}>Send Power</Label>
              </Pressable>
              {wizardPinned && (
                <Pressable
                  onPress={handleWizardItWorked}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: radius.xl,
                    backgroundColor: '#22D3EE',
                    paddingVertical: 16,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="It worked"
                >
                  <Label style={{ color: '#000000', fontWeight: '600' }}>It worked!</Label>
                </Pressable>
              )}
              <Pressable
                onPress={() => {
                  setWizardPinned(null);
                  setWizardIndex((i) => Math.min(i + 1, IR_PROFILES.length - 1));
                }}
                style={{ marginTop: 16 }}
                accessibilityRole="button"
                accessibilityLabel="No, try next"
              >
                <Label style={{ color: '#747B8A' }}>No, try next</Label>
              </Pressable>
            </>
          ) : (
            <Label style={{ color: '#747B8A' }}>No more profiles to try.</Label>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader title="IR Device Profile" subtitle="Choose your TV brand" back />

      <View
        style={{
          marginHorizontal: space[5],
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.09)',
          backgroundColor: 'rgba(19,19,30,0.8)',
          paddingHorizontal: 14,
          paddingVertical: 11,
        }}
      >
        <Search size={16} color="#B7BDCB" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search brand, type, protocol…"
          placeholderTextColor="#747B8A"
          style={{ flex: 1, color: '#FFFFFF', fontSize: 14, fontFamily: 'Inter-Medium' }}
          autoCapitalize="none"
        />
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: space[5] }}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedProfiles).map(([type, profiles]) => (
          <View key={type} style={{ marginBottom: 16 }}>
            <Micro style={{ marginBottom: 8, color: '#747B8A' }}>{type}</Micro>
            {profiles.map((profile) => {
              const isSelected =
                (activeDeviceId ? irPerDevice[activeDeviceId] : irProfileId) === profile.id;
              return (
                <Pressable
                  key={profile.id}
                  onPress={() => {
                    selectProfile(profile.id);
                    router.back();
                  }}
                  style={{
                    marginBottom: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: radius.xl,
                    borderWidth: 1,
                    borderColor: isSelected ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.07)',
                    backgroundColor: isSelected ? 'rgba(34,211,238,0.07)' : 'rgba(19,19,30,0.8)',
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${profile.brand}`}
                >
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Label style={{ color: '#F5F6FA' }}>{profile.brand}</Label>
                      <Label style={{ color: '#747B8A', fontSize: 11 }}>
                        {profile.protocol.toUpperCase()}
                      </Label>
                    </View>
                    {profile.verified && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#34D399',
                        }}
                      />
                    )}
                  </View>
                  {isSelected && <Check size={18} color="#22D3EE" />}
                </Pressable>
              );
            })}
          </View>
        ))}
        <View style={{ height: space[10] }} />
      </ScrollView>
    </Screen>
  );
}
