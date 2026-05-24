import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

export const NumberPad: React.FC = () => {
  const { setCellValue, toggleNote, notesMode, status } = useGameStore();

  const handleNumberClick = (num: number) => {
    if (notesMode) {
      toggleNote(num);
    } else {
      setCellValue(num);
    }
  };

  return (
    <div className="w-full max-w-[450px] grid grid-cols-5 gap-2 sm:gap-3 px-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <motion.button
          key={num}
          whileTap={{ scale: 0.9 }}
          disabled={status !== 'playing'}
          onClick={() => handleNumberClick(num)}
          className="aspect-[4/5] flex items-center justify-center text-2xl sm:text-3xl font-medium rounded-xl bg-zen-surface hover:bg-zen-surfaceHover text-zen-primary shadow-sm border border-zen-border/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {num}
        </motion.button>
      ))}
    </div>
  );
};