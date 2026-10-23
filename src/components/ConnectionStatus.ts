import type { ConnectionState } from '@/protocol/RemoteClient';

export interface ConnectionStatus {
  color: string;
  label: string;
  pulse: boolean;
}

const CONNECTED_COLOR = '#22D3EE';
const ERROR_COLOR = '#FF453A';
const IDLE_COLOR = '#747B8A';

/**
 * Single FSM→presentation mapping for connection state. Consumed by both
 * ConnectionDot and DevicePill so the colour/label behaviour lives in one
 * table. Visual sizes stay with the components; only the mapping is shared.
 */
export function statusFor(state: ConnectionState): ConnectionStatus {
  switch (state) {
    case 'ACTIVE':
      return { color: CONNECTED_COLOR, label: 'Connected', pulse: false };
    case 'ERROR_STATE':
      return { color: ERROR_COLOR, label: 'Connection error', pulse: false };
    case 'CONNECTING':
      return { color: IDLE_COLOR, label: 'Connecting…', pulse: true };
    case 'CONFIGURING':
      return { color: IDLE_COLOR, label: 'Connecting…', pulse: true };
    case 'RECONNECTING':
      return { color: IDLE_COLOR, label: 'Reconnecting…', pulse: true };
    case 'IDLE':
      return { color: IDLE_COLOR, label: 'Not connected', pulse: false };
  }
}
