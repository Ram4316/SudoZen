export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

// Represents the Sudoku board as a 1D array of 81 numbers (0 means empty)
export type Board = number[];

const BOARD_SIZE = 81;
const GRID_SIZE = 9;
const BOX_SIZE = 3;

/**
 * Validates if a number can be placed at a given index
 */
export function isValidPlace(board: Board, index: number, value: number): boolean {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

  for (let i = 0; i < GRID_SIZE; i++) {
    // Check row
    if (board[row * GRID_SIZE + i] === value) return false;
    // Check column
    if (board[i * GRID_SIZE + col] === value) return false;
    // Check 3x3 box
    const r = boxRow + Math.floor(i / BOX_SIZE);
    const c = boxCol + (i % BOX_SIZE);
    if (board[r * GRID_SIZE + c] === value) return false;
  }
  return true;
}

/**
 * Shuffles an array in place (Fisher-Yates)
 */
function shuffle(array: number[], rng: () => number = Math.random): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Solves a Sudoku board using backtracking.
 * Returns true if solvable, false otherwise.
 * Mutates the board array.
 */
export function solve(board: Board): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i] === 0) {
      for (let num = 1; num <= 9; num++) {
        if (isValidPlace(board, i, num)) {
          board[i] = num;
          if (solve(board)) return true;
          board[i] = 0; // backtrack
        }
      }
      return false; // No valid number found, trigger backtrack
    }
  }
  return true; // Solved
}

/**
 * Fills a completely empty board with a valid, fully-solved Sudoku grid.
 */
function fillBoard(board: Board, rng: () => number = Math.random): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i] === 0) {
      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
      for (const num of numbers) {
        if (isValidPlace(board, i, num)) {
          board[i] = num;
          if (fillBoard(board, rng)) return true;
          board[i] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

/**
 * Counts the number of solutions for a given board.
 * Stops if more than one solution is found to optimize.
 */
function countSolutions(board: Board, limit = 2): number {
  let count = 0;

  function _solve(b: Board) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (b[i] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlace(b, i, num)) {
            b[i] = num;
            _solve(b);
            b[i] = 0;
            if (count >= limit) return; // Optimization: stop early
          }
        }
        return;
      }
    }
    count++;
  }

  _solve([...board]); // Work on a copy
  return count;
}

/**
 * A seeded PRNG (Mulberry32)
 */
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

/**
 * Generates a full valid Sudoku puzzle and a partially empty board based on difficulty.
 */
export function generatePuzzle(difficulty: Difficulty, seed?: number): { puzzle: Board, solution: Board } {
  const rng = seed !== undefined ? mulberry32(seed) : Math.random;

  const solution = new Array(BOARD_SIZE).fill(0);
  fillBoard(solution, rng);

  const puzzle = [...solution];

  // Cells to remove based on difficulty
  // Easy: ~30-40, Medium: ~40-50, Hard: ~50-55, Expert: ~55-60
  let cellsToRemove = 35;
  if (difficulty === 'medium') cellsToRemove = 45;
  if (difficulty === 'hard') cellsToRemove = 53;
  if (difficulty === 'expert') cellsToRemove = 58;

  const positions = shuffle(Array.from({ length: BOARD_SIZE }, (_, i) => i), rng);

  for (const pos of positions) {
    if (cellsToRemove <= 0) break;

    const temp = puzzle[pos];
    puzzle[pos] = 0;

    // Check if removing this breaks uniqueness
    // Counting solutions is expensive, so we only do it for hard/expert or as a strict check
    const solutions = countSolutions(puzzle, 2);
    if (solutions !== 1) {
      // Put it back
      puzzle[pos] = temp;
    } else {
      cellsToRemove--;
    }
  }

  return { puzzle, solution };
}
