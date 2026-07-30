import type { IrFrame } from '../types';

const H = 889;
const toggleState = new Map<string, number>();

export function encodeRc5(address: number, command: number): IrFrame {
  const key = `${address}:${command}`;
  const toggle = toggleState.get(key) ?? 0;
  toggleState.set(key, toggle ^ 1);

  const bits = [1, 1, toggle];
  for (let i = 4; i >= 0; i--) bits.push((address >> i) & 1);
  for (let i = 5; i >= 0; i--) bits.push((command >> i) & 1);

  const pattern: number[] = [];
  const push = (mark: boolean, dur: number) => {
    const lastIsMark = pattern.length % 2 === 1;
    if (pattern.length > 0 && lastIsMark === mark) {
      pattern[pattern.length - 1]! += dur;
    } else {
      pattern.push(dur);
    }
  };

  for (const b of bits) {
    if (b === 1) {
      push(true, H);
      push(false, H);
    } else {
      push(false, H);
      push(true, H);
    }
  }

  return { frequency: 36000, pattern };
}

export function __resetRc5Toggle(): void {
  toggleState.clear();
}
