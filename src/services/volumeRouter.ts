import { IrBlaster } from '@/modules/expo-ir-blaster';
import { useSettingsStore } from '@/stores/settings';
import { IR_PROFILES, encodeCommand, type IrProfile } from '@/ir/profiles';
import { getActiveClient } from './sessionManager';
import { KEYS } from '@/protocol/keycodes';

type VolCmd = 'volUp' | 'volDown' | 'mute' | 'power';
type CommandName = keyof IrProfile['commands'];

export async function irSend(name: CommandName): Promise<boolean> {
  const { irProfileId } = useSettingsStore.getState();
  const profile = IR_PROFILES.find((p) => p.id === irProfileId);
  if (!profile) return false;
  const frame = encodeCommand(profile, name);
  if (!frame) return false;
  const ranges = await IrBlaster.getCarrierFrequencyRanges();
  const ok = ranges.some((r) => frame.frequency >= r.min && frame.frequency <= r.max);
  if (!ok) return false;
  await IrBlaster.transmit(frame.frequency, frame.pattern);
  return true;
}

export async function volumeCommand(name: Exclude<VolCmd, 'power'>) {
  const { volumeTarget, irAvailable } = useSettingsStore.getState();
  if (volumeTarget === 'ir' && irAvailable && (await irSend(name))) return;
  const client = getActiveClient();
  if (!client) return;
  client.keyPress(name === 'volUp' ? KEYS.volUp : name === 'volDown' ? KEYS.volDown : KEYS.mute);
}
