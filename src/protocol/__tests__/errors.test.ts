import { classify, copyForCode, ConnectErrorCode } from '../errors';

const ALL_CODES: ConnectErrorCode[] = [
  'WIFI_OFF',
  'HOST_UNREACHABLE',
  'PORT_CLOSED',
  'TLS_HANDSHAKE',
  'CERT_REVOKED',
  'PAIRING_REJECTED',
  'PAIRING_TIMEOUT',
  'PROTOCOL',
  'TIMEOUT',
  'UNKNOWN',
];

describe('classify', () => {
  it.each([
    ['ECONNREFUSED', 'connect', 'PORT_CLOSED'],
    ['Connection refused', 'connect', 'PORT_CLOSED'],
    ['EHOSTUNREACH', 'connect', 'HOST_UNREACHABLE'],
    ['ENETUNREACH', 'connect', 'HOST_UNREACHABLE'],
    ['No route to host', 'connect', 'HOST_UNREACHABLE'],
    ['after 10000ms', 'connect', 'HOST_UNREACHABLE'],
    ['SocketTimeout', 'connect', 'HOST_UNREACHABLE'],
    ['connect timeout', 'connect', 'HOST_UNREACHABLE'],
    ['SSLHandshakeException', 'pair', 'TLS_HANDSHAKE'],
    ['Connection reset by peer', 'probe', 'TLS_HANDSHAKE'],
    ['SSLHandshakeException', 'connect', 'CERT_REVOKED'],
    ['STATUS_BAD_CONFIGURATION', 'pair', 'PROTOCOL'],
    ['TV status 3', 'pair', 'PROTOCOL'],
    ['rejected', 'pair', 'PAIRING_REJECTED'],
    ['timeout', 'connect', 'HOST_UNREACHABLE'],
  ])('classify(%s, %s) → %s', (msg, phase, expected) => {
    const result = classify(msg, { phase: phase as any, hasCerts: phase === 'connect' });
    expect(result.code).toBe(expected);
  });

  it('returns UNKNOWN for unrecognised errors', () => {
    expect(classify('something weird', { phase: 'connect' }).code).toBe('UNKNOWN');
  });

  it('handles null/undefined input', () => {
    expect(classify(null, { phase: 'connect' }).code).toBe('UNKNOWN');
    expect(classify(undefined, { phase: 'connect' }).code).toBe('UNKNOWN');
  });

  it('includes detail from raw message', () => {
    const result = classify('ECONNREFUSED something', { phase: 'connect' });
    expect(result.detail).toBe('ECONNREFUSED something');
  });

  it.each([
    ['PORT_CLOSED', 'PORT_CLOSED'],
    ['HOST_UNREACHABLE', 'HOST_UNREACHABLE'],
    ['TLS_HANDSHAKE', 'TLS_HANDSHAKE'],
  ])('trusts native code %s over message text', (nativeCode, expected) => {
    // Message text alone would classify differently — the native hint wins.
    const result = classify('something weird', { phase: 'connect', nativeCode });
    expect(result.code).toBe(expected);
  });

  it('falls back to string matching when the native code is UNKNOWN', () => {
    const result = classify('ECONNREFUSED', { phase: 'connect', nativeCode: 'UNKNOWN' });
    expect(result.code).toBe('PORT_CLOSED');
  });
});

describe('copy completeness', () => {
  it.each(ALL_CODES)('code %s has non-empty message and ≥1 step', (code) => {
    const err = copyForCode(code);
    expect(err.message.length).toBeGreaterThan(0);
    expect(err.steps.length).toBeGreaterThanOrEqual(1);
    expect(typeof err.retryable).toBe('boolean');
  });
});
