import { FrameCodec } from '../framing';
import { remote as pb } from '@/proto/bundle';

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function encodeFields(fields: pb.IRemoteMessage): Uint8Array {
  const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
  return FrameCodec.encode(payload);
}

const MESSAGES: pb.IRemoteMessage[] = [
  { remotePingRequest: { val1: 1 } },
  { remoteConfigure: { code1: 622 } },
  { remoteStart: { started: true } },
  { remoteSetVolumeLevel: { volumeMax: 20, volumeLevel: 9, volumeMuted: false, playerModel: 'X' } },
  { remoteKeyInject: { keyCode: 24, direction: pb.RemoteDirection.SHORT } },
  { remoteAppLinkLaunchRequest: { appLink: 'https://example.com/a' } },
  { remoteImeShowRequest: { remoteTextFieldStatus: { value: 'hi', start: 0, end: 2 } } },
  { remoteError: { value: true } },
];

describe('FrameCodec fuzz: random split points preserve messages', () => {
  it('seeded RNG, >=200 random splits decode identically', () => {
    const rand = mulberry32(0xbeef);
    const stream = new Uint8Array(
      MESSAGES.map(encodeFields).reduce<number[]>((acc, f) => [...acc, ...f], []),
    );
    const expected = MESSAGES.map((m) =>
      pb.RemoteMessage.encode(pb.RemoteMessage.create(m)).finish(),
    );

    const SPLITS = 200;
    for (let i = 0; i < SPLITS; i++) {
      const codec = new FrameCodec();
      const cut = 1 + Math.floor(rand() * (stream.length - 1));
      // 1.5-frame style: sometimes split into 3 chunks
      const got: Uint8Array[] = [];
      if (rand() < 0.5) {
        got.push(...codec.push(stream.slice(0, cut)));
        got.push(...codec.push(stream.slice(cut)));
      } else {
        const cut2 = cut + Math.floor(rand() * (stream.length - cut));
        got.push(...codec.push(stream.slice(0, cut)));
        got.push(...codec.push(stream.slice(cut, cut2)));
        got.push(...codec.push(stream.slice(cut2)));
      }
      expect(got).toHaveLength(expected.length);
      for (let j = 0; j < expected.length; j++) {
        expect(Array.from(got[j]!)).toEqual(Array.from(expected[j]!));
      }
    }
  });

  it('byte-at-a-time feed equals whole-buffer feed', () => {
    const stream = new Uint8Array(
      MESSAGES.map(encodeFields).reduce<number[]>((acc, f) => [...acc, ...f], []),
    );
    const whole = new FrameCodec().push(stream);
    const trickle = new FrameCodec();
    const out: Uint8Array[] = [];
    for (let i = 0; i < stream.length; i++) out.push(...trickle.push(stream.slice(i, i + 1)));
    expect(out).toHaveLength(whole.length);
    expect(out.map((b) => Array.from(b))).toEqual(whole.map((b) => Array.from(b)));
  });
});
