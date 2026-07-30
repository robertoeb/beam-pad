import { requireNativeModule, EventEmitter } from 'expo-modules-core';

type AtvSocketEvents = {
  onSocketData: (e: { id: string; base64: string }) => void;
  onSocketState: (e: { id: string; state: string; error?: string; code?: string }) => void;
  onMicData: (e: { base64: string }) => void;
} & Record<string, (...args: any[]) => void>;

const Native = requireNativeModule('AtvSocket') as AtvSocketNative;
const emitter = new EventEmitter<AtvSocketEvents>(Native as any);

interface AtvSocketNative {
  generateClientCertificate(): Promise<ClientCertificate>;
  importClientCertificate(certPem: string, keyPem: string): Promise<RsaComponents>;
  getPeerPublicKeyComponents(id: string): Promise<RsaComponents>;
  connect(id: string, host: string, port: number, certPem: string, keyPem: string): Promise<void>;
  send(id: string, base64: string): void;
  close(id: string): void;
  startMicStream(): Promise<void>;
  stopMicStream(): void;
}

export interface ClientCertificate {
  pem: string;
  privateKeyPem: string;
  modulusB64: string;
  exponentB64: string;
}
export interface RsaComponents {
  modulusB64: string;
  exponentB64: string;
}
export type SocketState = 'open' | 'closed' | 'error';

export const AtvSocket = {
  generateClientCertificate: (): Promise<ClientCertificate> => Native.generateClientCertificate(),
  importClientCertificate: (certPem: string, keyPem: string): Promise<RsaComponents> =>
    Native.importClientCertificate(certPem, keyPem),
  getPeerPublicKeyComponents: (id: string): Promise<RsaComponents> =>
    Native.getPeerPublicKeyComponents(id),
  connect: (id: string, host: string, port: number, certPem: string, keyPem: string) =>
    Native.connect(id, host, port, certPem, keyPem),
  send: (id: string, base64: string): void => Native.send(id, base64),
  close: (id: string): void => Native.close(id),
  startMicStream: (): Promise<void> => Native.startMicStream(),
  stopMicStream: (): void => Native.stopMicStream(),

  onSocketData: (cb: AtvSocketEvents['onSocketData']) => emitter.addListener('onSocketData', cb),
  onSocketState: (cb: AtvSocketEvents['onSocketState']) => emitter.addListener('onSocketState', cb),
  onMicData: (cb: AtvSocketEvents['onMicData']) => emitter.addListener('onMicData', cb),
};
