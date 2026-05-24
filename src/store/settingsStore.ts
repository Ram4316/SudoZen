import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsState {
  theme: 'dark' | 'light' | 'system';
  showMistakes: boolean;
  showTimer: boolean;
  hapticsEnabled: boolean;
  soundEnabled: boolean;

  // Actions
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  toggleMistakes: () => void;
  toggleTimer: () => void;
  toggleHaptics: () => void;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark', // App is dark mode first
      showMistakes: true,
      showTimer: true,
      hapticsEnabled: true,
      soundEnabled: true,

      setTheme: (theme) => set({ theme }),
      toggleMistakes: () => set((state) => ({ showMistakes: !state.showMistakes })),
      toggleTimer: () => set((state) => ({ showTimer: !state.showTimer })),
      toggleHaptics: () => set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'sudozen-settings',
    }
  )
);
