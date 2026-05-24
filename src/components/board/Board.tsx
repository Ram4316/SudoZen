import React, { useEffect } from 'react';
import { Cell } from './Cell';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const Board: React.FC = () => {
  const { setCellValue, eraseCell, selectCell, selectedCell, status } = useGameStore();

  // Keyboard support for desktop/accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'playing') return;

      if (e.key >= '1' && e.key <= '9') {
        setCellValue(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        eraseCell();
      } else if (selectedCell !== null) {
        // Arrow key navigation
        const row = Math.floor(selectedCell / 9);
        const col = selectedCell % 9;
        let newSelection = selectedCell;

        if (e.key === 'ArrowUp' && row > 0) newSelection -= 9;
        if (e.key === 'ArrowDown' && row < 8) newSelection += 9;
        if (e.key === 'ArrowLeft' && col > 0) newSelection -= 1;
        if (e.key === 'ArrowRight' && col < 8) newSelection += 1;

        if (newSelection !== selectedCell) {
          selectCell(newSelection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, setCellValue, eraseCell, selectCell, status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[450px] aspect-square bg-zen-darker p-1 sm:p-2 rounded-xl shadow-zen border border-zen-border/50"
    >
      <div className="w-full h-full grid grid-cols-9 grid-rows-9 rounded-lg overflow-hidden border-2 border-zen-border">
        {Array.from({ length: 81 }).map((_, index) => (
          <Cell key={index} index={index} />
        ))}
      </div>
    </motion.div>
  );
};