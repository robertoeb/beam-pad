import { View } from 'react-native';
import { useConnectionStore } from '@/stores/connection';
import { statusFor } from './ConnectionStatus';

export function ConnectionDot() {
  const state = useConnectionStore((s) => s.state);
  const { color } = statusFor(state);

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
