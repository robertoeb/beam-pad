import { View, Text, Pressable } from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import { Sheet } from './Sheet';
import { useCastStore } from '@/stores/cast';
import { castPlayPause, castStop } from '@/services/cast';

export function CastSheet() {
  const open = useCastStore((s) => s.castSheetOpen);
  const deviceName = useCastStore((s) => s.deviceName);
  const mediaTitle = useCastStore((s) => s.mediaTitle);
  const mediaStatus = useCastStore((s) => s.mediaStatus);
  const setCastSheet = useCastStore((s) => s.setCastSheet);

  const close = () => setCastSheet(false);

  const handleStop = async () => {
    await castStop();
    close();
  };

  if (!open) return null;

  return (
    <Sheet open={open} onClose={close} testID="cast-sheet">
      <View className="px-5 pb-8 pt-2">
        <Text
          className="mb-1 text-center font-semibold text-lg text-text-primary"
          testID="cast-device-name"
        >
          {deviceName ?? 'Cast Device'}
        </Text>
        {mediaTitle ? (
          <Text
            className="mb-4 text-center text-sm text-text-secondary"
            numberOfLines={1}
            testID="cast-media-title"
          >
            {mediaTitle}
          </Text>
        ) : (
          <View className="mb-4" />
        )}

        <View className="mb-4 flex-row items-center justify-center gap-6">
          <Pressable
            onPress={castPlayPause}
            className="h-14 w-14 items-center justify-center rounded-full border border-surface-border bg-surface"
            accessibilityLabel={mediaStatus === 'playing' ? 'Pause' : 'Play'}
            accessibilityRole="button"
            testID="cast-play-pause"
          >
            {mediaStatus === 'playing' ? (
              <Pause size={24} strokeWidth={1.5} color="#00E5FF" />
            ) : (
              <Play size={24} strokeWidth={1.5} color="#00E5FF" />
            )}
          </Pressable>

          <Pressable
            onPress={handleStop}
            className="h-14 w-14 items-center justify-center rounded-full border border-surface-border bg-surface"
            accessibilityLabel="Stop and disconnect"
            accessibilityRole="button"
            testID="cast-stop"
          >
            <X size={24} strokeWidth={1.5} color="#FF3B30" />
          </Pressable>
        </View>

        <Text className="text-center text-xs text-text-muted">
          Volume controls cast device via TV volume keys
        </Text>
      </View>
    </Sheet>
  );
}
