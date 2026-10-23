import { FrameCodec } from '../framing';
import { toB64, fromB64 } from '../bytes';
import { classify } from '../errors';
import { remote as pb } from '@/proto/bundle';

describe('codec edge branches', () => {
  it('fromB64 covers ==, =, and unpadded tails plus invalid chars', () => {
    // 1 byte -> 'xx==' tail, 2 bytes -> 'xxx=' tail, 3 bytes -> no padding.
    expect(Array.from(fromB64(toB64(new Uint8Array([0x41]))))).toEqual([0x41]);
    expect(Array.from(fromB64(toB64(new Uint8Array([0x41, 0x42]))))).toEqual([0x41, 0x42]);
    expect(Array.from(fromB64(toB64(new Uint8Array([0x41, 0x42, 0x43]))))).toEqual([
      0x41, 0x42, 0x43,
    ]);
    // 5 bytes exercises a second quantum with padding.
    const five = new Uint8Array([1, 2, 3, 4, 5]);
    expect(Array.from(fromB64(toB64(five)))).toEqual([1, 2, 3, 4, 5]);
    // Invalid alphabet chars decode as 0 without throwing.
    expect(() => fromB64('!!!!')).not.toThrow();
  });

  it('framing buffers a chunk ending mid-varint', () => {
    // 200-byte payload -> 2-byte varint length; split after the first prefix byte.
    const payload = new Uint8Array(200).fill(7);
    const framed = FrameCodec.encode(payload);
    expect(framed[0]! & 0x80).not.toBe(0);
    const codec = new FrameCodec();
    expect(codec.push(framed.slice(0, 1))).toEqual([]);
    const out = codec.push(framed.slice(1));
    expect(out).toHaveLength(1);
    expect(Array.from(out[0]!)).toEqual(Array.from(payload));
  });

  it('classify maps wifi-disabled to WIFI_OFF', () => {
    const err = classify('wifi disabled on phone', { phase: 'connect' });
    expect(err.code).toBe('WIFI_OFF');
  });

  it('round-trips a real protobuf payload through toB64/fromB64', () => {
    const payload = pb.RemoteMessage.encode(
      pb.RemoteMessage.create({ remotePingRequest: { val1: 9 } }),
    ).finish();
    const msg = pb.RemoteMessage.decode(fromB64(toB64(payload)));
    expect(msg.remotePingRequest?.val1).toBe(9);
  });
});
