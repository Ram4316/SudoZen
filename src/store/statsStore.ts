import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Difficulty } from '@/lib/sudoku';

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number | null; // in seconds
  currentStreak: number;
  bestStreak: number;
}

export interface StatsState {
  statsByDifficulty: Record<Difficulty, Stats>;

  // Actions
  recordWin: (difficulty: Difficulty, time: number) => void;
  recordLossOrQuit: (difficulty: Difficulty) => void;
  resetStats: () => void;
}

const initialStats: Stats = {
  gamesPlayed: 0,
  gamesWon: 0,
  bestTime: null,
  currentStreak: 0,
  bestStreak: 0,
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      statsByDifficulty: {
        easy: { ...initialStats },
        medium: { ...initialStats },
        hard: { ...initialStats },
        expert: { ...initialStats },
      },

      recordWin: (difficulty, time) => set((state) => {
        const prevStats = state.statsByDifficulty[difficulty];
        const newStreak = prevStats.currentStreak + 1;

        return {
          statsByDifficulty: {
            ...state.statsByDifficulty,
            [difficulty]: {
              gamesPlayed: prevStats.gamesPlayed + 1,
              gamesWon: prevStats.gamesWon + 1,
              bestTime: prevStats.bestTime ? Math.min(prevStats.bestTime, time) : time,
              currentStreak: newStreak,
              bestStreak: Math.max(prevStats.bestStreak, newStreak),
            }
          }
        };
      }),

      recordLossOrQuit: (difficulty) => set((state) => {
        const prevStats = state.statsByDifficulty[difficulty];
        return {
          statsByDifficulty: {
            ...state.statsByDifficulty,
            [difficulty]: {
              ...prevStats,
              gamesPlayed: prevStats.gamesPlayed + 1,
              currentStreak: 0, // Reset streak
            }
          }
        };
      }),

      resetStats: () => set({
        statsByDifficulty: {
          easy: { ...initialStats },
          medium: { ...initialStats },
          hard: { ...initialStats },
          expert: { ...initialStats },
        }
      })
    }),
    {
      name: 'sudozen-stats',
    }
  )
);
