/**
 * Varint length-prefix frame codec.
 *
 * Every message on the ATV pairing (6467) and command (6466) ports is a
 * protobuf payload prefixed with its byte-length encoded as a protobuf
 * varint.  Because TCP delivers arbitrary chunks we buffer until a complete
 * frame is available.
 */

export class FrameCodec {
  private buf: Uint8Array = new Uint8Array(0);

  /** Encode a protobuf payload with a varint length prefix. */
  static encode(payload: Uint8Array): Uint8Array {
    const len = payload.length;
    const prefix: number[] = [];
    let v = len;
    while (v > 0x7f) {
      prefix.push((v & 0x7f) | 0x80);
      v >>>= 7;
    }
    prefix.push(v);
    const out = new Uint8Array(prefix.length + len);
    out.set(prefix, 0);
    out.set(payload, prefix.length);
    return out;
  }

  /**
   * Feed a TCP chunk; returns all complete payloads now available.
   * Incomplete data is buffered for the next call.
   */
  push(chunk: Uint8Array): Uint8Array[] {
    const merged = new Uint8Array(this.buf.length + chunk.length);
    merged.set(this.buf, 0);
    merged.set(chunk, this.buf.length);
    this.buf = merged;

    const out: Uint8Array[] = [];
    let offset = 0;
    while (true) {
      if (offset >= this.buf.length) break;
      // decode varint length
      let len = 0;
      let shift = 0;
      let i = offset;
      while (i < this.buf.length) {
        const b = this.buf[i]!;
        len |= (b & 0x7f) << shift;
        i++;
        if ((b & 0x80) === 0) break;
        shift += 7;
        if (shift > 28) throw new Error('varint too long');
      }
      // incomplete varint (continuation byte expected but EOF)
      if (i > offset && i < this.buf.length && (this.buf[i - 1]! & 0x80)) break;
      if (i === offset) break; // no progress
      // incomplete payload
      if (i + len > this.buf.length) break;
      out.push(this.buf.slice(i, i + len));
      offset = i + len;
    }
    this.buf = this.buf.slice(offset);
    return out;
  }
}
