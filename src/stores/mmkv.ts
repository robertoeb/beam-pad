import { createMMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const mmkv = createMMKV({ id: 'beampad' });

export const mmkvStorage: StateStorage = {
  getItem: (name: string) => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string) => mmkv.set(name, value),
  removeItem: (name: string) => mmkv.remove(name),
};
