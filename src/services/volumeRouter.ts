import { IrBlaster } from '@/modules/expo-ir-blaster';
import { useSettingsStore } from '@/stores/settings';
import { useCapabilitiesStore } from '@/stores/capabilities';
import { useDevicesStore } from '@/stores/devices';
import { IR_PROFILES, encodeCommand, type IrProfile } from '@/ir/profiles';
import { getActiveClient } from './session';
import { showToast } from '@/stores/toast';
import { KEYS } from '@/protocol/keycodes';

type VolCmd = 'volUp' | 'volDown' | 'mute' | 'power';
export type CommandName = keyof IrProfile['commands'];

export type IrResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'no-profile' | 'no-command' | 'freq-unsupported' | 'no-emitter' | 'transmit-failed';
      detail?: string;
    };

export function resolveProfile(deviceId?: string | null): IrProfile | null {
  const { irProfileId, irPerDevice } = useSettingsStore.getState();
  const activeId = deviceId ?? useDevicesStore.getState().activeDeviceId;
  const perDevice = activeId ? irPerDevice[activeId] : undefined;
  const id = perDevice ?? irProfileId;
  if (!id) return null;
  return IR_PROFILES.find((p) => p.id === id) ?? null;
}

export async function irSend(name: CommandName, opts?: { deviceId?: string }): Promise<IrResult> {
  const profile = resolveProfile(opts?.deviceId);
  if (!profile) return { ok: false, reason: 'no-profile' };
  const frame = encodeCommand(profile, name);
  if (!frame) return { ok: false, reason: 'no-command', detail: String(name) };
  const hasEmitter = await IrBlaster.hasIrEmitter();
  if (!hasEmitter) return { ok: false, reason: 'no-emitter' };
  const ranges = await IrBlaster.getCarrierFrequencyRanges();
  const supported = ranges.some((r) => frame.frequency >= r.min && frame.frequency <= r.max);
  if (!supported) return { ok: false, reason: 'freq-unsupported', detail: `${frame.frequency} Hz` };
  try {
    await IrBlaster.transmit(frame.frequency, frame.pattern);
  } catch (e: any) {
    return { ok: false, reason: 'transmit-failed', detail: e?.message ?? 'unknown' };
  }
  return { ok: true };
}

export function isIrAvailable(): boolean {
  // Capabilities store is the source of truth; fall back to the legacy
  // settings flag so older persisted/tests state keeps working.
  return (
    useCapabilitiesStore.getState().irAvailable ||
    (useSettingsStore.getState() as { irAvailable?: boolean }).irAvailable === true
  );
}

export async function volumeCommand(name: Exclude<VolCmd, 'power'>) {
  const { volumeTarget } = useSettingsStore.getState();
  if (volumeTarget === 'ir' && isIrAvailable()) {
    const result = await irSend(name);
    if (result.ok) return;
    // The user explicitly routed volume to IR: a silent fallback to network
    // hides real problems (no emitter, bad profile). Say why, once per
    // debounce window, then fall through to the network path below.
    if (!result.ok) {
      showToast(irFailureMessage(result));
    }
  }
  const client = getActiveClient();
  if (!client) return;
  client.keyPress(name === 'volUp' ? KEYS.volUp : name === 'volDown' ? KEYS.volDown : KEYS.mute);
}

function irFailureMessage(result: Extract<IrResult, { ok: false }>): string {
  switch (result.reason) {
    case 'no-profile':
      return 'No IR profile selected — using network volume';
    case 'no-command':
      return `IR profile lacks this button (${result.detail ?? 'unknown'}) — using network volume`;
    case 'no-emitter':
      return 'No IR emitter on this phone — using network volume';
    case 'freq-unsupported':
      return `TV needs an IR frequency this phone lacks (${result.detail ?? '?'}) — using network volume`;
    case 'transmit-failed':
      return 'IR transmit failed — using network volume';
  }
}
