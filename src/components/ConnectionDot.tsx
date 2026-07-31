import { View } from 'react-native';
import { useConnectionStore } from '@/stores/connection';

export function ConnectionDot() {
  const state = useConnectionStore((s) => s.state);

  const color = state === 'ACTIVE' ? '#22D3EE' : state === 'ERROR_STATE' ? '#FF453A' : '#747B8A';

  const isError = state === 'ERROR_STATE';

  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: isError ? 'transparent' : color,
        borderWidth: isError ? 1 : 0,
        borderColor: '#FF453A',
      }}
    />
  );
}
