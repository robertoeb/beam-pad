import { create } from 'zustand';
import type { remote as pb } from '@/proto/bundle';

interface ImeState {
  visible: boolean;
  field: pb.IRemoteTextFieldStatus | null;
  showField: (status: pb.IRemoteTextFieldStatus) => void;
  hideField: () => void;
}

export const useImeStore = create<ImeState>((set) => ({
  visible: false,
  field: null,
  showField: (status) => set({ visible: true, field: status }),
  hideField: () => set({ visible: false, field: null }),
}));
