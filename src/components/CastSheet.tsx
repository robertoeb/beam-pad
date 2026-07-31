import { Pressable, View } from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import { Sheet } from './Sheet';
import { useCastStore } from '@/stores/cast';
import { castPlayPause, castStop } from '@/services/cast';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';
import { Label, Title } from '@/theme/typography';

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
      <View
        style={{ paddingHorizontal: 20, paddingBottom: 32, paddingTop: 4, alignItems: 'center' }}
      >
        <Title style={{ marginBottom: 4, textAlign: 'center' }} testID="cast-device-name">
          {deviceName ?? 'Cast Device'}
        </Title>
        {mediaTitle ? (
          <Label
            style={{ marginBottom: 16, textAlign: 'center', color: '#B7BDCB' }}
            numberOfLines={1}
            testID="cast-media-title"
          >
            {mediaTitle}
          </Label>
        ) : (
          <View style={{ marginBottom: 16 }} />
        )}

        <View
          style={{
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <Pressable
            onPress={castPlayPause}
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              borderWidth: 1,
              borderColor: 'rgba(34,211,238,0.4)',
              backgroundColor: '#15151F',
              overflow: 'hidden',
            }}
            accessibilityLabel={mediaStatus === 'playing' ? 'Pause' : 'Play'}
            accessibilityRole="button"
            testID="cast-play-pause"
          >
            <Gradient
              colors={BRAND_GRADIENT}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              opacity={0.25}
            />
            {mediaStatus === 'playing' ? (
              <Pause size={24} strokeWidth={1.6} color="#22D3EE" />
            ) : (
              <Play size={24} strokeWidth={1.6} color="#22D3EE" />
            )}
          </Pressable>

          <Pressable
            onPress={handleStop}
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              borderWidth: 1,
              borderColor: 'rgba(255,69,58,0.4)',
              backgroundColor: '#15151F',
            }}
            accessibilityLabel="Stop and disconnect"
            accessibilityRole="button"
            testID="cast-stop"
          >
            <X size={24} strokeWidth={1.6} color="#FF453A" />
          </Pressable>
        </View>

        <Label style={{ textAlign: 'center', color: '#747B8A', fontSize: 11 }}>
          Volume controls cast device via TV volume keys
        </Label>
      </View>
    </Sheet>
  );
}
