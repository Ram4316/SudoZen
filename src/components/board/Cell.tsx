import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface CellProps {
  index: number;
}

export const Cell: React.FC<CellProps> = ({ index }) => {
  const {
    currentBoard,
    initialBoard,
    solution,
    selectedCell,
    selectCell,
    notes
  } = useGameStore();
  const { showMistakes } = useSettingsStore();

  const value = currentBoard[index];
  const isGiven = initialBoard[index] !== 0;
  const isSelected = selectedCell === index;
  const cellNotes = notes[index] || [];

  // Highlighting logic
  const row = Math.floor(index / 9);
  const col = index % 9;
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);

  const selectedRow = selectedCell !== null ? Math.floor(selectedCell / 9) : -1;
  const selectedCol = selectedCell !== null ? selectedCell % 9 : -1;
  const selectedBoxRow = selectedRow !== -1 ? Math.floor(selectedRow / 3) : -1;
  const selectedBoxCol = selectedCol !== -1 ? Math.floor(selectedCol / 3) : -1;

  const isRelated = selectedCell !== null &&
    (row === selectedRow || col === selectedCol || (boxRow === selectedBoxRow && boxCol === selectedBoxCol));

  const isMatchingValue = selectedCell !== null && value !== 0 && currentBoard[selectedCell] === value;

  // Mistake detection
  const isMistake = showMistakes && value !== 0 && !isGiven && value !== solution[index];

  // Borders for the 3x3 grid hierarchy
  const isRightBlockEdge = (col + 1) % 3 === 0 && col !== 8;
  const isBottomBlockEdge = (row + 1) % 3 === 0 && row !== 8;

  return (
    <motion.div
      whileTap={{ scale: 0.95, opacity: 0.8 }}
      onClick={() => selectCell(index)}
      className={cn(
        "relative flex items-center justify-center text-lg sm:text-xl font-medium cursor-pointer transition-all duration-200 select-none",
        "w-full aspect-square border-r border-b border-white/[0.03]",
        isRightBlockEdge && "border-r border-r-white/[0.15]",
        isBottomBlockEdge && "border-b border-b-white/[0.15]",

        // Background colors based on state (translucent for depth)
        isSelected && "bg-zen-primary/20 shadow-glow-sm border border-zen-primary/50 z-10 scale-[1.02] rounded-md",
        !isSelected && isMatchingValue && "bg-zen-primary/10",
        !isSelected && !isMatchingValue && isRelated && "bg-white/[0.04]",
        !isSelected && !isMatchingValue && !isRelated && "bg-transparent",

        // Text colors
        isGiven ? "text-zen-text/90" : "text-zen-primary shadow-sm",
        isMistake && "text-zen-error bg-zen-error/10 border-zen-error/30 shadow-none",
      )}
    >
      {value !== 0 ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{ textShadow: !isGiven && !isMistake ? '0 1px 3px rgba(139, 92, 246, 0.4)' : 'none' }}
          className={cn(
            "font-semibold",
            isMistake && "animate-pulse-slow drop-shadow-none"
          )}
        >
          {value}
        </motion.span>
      ) : (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-[2px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div key={n} className="flex items-center justify-center">
              {cellNotes.includes(n) && (
                <span className="text-[8px] sm:text-[10px] text-zen-textMuted font-normal leading-none">
                  {n}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};