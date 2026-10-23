import { Pressable } from 'react-native';
import { Cast } from 'lucide-react-native';
import { useCastStore } from '@/stores/cast';
import { showCastDialog } from '@/services/cast';
import { Gradient, BRAND_GRADIENT } from '@/theme/gradient';

export function CastTile({ size = 68 }: { size?: number }) {
  const connected = useCastStore((s) => s.connected);
  const setCastSheet = useCastStore((s) => s.setCastSheet);

  const active = connected;
  const color = active ? '#22D3EE' : '#747B8A';

  return (
    <Pressable
      onPress={() => showCastDialog()}
      onLongPress={() => {
        if (connected) setCastSheet(true);
      }}
      style={({ pressed }) => ({
        height: size,
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size / 3.4,
        borderWidth: 1,
        borderColor: active ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.05)',
        backgroundColor: active
          ? 'rgba(34,211,238,0.1)'
          : pressed
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.02)',
        opacity: active ? 1 : 0.7,
        overflow: 'hidden',
      })}
      accessibilityLabel={active ? 'Cast connected' : 'Cast (no device connected)'}
      accessibilityRole="button"
      testID="cast-tile"
    >
      {active ? (
        <Gradient
          colors={BRAND_GRADIENT}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          opacity={0.22}
        />
      ) : null}
      <Cast
        size={Math.round(size * 0.32)}
        strokeWidth={1.6}
        color={color}
        testID={connected ? 'cast-icon-connected' : 'cast-icon-disconnected'}
      />
    </Pressable>
  );
}
