import brands from './brands.json';
import { encodeNec } from '../protocols/nec';
import { encodeNecx } from '../protocols/necx';
import { encodeRc5 } from '../protocols/rc5';
import { encodeRc6 } from '../protocols/rc6';
import { encodeSirc } from '../protocols/sirc';
import type { IrFrame, IrProtocol } from '../types';

export type IrProfile = (typeof brands)[number];
export const IR_PROFILES: IrProfile[] = brands;

export function encodeCommand(
  profile: IrProfile,
  name: keyof IrProfile['commands'],
): IrFrame | null {
  const command = profile.commands[name];
  if (command == null) return null;
  const p = profile.protocol as IrProtocol;
  if (p === 'nec') return encodeNec(profile.device, command);
  if (p === 'necx') return encodeNecx(profile.device, command);
  if (p === 'rc5') return encodeRc5(profile.device, command);
  if (p === 'rc6') return encodeRc6(0, profile.device, command);
  if (p.startsWith('sirc'))
    return encodeSirc(Number(p.slice(4)) as 12 | 15 | 20, profile.device, command);
  return null;
}
