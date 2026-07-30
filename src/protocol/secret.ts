/** SHA-256 pairing secret derivation — matches ATV protocol v2 spec. */
import { sha256 } from '@noble/hashes/sha2.js';
import { fromB64, hexToBytes, concatBytes } from './bytes';

export function derivePairingSecret(opts: {
  clientModulusB64: string;
  clientExponentB64: string;
  serverModulusB64: string;
  serverExponentB64: string;
  /** 6-character hex code displayed on the TV */
  code: string;
}): Uint8Array {
  // Last 4 hex characters → 2-byte nonce
  const nonce = hexToBytes(opts.code.slice(-4));
  return sha256(
    concatBytes([
      fromB64(opts.clientModulusB64),
      fromB64(opts.clientExponentB64),
      fromB64(opts.serverModulusB64),
      fromB64(opts.serverExponentB64),
      nonce,
    ]),
  );
}
