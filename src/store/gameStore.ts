import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, generatePuzzle, Difficulty } from '@/lib/sudoku';
import { useStatsStore } from './statsStore';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'completed';

export interface GameState {
  // Board State
  initialBoard: Board;
  currentBoard: Board;
  solution: Board;
  notes: Record<number, number[]>; // cellIndex -> array of notes [1-9]

  // Game Info
  difficulty: Difficulty;
  status: GameStatus;
  selectedCell: number | null;
  notesMode: boolean;
  mistakes: number;
  timeElapsed: number;

  // History for Undo
  history: {
    board: Board;
    notes: Record<number, number[]>;
  }[];

  // Actions
  startNewGame: (difficulty: Difficulty, seed?: number) => void;
  selectCell: (index: number | null) => void;
  setCellValue: (value: number) => void;
  eraseCell: () => void;
  toggleNotesMode: () => void;
  toggleNote: (value: number) => void;
  undo: () => void;
  setGameStatus: (status: GameStatus) => void;
  incrementTime: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      initialBoard: new Array(81).fill(0),
      currentBoard: new Array(81).fill(0),
      solution: new Array(81).fill(0),
      notes: {},
      difficulty: 'easy',
      status: 'idle',
      selectedCell: null,
      notesMode: false,
      mistakes: 0,
      timeElapsed: 0,
      history: [],

      startNewGame: (difficulty, seed) => {
        const { puzzle, solution } = generatePuzzle(difficulty, seed);
        set({
          initialBoard: [...puzzle],
          currentBoard: [...puzzle],
          solution,
          notes: {},
          difficulty,
          status: 'playing',
          selectedCell: null,
          notesMode: false,
          mistakes: 0,
          timeElapsed: 0,
          history: [],
        });
      },

      selectCell: (index) => {
        if (get().status !== 'playing') return;
        set({ selectedCell: index });
      },

      setCellValue: (value) => {
        const { currentBoard, selectedCell, initialBoard, solution, status, history, notes, mistakes } = get();

        if (status !== 'playing' || selectedCell === null) return;
        // Don't allow changing initial given numbers
        if (initialBoard[selectedCell] !== 0) return;

        const newBoard = [...currentBoard];
        newBoard[selectedCell] = value;

        // Check if mistake
        const isMistake = value !== 0 && value !== solution[selectedCell];
        const newMistakes = isMistake ? mistakes + 1 : mistakes;

        set({
          currentBoard: newBoard,
          history: [...history, { board: [...currentBoard], notes: { ...notes } }],
          // Clear notes for this cell when a value is set
          notes: { ...notes, [selectedCell]: [] },
          mistakes: newMistakes
        });

        // Check for completion
        const isComplete = newBoard.every((cell, idx) => cell === solution[idx]);
        if (isComplete) {
          set({ status: 'completed' });
          // Record win in stats
          useStatsStore.getState().recordWin(get().difficulty, get().timeElapsed);
        } else if (newMistakes >= 3) {
           // Basic fail state
           set({ status: 'completed' });
           useStatsStore.getState().recordLossOrQuit(get().difficulty);
        }
      },

      eraseCell: () => {
        const { currentBoard, selectedCell, initialBoard, status, history, notes } = get();
        if (status !== 'playing' || selectedCell === null) return;
        if (initialBoard[selectedCell] !== 0) return;

        const newBoard = [...currentBoard];
        newBoard[selectedCell] = 0;

        set({
          currentBoard: newBoard,
          history: [...history, { board: [...currentBoard], notes: { ...notes } }]
        });
      },

      toggleNotesMode: () => {
        set((state) => ({ notesMode: !state.notesMode }));
      },

      toggleNote: (value) => {
        const { selectedCell, notes, initialBoard, currentBoard, status, history } = get();
        if (status !== 'playing' || selectedCell === null) return;
        if (initialBoard[selectedCell] !== 0 || currentBoard[selectedCell] !== 0) return;

        const cellNotes = notes[selectedCell] || [];
        let newNotesForCell;

        if (cellNotes.includes(value)) {
          newNotesForCell = cellNotes.filter((n) => n !== value);
        } else {
          newNotesForCell = [...cellNotes, value].sort();
        }

        const newNotes = { ...notes, [selectedCell]: newNotesForCell };

        set({
          notes: newNotes,
          history: [...history, { board: [...currentBoard], notes: { ...notes } }]
        });
      },

      undo: () => {
        const { history } = get();
        if (history.length === 0) return;

        const newHistory = [...history];
        const previousState = newHistory.pop()!;

        set({
          currentBoard: previousState.board,
          notes: previousState.notes,
          history: newHistory
        });
      },

      setGameStatus: (status) => set({ status }),

      incrementTime: () => {
        const { status } = get();
        if (status === 'playing') {
          set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
        }
      }
    }),
    {
      name: 'sudozen-game-storage',
      // Don't persist time increment function or history (to save space)
      partialize: (state) => ({
        initialBoard: state.initialBoard,
        currentBoard: state.currentBoard,
        solution: state.solution,
        notes: state.notes,
        difficulty: state.difficulty,
        status: state.status,
        mistakes: state.mistakes,
        timeElapsed: state.timeElapsed,
      }),
    }
  )
);
