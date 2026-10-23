import { AtvDiscovery, type DiscoveryEvent } from '@/modules/expo-atv-discovery';
import { useDevicesStore } from '@/stores/devices';

const discoveryState: { sub: { remove(): void } | null } = { sub: null };

interface StartOptions {
  /** Clear the found list before scanning (initial scan). Pull-to-refresh keeps it. */
  clear?: boolean;
}

export function startDiscovery(options: StartOptions = {}) {
  const { clear = true } = options;
  const store = useDevicesStore.getState();
  if (clear) store.clearFound();
  store.setScanning(true);
  discoveryState.sub?.remove();
  discoveryState.sub = AtvDiscovery.onEvent((e: DiscoveryEvent) => {
    const s = useDevicesStore.getState();
    if (e.type === 'resolved' && e.host) {
      s.upsertFound({
        name: e.name,
        host: e.host,
        port: e.port ?? 6466,
        txt: e.txt ?? {},
        lastSeen: Date.now(),
      });
      s.setScanning(false);
    } else if (e.type === 'lost') {
      const match = Object.values(s.found).find((d) => d.name === e.name);
      if (match) s.removeFound(match.host);
    } else if (e.type === 'error') {
      s.setScanning(false);
    }
  });
  AtvDiscovery.startDiscovery().catch(() => {
    useDevicesStore.getState().setScanning(false);
  });
}

export function stopDiscovery() {
  discoveryState.sub?.remove();
  discoveryState.sub = null;
  AtvDiscovery.stopDiscovery();
  useDevicesStore.getState().setScanning(false);
}
