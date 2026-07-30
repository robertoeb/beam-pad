import type { IrFrame } from '../types';

export function encodeSirc(variant: 12 | 15 | 20, address: number, command: number): IrFrame {
  const pattern: number[] = [2400, 600];

  let dataBits: number[] = [];
  for (let i = 6; i >= 0; i--) dataBits.push((command >> i) & 1);

  if (variant === 12) {
    for (let i = 4; i >= 0; i--) dataBits.push((address >> i) & 1);
  } else if (variant === 15) {
    for (let i = 7; i >= 0; i--) dataBits.push((address >> i) & 1);
  } else {
    const extAddr = (address >> 5) & 0xff;
    for (let i = 4; i >= 0; i--) dataBits.push((address >> i) & 1);
    for (let i = 7; i >= 0; i--) dataBits.push((extAddr >> i) & 1);
  }

  for (const b of dataBits) {
    pattern.push(b === 1 ? 1200 : 600, 600);
  }

  return { frequency: 40000, pattern };
}
