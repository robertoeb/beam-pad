import { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Wifi, Rss, Check, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSettingsStore } from '@/stores/settings';
import { IR_PROFILES, type IrProfile } from '@/ir/profiles';
import { irSend } from '@/services/volumeRouter';

const TEST_COMMANDS: { name: keyof IrProfile['commands']; label: string }[] = [
  { name: 'power', label: 'Power' },
  { name: 'volUp', label: 'Vol+' },
  { name: 'volDown', label: 'Vol-' },
  { name: 'mute', label: 'Mute' },
];

export default function SettingsScreen() {
  const volumeTarget = useSettingsStore((s) => s.volumeTarget);
  const irProfileId = useSettingsStore((s) => s.irProfileId);
  const irAvailable = useSettingsStore((s) => s.irAvailable);
  const haptics = useSettingsStore((s) => s.haptics);
  const powerKeyMode = useSettingsStore((s) => s.powerKeyMode);
  const set = useSettingsStore((s) => s.set);
  const setVolumeTarget = useSettingsStore((s) => s.setVolumeTarget);

  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  const selectedProfile = useMemo(
    () => IR_PROFILES.find((p) => p.id === irProfileId) ?? null,
    [irProfileId],
  );

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

  const handleTestCommand = async (name: keyof IrProfile['commands']) => {
    setTestResult(null);
    const ok = await irSend(name);
    setTestResult(ok ? `${name} sent` : `${name} failed`);
  };

  if (showProfilePicker) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <View className="flex-row items-center gap-3 px-5 py-3">
          <Pressable
            onPress={() => {
              setShowProfilePicker(false);
              setSearchQuery('');
            }}
            accessibilityLabel="Back"
            accessibilityRole="button"
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </Pressable>
          <Text className="font-semibold text-lg text-white">IR Device Profile</Text>
        </View>

        <View className="mx-5 mb-3 flex-row items-center gap-2 rounded-xl border border-surface-border bg-surface px-3 py-2">
          <Search size={16} color="#A1A1AA" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search brand, type, protocol…"
            placeholderTextColor="#A1A1AA"
            className="flex-1 text-sm text-white"
            autoCapitalize="none"
          />
        </View>

        <ScrollView className="flex-1 px-5">
          {Object.entries(groupedProfiles).map(([type, profiles]) => (
            <View key={type} className="mb-4">
              <Text className="mb-2 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
                {type}
              </Text>
              {profiles.map((profile) => (
                <Pressable
                  key={profile.id}
                  onPress={() => {
                    set({ irProfileId: profile.id });
                    setShowProfilePicker(false);
                    setSearchQuery('');
                  }}
                  className="mb-1 flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3"
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${profile.brand}`}
                >
                  <View className="flex-1 flex-row items-center gap-3">
                    <View className="flex-1">
                      <Text className="font-medium text-sm text-white">{profile.brand}</Text>
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
                          backgroundColor: '#34C759',
                        }}
                      />
                    )}
                  </View>
                  {irProfileId === profile.id && <Check size={18} color="#00E5FF" />}
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
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
          <ArrowLeft size={22} color="#FFFFFF" />
        </Pressable>
        <Text className="font-semibold text-lg text-white">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
          Volume Control
        </Text>
        <View className="mb-6 flex-row gap-2">
          <TargetButton
            label="TV (Wi-Fi)"
            icon={Wifi}
            selected={volumeTarget === 'tv-os'}
            onPress={() => setVolumeTarget('tv-os')}
          />
          <TargetButton
            label="Hardware (IR)"
            icon={Rss}
            selected={volumeTarget === 'ir'}
            disabled={!irAvailable}
            onPress={() => irAvailable && setVolumeTarget('ir')}
          />
        </View>
        {!irAvailable && (
          <Text className="mb-4 text-xs text-text-muted">No IR blaster on this phone</Text>
        )}

        <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
          IR Device Profile
        </Text>
        <Pressable
          onPress={() => setShowProfilePicker(true)}
          className="mb-6 flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3"
          accessibilityRole="button"
          accessibilityLabel="Select IR profile"
        >
          <Text className="text-sm text-white">
            {selectedProfile ? selectedProfile.brand : 'None selected'}
          </Text>
          {selectedProfile && (
            <View className="flex-row items-center gap-2">
              <Text className="text-xs text-text-muted">
                {selectedProfile.protocol.toUpperCase()}
              </Text>
              {selectedProfile.verified && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#34C759',
                  }}
                />
              )}
            </View>
          )}
        </Pressable>

        {selectedProfile && irAvailable && (
          <>
            <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
              Test IR Commands
            </Text>
            <View className="mb-6 flex-row gap-2">
              {TEST_COMMANDS.map(({ name, label }) => (
                <Pressable
                  key={name}
                  onPress={() => handleTestCommand(name)}
                  className="flex-1 items-center rounded-xl border border-surface-border bg-surface py-3"
                  accessibilityRole="button"
                  accessibilityLabel={`Test ${label}`}
                >
                  <Text className="font-medium text-sm text-white">{label}</Text>
                </Pressable>
              ))}
            </View>
            {testResult && (
              <Text className="mb-4 text-center text-xs text-accent-cyan">{testResult}</Text>
            )}
          </>
        )}

        <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
          Power Button
        </Text>
        <View className="mb-6 flex-row gap-2">
          <ModeButton
            label="Toggle"
            selected={powerKeyMode === 'toggle'}
            onPress={() => set({ powerKeyMode: 'toggle' })}
          />
          <ModeButton
            label="Sleep/Wake"
            selected={powerKeyMode === 'sleep-wake'}
            onPress={() => set({ powerKeyMode: 'sleep-wake' })}
          />
        </View>

        <Text className="mb-3 font-medium text-[11px] uppercase tracking-[1.2px] text-text-muted">
          Haptics
        </Text>
        <Pressable
          onPress={() => set({ haptics: !haptics })}
          className="mb-8 flex-row items-center justify-between rounded-xl border border-surface-border bg-surface px-4 py-3"
          accessibilityRole="button"
          accessibilityLabel="Toggle haptics"
        >
          <Text className="text-sm text-white">Enable haptics</Text>
          <View
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              backgroundColor: haptics ? '#00E5FF' : 'rgba(255,255,255,0.12)',
              justifyContent: 'center',
              paddingHorizontal: 2,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                transform: [{ translateX: haptics ? 20 : 0 }],
              }}
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function TargetButton({
  label,
  icon: Icon,
  selected,
  disabled,
  onPress,
}: {
  label: string;
  icon: typeof Wifi;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
        selected
          ? 'border-accent-cyan bg-accent-cyan/10'
          : disabled
            ? 'border-surface-border bg-surface opacity-50'
            : 'border-surface-border bg-surface'
      }`}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Icon size={16} color={selected ? '#00E5FF' : '#FFFFFF'} />
      <Text className={`font-medium text-sm ${selected ? 'text-accent-cyan' : 'text-white'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function ModeButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center rounded-xl border py-3 ${
        selected ? 'border-accent-cyan bg-accent-cyan/10' : 'border-surface-border bg-surface'
      }`}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text className={`font-medium text-sm ${selected ? 'text-accent-cyan' : 'text-white'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
