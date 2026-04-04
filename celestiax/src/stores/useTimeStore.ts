// src/stores/useTimeStore.ts
import { create } from 'zustand';

export interface TimeState {
  currentTime: number;           // timestamp en ms (Date.now())
  setCurrentTime: (timestamp: number) => void;
  resetToNow: () => void;
}

// Para futuras mejoras (play/pause) ya dejamos preparado el shape
export const useTimeStore = create<TimeState>((set) => ({
  currentTime: Date.now(),

  setCurrentTime: (timestamp) => set({ currentTime: timestamp }),

  resetToNow: () => set({ currentTime: Date.now() }),
}));