import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';
import { usePairingStore } from '@/stores/pairing';
import { useImeStore } from '@/stores/ime';
import { useLayoutStore } from '@/stores/layout';
import { useCastStore } from '@/stores/cast';
import { useCapabilitiesStore } from '@/stores/capabilities';
import { useToastStore } from '@/stores/toast';

const registry = [
  useSettingsStore,
  useDevicesStore,
  useConnectionStore,
  usePairingStore,
  useImeStore,
  useLayoutStore,
  useCastStore,
  useCapabilitiesStore,
  useToastStore,
] as unknown as Array<{ setState: (s: any) => void; getInitialState: () => any }>;

export function resetAllStores() {
  for (const store of registry) {
    try {
      store.setState(store.getInitialState());
    } catch {
      // Ignore stores without snapshottable initial state.
    }
  }
}
