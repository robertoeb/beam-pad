import { View } from 'react-native';
import { useConnectionStore } from '@/stores/connection';

export function ConnectionDot() {
  const state = useConnectionStore((s) => s.state);

  const color = state === 'ACTIVE' ? '#00E5FF' : state === 'ERROR_STATE' ? '#FF3B30' : '#52525B';

  const isError = state === 'ERROR_STATE';

  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: isError ? 'transparent' : color,
        borderWidth: isError ? 1 : 0,
        borderColor: '#FF3B30',
      }}
    />
  );
}
