import { useDevicesStore } from '@/stores/devices';

type Connector = (deviceId: string) => Promise<void>;
let connector: Connector | null = null;
export const registerConnector = (c: Connector) => { connector = c; };

let disconnectCurrent: () => void = () => {};
export const registerDisconnect = (d: () => void) => { disconnectCurrent = d; };

export interface SwitchResult {
  ok: boolean;
  elapsedMs: number;
  error?: string;
}

export async function switchTo(deviceId: string): Promise<SwitchResult> {
  const t0 = performance.now();
  const store = useDevicesStore.getState();
  if (store.activeDeviceId === deviceId) return { ok: true, elapsedMs: 0 };
  try {
    disconnectCurrent();
    store.setActive(deviceId);
    await connector?.(deviceId);
    return { ok: true, elapsedMs: performance.now() - t0 };
  } catch (e) {
    return { ok: false, elapsedMs: performance.now() - t0, error: String(e) };
  }
}
