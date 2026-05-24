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
      className="relative w-full max-w-[450px] aspect-square p-1.5 sm:p-2"
    >
      {/* Subtle backdrop glow */}
      <div className="absolute inset-4 bg-zen-primary/10 blur-[40px] rounded-full pointer-events-none" />

      {/* Glassmorphic Container */}
      <div className="relative w-full h-full bg-[#161618]/60 backdrop-blur-xl rounded-2xl shadow-zen border border-white/10 p-0.5 sm:p-1 overflow-hidden">

        {/* Inner Grid Area with Glass Inner Shadow */}
        <div className="w-full h-full grid grid-cols-9 grid-rows-9 rounded-xl overflow-hidden bg-black/40 shadow-glass-inner border border-black/80">
          {Array.from({ length: 81 }).map((_, index) => (
            <Cell key={index} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};