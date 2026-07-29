import { AtvDiscovery, type DiscoveryEvent } from '@/modules/expo-atv-discovery';
import { useDevicesStore } from '@/stores/devices';

let sub: { remove(): void } | null = null;

export function startDiscovery() {
  const store = useDevicesStore.getState();
  store.clearFound();
  sub?.remove();
  sub = AtvDiscovery.onEvent((e: DiscoveryEvent) => {
    const s = useDevicesStore.getState();
    if (e.type === 'resolved' && e.host) {
      s.upsertFound({
        name: e.name,
        host: e.host,
        port: e.port ?? 6466,
        txt: e.txt ?? {},
        lastSeen: Date.now(),
      });
    } else if (e.type === 'lost') {
      const match = Object.values(s.found).find((d) => d.name === e.name);
      if (match) s.removeFound(match.host);
    }
  });
  AtvDiscovery.startDiscovery().catch(() => {});
}

export function stopDiscovery() {
  sub?.remove();
  sub = null;
  AtvDiscovery.stopDiscovery();
}
