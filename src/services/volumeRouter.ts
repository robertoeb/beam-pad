import { IrBlaster } from '@/modules/expo-ir-blaster';
import { useSettingsStore } from '@/stores/settings';
import { useDevicesStore } from '@/stores/devices';
import { IR_PROFILES, encodeCommand, type IrProfile } from '@/ir/profiles';
import { getActiveClient } from './sessionManager';
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

export async function volumeCommand(name: Exclude<VolCmd, 'power'>) {
  const { volumeTarget, irAvailable } = useSettingsStore.getState();
  if (volumeTarget === 'ir' && irAvailable) {
    const result = await irSend(name);
    if (result.ok) return;
  }
  const client = getActiveClient();
  if (!client) return;
  client.keyPress(name === 'volUp' ? KEYS.volUp : name === 'volDown' ? KEYS.volDown : KEYS.mute);
}
