import { FrameCodec } from '../framing';

describe('FrameCodec', () => {
  describe('encode', () => {
    it('round-trips empty payload', () => {
      const empty = new Uint8Array(0);
      const framed = FrameCodec.encode(empty);
      const codec = new FrameCodec();
      expect(codec.push(framed)).toEqual([empty]);
    });

    it('round-trips single byte', () => {
      const payload = new Uint8Array([0x42]);
      const framed = FrameCodec.encode(payload);
      const codec = new FrameCodec();
      expect(codec.push(framed)).toEqual([payload]);
    });

    it('round-trips small payload', () => {
      const payload = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      const codec = new FrameCodec();
      expect(codec.push(FrameCodec.encode(payload))).toEqual([payload]);
    });

    it('round-trips large payload (>127 bytes)', () => {
      const payload = new Uint8Array(256);
      for (let i = 0; i < 256; i++) payload[i] = i;
      const codec = new FrameCodec();
      expect(codec.push(FrameCodec.encode(payload))).toEqual([payload]);
    });

    it('encodes varint prefix correctly for length 128', () => {
      const payload = new Uint8Array(128);
      const framed = FrameCodec.encode(payload);
      // 128 = 0x80 0x01 (two-byte varint)
      expect(framed[0]).toBe(0x80);
      expect(framed[1]).toBe(0x01);
      expect(framed.length).toBe(130);
    });

    it('encodes varint prefix correctly for length 300', () => {
      const payload = new Uint8Array(300);
      const framed = FrameCodec.encode(payload);
      // 300 = 0xac 0x02 (two-byte varint: 0xac = 172 = (300&0x7f)|0x80, 0x02 = 300>>7)
      expect(framed[0]).toBe(0xac);
      expect(framed[1]).toBe(0x02);
      expect(framed.length).toBe(302);
    });
  });

  describe('push', () => {
    it('reassembles split feed (1-byte drips)', () => {
      const payload = new Uint8Array([0xaa, 0xbb, 0xcc]);
      const framed = FrameCodec.encode(payload);
      const codec = new FrameCodec();
      const results: Uint8Array[] = [];
      for (let i = 0; i < framed.length; i++) {
        const chunk = framed.slice(i, i + 1);
        const frames = codec.push(chunk);
        results.push(...frames);
      }
      expect(results).toEqual([payload]);
    });

    it('emits two frames from one chunk', () => {
      const a = new Uint8Array([1, 2, 3]);
      const b = new Uint8Array([4, 5]);
      const chunk = new Uint8Array([...FrameCodec.encode(a), ...FrameCodec.encode(b)]);
      const codec = new FrameCodec();
      expect(codec.push(chunk)).toEqual([a, b]);
    });

    it('buffers incomplete varint', () => {
      const payload = new Uint8Array([0xaa, 0xbb]);
      const framed = FrameCodec.encode(payload);
      const codec = new FrameCodec();
      // Feed only the first byte of the varint prefix
      const partial = framed.slice(0, 1);
      expect(codec.push(partial)).toEqual([]);
      // Feed the rest
      const rest = framed.slice(1);
      expect(codec.push(rest)).toEqual([payload]);
    });

    it('buffers incomplete payload', () => {
      const payload = new Uint8Array([0xaa, 0xbb, 0xcc]);
      const framed = FrameCodec.encode(payload);
      const codec = new FrameCodec();
      // Feed varint + 2 bytes of 3
      const partial = framed.slice(0, framed.length - 1);
      expect(codec.push(partial)).toEqual([]);
      // Feed last byte
      const last = framed.slice(framed.length - 1);
      expect(codec.push(last)).toEqual([payload]);
    });

    it('throws on garbage varint (>5 bytes)', () => {
      const codec = new FrameCodec();
      // 6 continuation bytes (all with high bit set) — exceeds 28-bit shift limit
      const garbage = new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x80, 0x80]);
      expect(() => codec.push(garbage)).toThrow('varint too long');
    });
  });
});
