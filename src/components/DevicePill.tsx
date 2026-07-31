import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { Label } from '@/theme/typography';

export function DevicePill({ onPress }: { onPress: () => void }) {
  const active = useDevicesStore((s) => (s.activeDeviceId ? s.paired[s.activeDeviceId] : null));
  const fsm = useConnectionStore((s) => s.state);

  const connected = fsm === 'ACTIVE';
  const error = fsm === 'ERROR_STATE';
  const dotColor = connected ? '#22D3EE' : error ? '#FF453A' : '#747B8A';

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
          borderColor: '#FF453A',
        }}
      />
      <Label style={{ color: '#F5F6FA', fontSize: 16 }}>{active?.name ?? 'No device'}</Label>
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
        <ChevronDown size={14} color="#B7BDCB" strokeWidth={2} />
      </View>
    </Pressable>
  );
}
