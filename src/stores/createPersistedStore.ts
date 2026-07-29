import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';
import { mmkvStorage } from './mmkv';

type PersistConfig<T> = Partial<PersistOptions<T>> & { name: string };

export const createPersistedStore = <T>(
  config: PersistConfig<T>,
  creator: StateCreator<T, [['zustand/persist', Omit<PersistOptions<T>, 'name'>]], []>,
) =>
  create<T>()(persist(creator as any, {
    name: config.name,
    storage: createJSONStorage(() => mmkvStorage),
    partialize: config.partialize,
  }));
