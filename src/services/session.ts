import { RemoteClient } from '@/protocol/RemoteClient';
import { useConnectionStore } from '@/stores/connection';
import { useDevicesStore } from '@/stores/devices';
import { useImeStore } from '@/stores/ime';
import { classify, type ConnectError } from '@/protocol/errors';

export interface SwitchResult {
  ok: boolean;
  elapsedMs: number;
  error?: ConnectError;
}

export const CONNECT_BUDGET_MS = 12_000;

const box: { current: RemoteClient | null } = { current: null };

export function getClient(): RemoteClient | null {
  return box.current;
}

/** Legacy alias of {@link getClient}. */
export function getActiveClient(): RemoteClient | null {
  return box.current;
}

function toConnectError(e: unknown): ConnectError {
  if (
    typeof e === 'object' &&
    e !== null &&
    'code' in e &&
    'message' in e &&
    'steps' in e
  ) {
    return e as ConnectError;
  }
  const message = e instanceof Error ? e.message : String(e);
  return classify(message, { phase: 'connect' });
}

function withBudget(promise: Promise<void>, host: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(classify(new Error('timeout'), { phase: 'connect', host }));
    }, CONNECT_BUDGET_MS);
    promise.then(
      () => {
        clearTimeout(timer);
        resolve();
      },
      (err: unknown) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/**
 * Connect to a paired device. Owns the single 12s timeout budget: resolves
 * when the client reaches ACTIVE, rejects with a ConnectError on native
 * failure, timeout, or destroy.
 */
export async function connect(deviceId: string): Promise<void> {
  const device = useDevicesStore.getState().paired[deviceId];
  if (!device) throw new Error(`unknown device ${deviceId}`);
  disconnect();
  const client = new RemoteClient(device, {
    onState: (s, error) => {
      useConnectionStore.getState().setState(s, error);
    },
    onTelemetry: (t) => useConnectionStore.getState().mergeTelemetry(t),
    onImeShow: (status) => useImeStore.getState().showField(status),
  });
  box.current = client;
  try {
    await withBudget(client.connect(), device.host);
  } catch (e) {
    if (box.current === client) {
      client.destroy();
      box.current = null;
    }
    throw e;
  }
}

export function disconnect(): void {
  box.current?.destroy();
  box.current = null;
}

export async function switchTo(deviceId: string): Promise<SwitchResult> {
  const t0 = performance.now();
  const store = useDevicesStore.getState();
  if (store.activeDeviceId === deviceId) return { ok: true, elapsedMs: 0 };
  try {
    disconnect();
    store.setActive(deviceId);
    await connect(deviceId);
    return { ok: true, elapsedMs: performance.now() - t0 };
  } catch (e) {
    return { ok: false, elapsedMs: performance.now() - t0, error: toConnectError(e) };
  }
}

/** Tear down the active client. Used by tests to reset session state. */
export function reset(): void {
  disconnect();
}

/** Single session facade. */
export const session = {
  get client(): RemoteClient | null {
    return box.current;
  },
  getClient,
  getActiveClient,
  connect,
  disconnect,
  switchTo,
  reset,
};
