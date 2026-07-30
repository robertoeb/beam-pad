jest.mock('@/modules/expo-atv-socket', () => ({
  AtvSocket: {
    getServerPublicKeyComponents: jest.fn(),
    getPeerPublicKeyComponents: jest.fn(),
    generateClientCertificate: jest.fn(() =>
      Promise.resolve({
        pem: 'FAKE_CERT',
        privateKeyPem: 'FAKE_KEY',
        modulusB64: 'BQRFBA==',
        exponentB64: 'AgM=',
      }),
    ),
    connect: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    onSocketData: jest.fn(() => () => {}),
    onSocketState: jest.fn(() => () => {}),
  },
}));

import { switchTo, registerConnector } from '@/services/sessionManager';
import { useDevicesStore } from '@/stores/devices';
import { useConnectionStore } from '@/stores/connection';

describe('sessionManager error handling', () => {
  beforeEach(() => {
    useDevicesStore.setState(useDevicesStore.getInitialState());
    useConnectionStore.setState({ state: 'IDLE', error: undefined });
  });

  it('12s budget: native error at 8s wins over timeout', async () => {
    jest.useFakeTimers();
    useDevicesStore.getState().addPaired({
      id: 'tv-err',
      name: 'Err TV',
      host: '10.0.0.5',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    registerConnector(async () => {
      await new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('ECONNREFUSED')), 8000);
      });
    });

    const promise = switchTo('tv-err');
    jest.advanceTimersByTime(8000);
    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.error?.code).toBe('PORT_CLOSED');
    jest.useRealTimers();
  });

  it('timeout at 12s yields TIMEOUT code', async () => {
    jest.useFakeTimers();
    useDevicesStore.getState().addPaired({
      id: 'tv-slow',
      name: 'Slow TV',
      host: '10.0.0.6',
      port: 6466,
      certPem: 'CERT',
      keyPem: 'KEY',
    });

    registerConnector(async () => {
      await new Promise<void>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 12000);
      });
    });

    const promise = switchTo('tv-slow');
    jest.advanceTimersByTime(12000);
    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
    jest.useRealTimers();
  });
});
