export type ConnectErrorCode =
  | 'WIFI_OFF'
  | 'HOST_UNREACHABLE'
  | 'PORT_CLOSED'
  | 'TLS_HANDSHAKE'
  | 'CERT_REVOKED'
  | 'PAIRING_REJECTED'
  | 'PAIRING_TIMEOUT'
  | 'PROTOCOL'
  | 'TIMEOUT'
  | 'UNKNOWN';

export interface ConnectError {
  code: ConnectErrorCode;
  message: string;
  steps: string[];
  detail?: string;
  retryable: boolean;
}

const COPY: Record<
  ConnectErrorCode,
  { message: (ctx?: string) => string; steps: string[]; retryable: boolean }
> = {
  WIFI_OFF: {
    message: () => 'Wi-Fi is off. Connect to the same network as your TV.',
    steps: [
      'Open Settings → Wi-Fi on your phone',
      'Join the same network your TV is on (not a guest network)',
      'Try again',
    ],
    retryable: true,
  },
  HOST_UNREACHABLE: {
    message: (ctx) => `No answer from ${ctx ?? 'the TV'}.`,
    steps: [
      'Wake the TV with its physical remote',
      'Confirm phone and TV are on the same Wi-Fi network (not a guest network)',
    ],
    retryable: true,
  },
  PORT_CLOSED: {
    message: () => 'Your TV answered but its remote service is off.',
    steps: [
      'Open Settings → System → Remote & Accessories on the TV',
      'Make sure Google TV / Android TV Remote is enabled',
      'Try pairing again',
    ],
    retryable: true,
  },
  TLS_HANDSHAKE: {
    message: () => 'The TLS handshake failed. The TV may not support this app yet.',
    steps: [
      'Restart the TV with its physical remote',
      'Make sure the TV firmware is up to date',
      'Try pairing again',
    ],
    retryable: true,
  },
  CERT_REVOKED: {
    message: () => 'This TV no longer recognises BeamPad.',
    steps: ["Remove BeamPad from the TV's paired devices", 'Tap Re-pair below'],
    retryable: false,
  },
  PAIRING_REJECTED: {
    message: () => 'The TV rejected the pairing request.',
    steps: [
      'Open Settings → System → Remote & Accessories on the TV',
      'Remove any old BeamPad entries',
      'Try pairing again',
    ],
    retryable: true,
  },
  PAIRING_TIMEOUT: {
    message: () => 'The TV never showed a pairing code.',
    steps: ['Make sure the TV is awake and on the home screen', 'Try pairing again'],
    retryable: true,
  },
  PROTOCOL: {
    message: () => 'The TV replied with an unexpected protocol message.',
    steps: ['Restart the TV', 'Try pairing again'],
    retryable: true,
  },
  TIMEOUT: {
    message: (ctx) => `Connection to ${ctx ?? 'the TV'} timed out.`,
    steps: [
      'Wake the TV with its physical remote',
      'Confirm phone and TV are on the same Wi-Fi network',
      'Try again',
    ],
    retryable: true,
  },
  UNKNOWN: {
    message: () => 'Something went wrong connecting to the TV.',
    steps: ['Restart the TV', 'Restart the app', 'Try again'],
    retryable: true,
  },
};

interface ClassifyCtx {
  phase: 'probe' | 'pair' | 'connect';
  host?: string;
  hasCerts?: boolean;
  /**
   * Precise code from the native socket layer (TlsSession.codeOf):
   * PORT_CLOSED | HOST_UNREACHABLE | TLS_HANDSHAKE | UNKNOWN.
   * Trusted over substring matching; UNKNOWN falls through to heuristics.
   */
  nativeCode?: string;
}

const NATIVE_CODES = new Set(['PORT_CLOSED', 'HOST_UNREACHABLE', 'TLS_HANDSHAKE']);

export function classify(raw: unknown, ctx: ClassifyCtx): ConnectError {
  const msg = raw == null ? '' : typeof raw === 'string' ? raw : String(raw);
  const lower = msg.toLowerCase();

  let code: ConnectErrorCode;

  if (ctx.nativeCode && NATIVE_CODES.has(ctx.nativeCode)) {
    code = ctx.nativeCode as ConnectErrorCode;
  } else if (lower.includes('wifi') && (lower.includes('off') || lower.includes('disabled'))) {
    code = 'WIFI_OFF';
  } else if (lower.includes('econnrefused') || lower.includes('connection refused')) {
    code = 'PORT_CLOSED';
  } else if (
    lower.includes('ehostunreach') ||
    lower.includes('enetunreach') ||
    lower.includes('no route to host')
  ) {
    code = 'HOST_UNREACHABLE';
  } else if (
    lower.includes('after 10000ms') ||
    lower.includes('sockettimeout') ||
    lower.includes('connect timeout') ||
    lower === 'timeout'
  ) {
    code = 'HOST_UNREACHABLE';
  } else if (
    lower.includes('sslhandshakeexception') ||
    lower.includes('connection reset by peer')
  ) {
    if (ctx.phase === 'connect' && ctx.hasCerts) {
      code = 'CERT_REVOKED';
    } else {
      code = 'TLS_HANDSHAKE';
    }
  } else if (lower.includes('status_bad_configuration') || lower.includes('tv status')) {
    code = 'PROTOCOL';
  } else if (lower.includes('rejected') || lower.includes('pairing failed')) {
    code = 'PAIRING_REJECTED';
  } else if (lower.includes('timeout')) {
    code = 'TIMEOUT';
  } else {
    code = 'UNKNOWN';
  }

  const entry = COPY[code];
  const contextStr = ctx.host ?? ctx.phase;
  return {
    code,
    message: entry.message(contextStr),
    steps: [...entry.steps],
    detail: msg || undefined,
    retryable: entry.retryable,
  };
}

export function copyForCode(code: ConnectErrorCode, host?: string): ConnectError {
  const entry = COPY[code];
  return {
    code,
    message: entry.message(host),
    steps: [...entry.steps],
    retryable: entry.retryable,
  };
}
