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
// Generation token: bumped on every connect/disconnect. Stale losers (late
// callbacks, budget timers from a superseded switchTo) must never write
// stores, destroy the winner, or settle its promise.
let gen = 0;

function isCurrent(client: RemoteClient, myGen: number): boolean {
  return myGen === gen && box.current === client;
}

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

/**
 * Connect to a paired device. Guards:
 * - the 12s budget covers only the *initial* connect: once the client
 *   reports ACTIVE, recovery belongs to the reconnect ladder (which needs
 *   ~15.5s for a full 5-attempt cycle), so the budget timer is cancelled;
 * - a generation token mutes stale losers when two switchTo()s overlap.
 * Resolves when the client reaches ACTIVE, rejects with a ConnectError.
 */
export async function connect(deviceId: string): Promise<void> {
  const device = useDevicesStore.getState().paired[deviceId];
  if (!device) throw new Error(`unknown device ${deviceId}`);
  const myGen = ++gen;
  box.current?.destroy();
  box.current = null;
  useConnectionStore.getState().resetTelemetry();
  const client = new RemoteClient(device, {
    onState: (s, error) => {
      if (!isCurrent(client, myGen)) return;
      if (s === 'ACTIVE' && budget !== null) {
        clearTimeout(budget);
        budget = null;
      }
      useConnectionStore.getState().setState(s, error);
    },
    onTelemetry: (t) => {
      if (!isCurrent(client, myGen)) return;
      useConnectionStore.getState().mergeTelemetry(t);
    },
    onImeShow: (status) => {
      if (!isCurrent(client, myGen)) return;
      useImeStore.getState().showField(status);
    },
  });
  box.current = client;
  let budget: ReturnType<typeof setTimeout> | null = null;
  try {
    await new Promise<void>((resolve, reject) => {
      budget = setTimeout(() => {
        budget = null;
        if (!isCurrent(client, myGen)) {
          // Superseded by a newer connect: the winner owns the box.
          resolve();
          return;
        }
        box.current = null;
        client.destroy();
        reject(classify(new Error('timeout'), { phase: 'connect', host: device.host }));
      }, CONNECT_BUDGET_MS);
      client.connect().then(
        () => {
          if (budget !== null) {
            clearTimeout(budget);
            budget = null;
          }
          resolve();
        },
        (err: unknown) => {
          if (budget !== null) {
            clearTimeout(budget);
            budget = null;
          }
          reject(err);
        },
      );
    });
  } catch (e) {
    if (box.current === client) {
      client.destroy();
      box.current = null;
    }
    throw e;
  }
}

export function disconnect(): void {
  gen++;
  box.current?.destroy();
  box.current = null;
  const conn = useConnectionStore.getState();
  conn.resetTelemetry();
  conn.setState('IDLE');
}

export async function switchTo(deviceId: string): Promise<SwitchResult> {
  const t0 = performance.now();
  const previousId = useDevicesStore.getState().activeDeviceId;
  if (previousId === deviceId) return { ok: true, elapsedMs: 0 };
  try {
    // connect() owns teardown; activeDeviceId flips only on success so a
    // failed switch never strands the UI on an unreachable TV.
    await connect(deviceId);
    useDevicesStore.getState().setActive(deviceId);
    return { ok: true, elapsedMs: performance.now() - t0 };
  } catch (e) {
    useDevicesStore.getState().setActive(previousId);
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
