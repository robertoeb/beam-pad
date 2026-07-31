import { RemoteClient } from '@/protocol/RemoteClient';
import { useConnectionStore } from '@/stores/connection';
import { useDevicesStore } from '@/stores/devices';
import { useImeStore } from '@/stores/ime';
import { classify, ConnectError } from '@/protocol/errors';

type Connector = (deviceId: string) => Promise<void>;
let connector: Connector | null = null;
export const registerConnector = (c: Connector) => {
  connector = c;
};

let disconnectCurrent: () => void = () => {};
export const registerDisconnect = (d: () => void) => {
  disconnectCurrent = d;
};

export interface SwitchResult {
  ok: boolean;
  elapsedMs: number;
  error?: ConnectError;
}

const CONNECT_BUDGET_MS = 12_000;

let current: RemoteClient | null = null;
export function __testGetCurrent() {
  return current;
}
export function __testSetCurrent(val: RemoteClient | null) {
  current = val;
}
export const getActiveClient = () => current;

registerDisconnect(() => {
  current?.destroy();
  current = null;
});

registerConnector(async (deviceId) => {
  const device = useDevicesStore.getState().paired[deviceId];
  if (!device) throw new Error(`unknown device ${deviceId}`);
  const conn = useConnectionStore.getState();

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('timeout')), CONNECT_BUDGET_MS);
    current = new RemoteClient(device, {
      onState: (s, error) => {
        conn.setState(s, error);
        if (s === 'ACTIVE') {
          clearTimeout(timeout);
          resolve();
        }
        if (s === 'ERROR_STATE') {
          clearTimeout(timeout);
          reject(new Error(error?.detail ?? error?.message ?? 'error'));
        }
      },
      onTelemetry: (t) => useConnectionStore.getState().mergeTelemetry(t),
      onImeShow: (status) => useImeStore.getState().showField(status),
    });
    current.connect();
  });
});

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
    const err = classify(String(e), { phase: 'connect' });
    return { ok: false, elapsedMs: performance.now() - t0, error: err };
  }
}
