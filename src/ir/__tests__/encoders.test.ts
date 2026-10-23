import { encodeNec } from '../protocols/nec';
import { encodeNecx } from '../protocols/necx';
import { encodeRc5, __resetRc5Toggle } from '../protocols/rc5';
import { encodeRc6 } from '../protocols/rc6';
import { encodeSirc } from '../protocols/sirc';

beforeEach(() => {
  __resetRc5Toggle();
});

describe('NEC encoder', () => {
  it('encodes NEC(0x04, 0x08) — LG power — golden vector', () => {
    const frame = encodeNec(0x04, 0x08);
    expect(frame.frequency).toBe(38028);
    expect(frame.pattern).toEqual([
      9000, 4500, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 1686, 562, 562, 562, 562,
      562, 1686, 562, 1686, 562, 1686, 562, 1686, 562, 1686, 562, 562, 562, 1686, 562, 1686, 562,
      562, 562, 562, 562, 562, 562, 562, 562, 1686, 562, 562, 562, 562, 562, 562, 562, 1686, 562,
      1686, 562, 1686, 562, 1686, 562, 562, 562, 1686, 562, 1686, 562, 1686, 562,
    ]);
    expect(frame.pattern.length).toBe(67);
    expect(frame.pattern[0]).toBe(9000);
    expect(frame.pattern[1]).toBe(4500);
    expect(frame.pattern[2]).toBe(562);
    expect(frame.pattern[3]).toBe(562);
  });
});

describe('NECx encoder', () => {
  it('encodes NECx(0x07, 0x02) — Samsung power — golden vector', () => {
    const frame = encodeNecx(0x07, 0x02);
    expect(frame.frequency).toBe(38028);
    expect(frame.pattern).toEqual([
      9000, 4500, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 1686, 562, 1686, 562, 1686,
      562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 1686, 562, 1686, 562, 1686, 562, 562,
      562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 562, 1686, 562, 562, 562, 1686, 562, 1686,
      562, 1686, 562, 1686, 562, 1686, 562, 1686, 562, 562, 562, 1686, 562,
    ]);
    expect(frame.pattern.length).toBe(67);
  });

  it('address byte is repeated (not inverted)', () => {
    const frame = encodeNecx(0x07, 0x02);
    const bytes = [0x07, 0x07, 0x02, 0xfd];
    const expected: number[] = [9000, 4500];
    for (const byte of bytes) {
      for (let i = 7; i >= 0; i--) {
        expected.push(562, (byte >> i) & 1 ? 1686 : 562);
      }
    }
    expected.push(562);
    expect(frame.pattern).toEqual(expected);
  });
});

describe('RC5 encoder', () => {
  it('encodes RC5(addr 0, cmd 12) — toggle=0 — golden vector', () => {
    const frame = encodeRc5(0, 12);
    expect(frame.frequency).toBe(36000);
    expect(frame.pattern).toEqual([
      889, 889, 889, 1778, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889,
      1778, 889, 889, 1778, 889, 889, 889,
    ]);
    expect(frame.pattern.length).toBe(25);
  });

  it('toggle bit alternates across calls', () => {
    const frame1 = encodeRc5(0, 12);
    const frame2 = encodeRc5(0, 12);
    expect(frame1.pattern).not.toEqual(frame2.pattern);
    expect(frame2.pattern).toEqual([
      889, 889, 889, 889, 889, 1778, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889, 889,
      1778, 889, 889, 1778, 889, 889, 889,
    ]);
  });

  it('pattern starts with mark (odd length means starts with mark)', () => {
    const frame = encodeRc5(0, 12);
    expect(frame.pattern.length % 2).toBe(1);
  });
});

describe('RC6 encoder', () => {
  it('encodes RC6(mode 0, addr 0, cmd 12) — golden vector', () => {
    const frame = encodeRc6(0, 0, 12);
    expect(frame.frequency).toBe(36000);
    expect(frame.pattern).toEqual([
      2666, 1333, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 888, 888, 444,
      444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 444, 888, 444, 444, 888, 444,
      444, 444, 2664,
    ]);
    expect(frame.pattern[0]).toBe(2666);
    expect(frame.pattern[1]).toBe(889 + 444);
  });

  it('has double-width trailer bit (888 = 2*444)', () => {
    const frame = encodeRc6(0, 0, 12);
    expect(frame.pattern).toContain(888);
  });
});

describe('SIRC encoder', () => {
  it('encodes SIRC12(addr 1, cmd 21) — Sony power — golden vector', () => {
    const frame = encodeSirc(12, 1, 21);
    expect(frame.frequency).toBe(40000);
    expect(frame.pattern).toEqual([
      2400, 600, 600, 600, 600, 600, 1200, 600, 600, 600, 1200, 600, 600, 600, 1200, 600, 600, 600,
      600, 600, 600, 600, 600, 600, 1200, 600,
    ]);
    expect(frame.pattern.length).toBe(26);
    expect(frame.pattern[0]).toBe(2400);
    expect(frame.pattern[1]).toBe(600);
  });

  it('encodes SIRC15 with 8-bit address', () => {
    const frame = encodeSirc(15, 1, 21);
    expect(frame.pattern.length).toBe(2 + 15 * 2);
  });

  it('encodes SIRC20 with extended address', () => {
    const frame = encodeSirc(20, 1, 21);
    expect(frame.pattern.length).toBe(2 + 20 * 2);
  });
});
