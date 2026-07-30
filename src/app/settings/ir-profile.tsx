import { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { IR_PROFILES, type IrProfile } from '@/ir/profiles';
import { irSend } from '@/services/volumeRouter';
import { tokens } from '@/theme/tokens';

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
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <View className="flex-row items-center gap-3 px-5 py-3">
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Back"
            accessibilityRole="button"
          >
            <ArrowLeft size={22} color={tokens.colors.text.primary} />
          </Pressable>
          <Text className="font-semibold text-lg text-text-primary">Find my TV</Text>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          {currentProfile ? (
            <>
              <Text className="mb-2 text-center text-2xl font-semibold text-text-primary">
                {currentProfile.brand}
              </Text>
              <Text className="mb-8 text-center text-sm text-text-secondary">
                Trying {currentProfile.protocol.toUpperCase()} — did your TV respond?
              </Text>
              <Pressable
                onPress={handleWizardNext}
                className="mb-4 w-full items-center rounded-xl border border-accent-cyan bg-accent-cyan/10 py-4"
                accessibilityRole="button"
                accessibilityLabel="Send power"
              >
                <Text className="font-semibold text-accent-cyan">Send Power</Text>
              </Pressable>
              {wizardPinned && (
                <Pressable
                  onPress={handleWizardItWorked}
                  className="w-full items-center rounded-xl bg-accent-cyan py-4"
                  accessibilityRole="button"
                  accessibilityLabel="It worked"
                >
                  <Text className="font-semibold text-background">It worked!</Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => {
                  setWizardPinned(null);
                  setWizardIndex((i) => Math.min(i + 1, IR_PROFILES.length - 1));
                }}
                className="mt-4"
                accessibilityRole="button"
                accessibilityLabel="No, try next"
              >
                <Text className="text-sm text-text-muted">No, try next</Text>
              </Pressable>
            </>
          ) : (
            <Text className="text-text-muted">No more profiles to try.</Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

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
        <Text className="font-semibold text-lg text-text-primary">IR Device Profile</Text>
      </View>

      <View className="mx-5 mb-3 flex-row items-center gap-2 rounded-xl border border-surface-border bg-surface px-3 py-2">
        <Search size={16} color={tokens.colors.text.secondary} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search brand, type, protocol…"
          placeholderTextColor={tokens.colors.text.secondary}
          className="flex-1 text-sm text-text-primary"
          autoCapitalize="none"
        />
      </View>

      <ScrollView className="flex-1 px-5">
        {Object.entries(groupedProfiles).map(([type, profiles]) => (
          <View key={type} className="mb-4">
            <Text className="mb-2 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
              {type}
            </Text>
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
                  className="mb-1 flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3"
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${profile.brand}`}
                >
                  <View className="flex-1 flex-row items-center gap-3">
                    <View className="flex-1">
                      <Text className="font-medium text-sm text-text-primary">
                        {profile.brand}
                      </Text>
                      <Text className="text-xs text-text-muted">
                        {profile.protocol.toUpperCase()}
                      </Text>
                    </View>
                    {profile.verified && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: tokens.colors.accent.green,
                        }}
                      />
                    )}
                  </View>
                  {isSelected && <Check size={18} color={tokens.colors.accent.cyan} />}
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
