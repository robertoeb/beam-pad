/** Base64 ↔ Uint8Array, hex ↔ Uint8Array, concat. Pure JS (no Buffer). */

const _b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const _b64codes: number[] = new Array(256);
for (let i = 0; i < _b64chars.length; i++) _b64codes[_b64chars.charCodeAt(i)] = i;
_b64codes['='.charCodeAt(0)] = 0;

/** base64 string → Uint8Array */
export function fromB64(b64: string): Uint8Array {
  const inLen = b64.length;
  const outLen = (3 * inLen) / 4 - (b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0);
  const out = new Uint8Array(outLen | 0);
  let p = 0;
  for (let i = 0; i < inLen; i++) {
    const b = _b64codes[b64.charCodeAt(i)] ?? 0;
    switch (i % 4) {
      case 0:
        out[p] = ((b << 2) | ((_b64codes[b64.charCodeAt(i + 1)] ?? 0) >> 4)) & 0xff;
        p++;
        break;
      case 1:
        out[p] = (((_b64codes[b64.charCodeAt(i + 1)] ?? 0) & 0x0f) << 4) | ((_b64codes[b64.charCodeAt(i + 2)] ?? 0) >> 2);
        p++;
        break;
      case 2:
        out[p] = (((_b64codes[b64.charCodeAt(i + 2)] ?? 0) & 0x03) << 6) | (_b64codes[b64.charCodeAt(i + 3)] ?? 0);
        p++;
        break;
    }
  }
  return out;
}

/** Uint8Array → base64 string */
export function toB64(buf: Uint8Array): string {
  let b64 = '';
  for (let i = 0; i < buf.length; i += 3) {
    const byte1 = buf[i]!;
    const byte2 = buf[i + 1] ?? 0;
    const byte3 = buf[i + 2] ?? 0;
    b64 += _b64chars[byte1 >> 2];
    b64 += _b64chars[((byte1 & 3) << 4) | (byte2 >> 4)];
    b64 += i + 1 < buf.length ? _b64chars[((byte2 & 15) << 2) | (byte3 >> 6)] : '=';
    b64 += i + 2 < buf.length ? _b64chars[byte3 & 63] : '=';
  }
  return b64;
}

/** hex string (no 0x prefix) → Uint8Array */
export function hexToBytes(hex: string): Uint8Array {
  const len = hex.length;
  const out = new Uint8Array(len / 2);
  for (let i = 0; i < len; i += 2) {
    out[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return out;
}

/** Uint8Array → lowercase hex string */
export function bytesToHex(buf: Uint8Array): string {
  const hex: string[] = [];
  for (let i = 0; i < buf.length; i++) {
    hex.push(buf[i]!.toString(16).padStart(2, '0'));
  }
  return hex.join('');
}

/** Concat multiple Uint8Arrays into one */
export function concatBytes(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}
