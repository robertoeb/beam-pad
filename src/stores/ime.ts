import { create } from 'zustand';
import type { remote as pb } from '@/proto/bundle';

interface ImeState {
  visible: boolean;
  fieldCounter: number;
  label: string;
  value: string;
  start: number;
  end: number;
  showField: (s: pb.IRemoteTextFieldStatus) => void;
  setValue: (v: string, start?: number, end?: number) => void;
  dismiss: () => void;
}

export const useImeStore = create<ImeState>()((set) => ({
  visible: false,
  fieldCounter: 0,
  label: '',
  value: '',
  start: 0,
  end: 0,
  showField: (s) =>
    set({
      visible: true,
      fieldCounter: s.counterField ?? 0,
      label: s.label ?? '',
      value: s.value ?? '',
      start: s.start ?? 0,
      end: s.end ?? 0,
    }),
  setValue: (value, start, end) =>
    set((st) => ({ value, start: start ?? value.length, end: end ?? value.length })),
  dismiss: () => set({ visible: false }),
}));
