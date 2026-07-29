import { requireNativeModule, EventEmitter } from 'expo-modules-core';

type AtvDiscoveryEvents = {
  onDiscoveryEvent: (e: DiscoveryEvent) => void;
};

const Native = requireNativeModule('AtvDiscovery') as AtvDiscoveryNative;
const emitter = new EventEmitter<AtvDiscoveryEvents>(Native as any);

interface AtvDiscoveryNative {
  startDiscovery(): Promise<void>;
  stopDiscovery(): void;
}

export interface DiscoveryEvent {
  type: 'found' | 'resolved' | 'lost' | 'resolveFailed' | 'error';
  name: string;
  host?: string;
  port?: number;
  txt?: Record<string, string>;
  error?: string;
}

export const AtvDiscovery = {
  startDiscovery: (): Promise<void> => Native.startDiscovery(),
  stopDiscovery: (): void => Native.stopDiscovery(),
  onEvent: (cb: (e: DiscoveryEvent) => void) => emitter.addListener('onDiscoveryEvent', cb),
};
