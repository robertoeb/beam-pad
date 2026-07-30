import { Pressable, Text, View } from 'react-native';
import { Plus, Minus, VolumeX, Wifi, Rss } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RemoteButton } from './RemoteButton';
import { useConnectionStore } from '@/stores/connection';
import { useSettingsStore } from '@/stores/settings';
import { volumeCommand } from '@/services/volumeRouter';

export function VolumeRail() {
  const volume = useConnectionStore((s) => s.volume);
  const volumeTarget = useSettingsStore((s) => s.volumeTarget);
  const setVolumeTarget = useSettingsStore((s) => s.setVolumeTarget);
  const irAvailable = useSettingsStore((s) => s.irAvailable);

  const level = volume ? volume.level : 0;
  const max = volume ? volume.max : 100;
  const fillRatio = max > 0 ? Math.min(level / max, 1) : 0;

  const fillStyle = useAnimatedStyle(() => ({
    height: withTiming(`${fillRatio * 100}%` as any, { duration: 200 }),
  }));

  const isTvOS = volumeTarget === 'tv-os';

  const toggleTarget = () => {
    if (!isTvOS || irAvailable) {
      setVolumeTarget(isTvOS ? 'ir' : 'tv-os');
    }
  };

  return (
    <View style={{ position: 'absolute', right: 16, bottom: 120 }} className="items-center">
      <Pressable
        onPress={toggleTarget}
        className="mb-2 flex-row items-center gap-1 rounded-full border border-surface-border bg-surface px-2 py-1"
        accessibilityLabel="Toggle volume routing"
        accessibilityRole="button"
      >
        {isTvOS ? <Wifi size={12} color="#00E5FF" /> : <Rss size={12} color="#00E5FF" />}
        <Text className="font-medium text-[11px] text-accent-cyan">{isTvOS ? 'TV' : 'IR'}</Text>
      </Pressable>

      <View
        style={{
          width: 56,
          borderRadius: 28,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: '#0C0C0E',
        }}
        className="items-center"
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,229,255,0.15)',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            height: `${fillRatio * 100}%`,
          }}
        />

        <RemoteButton
          round
          repeat
          size={44}
          icon={Plus}
          accessibilityLabel="Volume up"
          testID="vol-up"
          onPress={() => volumeCommand('volUp')}
        />
        <RemoteButton
          round
          size={44}
          icon={VolumeX}
          accessibilityLabel="Mute"
          testID="vol-mute"
          onPress={() => volumeCommand('mute')}
        />
        <RemoteButton
          round
          repeat
          size={44}
          icon={Minus}
          accessibilityLabel="Volume down"
          testID="vol-down"
          onPress={() => volumeCommand('volDown')}
        />
      </View>
    </View>
  );
}
