import { FakeAtvSocket } from '@/protocol/__mocks__/expo-atv-socket';
import { FrameCodec } from '@/protocol/framing';
import { toB64, fromB64 } from '@/protocol/bytes';
import { remote as pb } from '@/proto/bundle';

export function encodeMsg(fields: pb.IRemoteMessage): string {
  const payload = pb.RemoteMessage.encode(pb.RemoteMessage.create(fields)).finish();
  return toB64(FrameCodec.encode(payload));
}

export class AtvHarness extends FakeAtvSocket {
  openSocket() {
    this.emitState('open');
  }

  pushFrame(fields: pb.IRemoteMessage) {
    this.injectData(encodeMsg(fields));
  }

  pushRawFramed(bytes: Uint8Array) {
    this.injectData(toB64(bytes));
  }

  emitError(code = 'ECONNREFUSED', detail = 'connection refused') {
    this.emitState('error', detail, code);
  }

  emitClose(detail = 'closed') {
    this.emitState('closed', detail);
  }

  outbound(): pb.RemoteMessage[] {
    return this.sentFrames.map((f) => {
      const payloads = new FrameCodec().push(fromB64(f));
      return pb.RemoteMessage.decode(payloads[0]!);
    });
  }

  outboundBytes(): Uint8Array[] {
    return this.sentFrames.map((f) => fromB64(f));
  }

  clearSent() {
    this.sentFrames = [];
  }
}

export const harness = new AtvHarness();
