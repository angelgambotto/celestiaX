// src/stores/useTimeStore.ts
import { create } from 'zustand';

export interface TimeState {
  currentTime: number;
  isPlaying: boolean;
  speed: number;           // multiplicador (3600 = 1 hora por segundo real)

  setCurrentTime: (timestamp: number) => void;
  resetToNow: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
}

export const useTimeStore = create<TimeState>((set, get) => ({
  currentTime: Date.now(),
  isPlaying: false,
  speed: 3600,

  setCurrentTime: (timestamp) => set({ currentTime: timestamp }),

  resetToNow: () => set({ 
    currentTime: Date.now(), 
    isPlaying: false 
  }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setSpeed: (newSpeed) => set({ speed: newSpeed }),
}));