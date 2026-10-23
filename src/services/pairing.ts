import { PairingProtocol, type PairingStep, type PairingResult } from '@/protocol/PairingProtocol';
import type { ConnectError } from '@/protocol/errors';

export type { PairingStep, PairingResult };

/**
 * Pairing facade: owns the single in-flight PairingProtocol so screens never
 * import `@/protocol/*` directly (mirrors how session.ts shields screens
 * from RemoteClient). The protocol instance holds sockets/timers and must
 * not live in a zustand store (non-serializable); UI step/error state stays
 * in the screen (or usePairingStore for step/error only).
 */
let current: PairingProtocol | null = null;

export function startPairing(host: string, onStep: (step: PairingStep, error?: ConnectError) => void): void {
  current?.cancel();
  current = null;
  const protocol = new PairingProtocol(host, { onStep });
  current = protocol;
  void protocol.start();
}

export function submitPairingCode(code: string): void {
  current?.submitCode(code);
}

export function cancelPairing(): void {
  current?.cancel();
  current = null;
}

/** Result of the finished handshake, or null while pairing / on empty PEMs. */
export function getPairingResult(): PairingResult | null {
  return current?.getResult() ?? null;
}

/** For tests: drop the in-flight instance without emitting steps. */
export function resetPairing(): void {
  current = null;
}
