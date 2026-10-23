import { tokens } from '@/theme/tokens';
import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { Label } from '@/theme/typography';
import { statusFor } from './ConnectionStatus';

export function DevicePill({ onPress }: { onPress: () => void }) {
  const active = useDevicesStore((s) => (s.activeDeviceId ? s.paired[s.activeDeviceId] : null));
  const fsm = useConnectionStore((s) => s.state);
  const { color: dotColor } = statusFor(fsm);

  const error = fsm === 'ERROR_STATE';

  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 }}
      accessibilityRole="button"
      accessibilityLabel="Switch device"
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: error ? 'transparent' : dotColor,
          borderWidth: error ? 1.5 : 0,
          borderColor: tokens.colors.accent.red,
        }}
      />
      <Label style={{ color: tokens.colors.text.primary, fontSize: 16 }}>{active?.name ?? 'No device'}</Label>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.06)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChevronDown size={14} color={tokens.colors.text.secondary} strokeWidth={2} />
      </View>
    </Pressable>
  );
}
