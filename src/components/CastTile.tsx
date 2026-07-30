import { Pressable } from 'react-native';
import { Cast } from 'lucide-react-native';
import { useCastStore } from '@/stores/cast';
import { showCastDialog } from '@/services/cast';

export function CastTile() {
  const connected = useCastStore((s) => s.connected);
  const setCastSheet = useCastStore((s) => s.setCastSheet);

  const color = connected ? '#00E5FF' : '#FFFFFF';

  return (
    <Pressable
      onPress={() => showCastDialog()}
      onLongPress={() => {
        if (connected) setCastSheet(true);
      }}
      className="h-16 w-16 items-center justify-center rounded-2xl border border-surface-border bg-surface"
      accessibilityLabel={connected ? 'Cast connected' : 'Cast'}
      accessibilityRole="button"
      testID="cast-tile"
    >
      <Cast
        size={22}
        strokeWidth={1.5}
        color={color}
        testID={connected ? 'cast-icon-connected' : 'cast-icon-disconnected'}
      />
    </Pressable>
  );
}
