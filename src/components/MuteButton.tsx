import { tokens } from '@/theme/tokens';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Volume2, VolumeX } from 'lucide-react-native';
import { haptic } from '@/lib/haptics';
import { useConnectionStore } from '@/stores/connection';
import { volumeCommand } from '@/services/volumeRouter';

export function MuteButton() {
  const muted = useConnectionStore((s) => s.volume?.muted ?? false);
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        haptic('light');
        volumeCommand('mute');
      }}
      accessibilityRole="button"
      accessibilityLabel="Mute"
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: pressed
          ? 'transparent'
          : muted
            ? 'rgba(34,211,238,0.45)'
            : 'rgba(255,255,255,0.08)',
        backgroundColor: pressed ? tokens.colors.accent.cyan : muted ? 'rgba(34,211,238,0.1)' : tokens.colors.surface.sunken,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: pressed ? 0.92 : 1 }],
      }}
    >
      {muted ? (
        <VolumeX size={20} strokeWidth={1.6} color={pressed ? tokens.colors.background : tokens.colors.accent.cyan} />
      ) : (
        <Volume2 size={20} strokeWidth={1.6} color={pressed ? tokens.colors.background : tokens.colors.text.primary} />
      )}
    </Pressable>
  );
}
