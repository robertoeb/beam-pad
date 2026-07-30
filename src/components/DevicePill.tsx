import { Pressable, Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';

export function DevicePill({ onPress }: { onPress: () => void }) {
  const active = useDevicesStore((s) => (s.activeDeviceId ? s.paired[s.activeDeviceId] : null));
  const fsm = useConnectionStore((s) => s.state);
  const dot =
    fsm === 'ACTIVE'
      ? 'bg-accent-cyan'
      : fsm === 'ERROR_STATE'
        ? 'border border-accent-red'
        : 'bg-text-muted';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 py-2"
      accessibilityRole="button"
      accessibilityLabel="Switch device"
    >
      <View className={`h-2 w-2 rounded-full ${dot}`} />
      <Text className="font-medium text-[15px] text-text-primary">
        {active?.name ?? 'No device'}
      </Text>
      <ChevronDown size={16} color="#A1A1AA" strokeWidth={1.5} />
    </Pressable>
  );
}
