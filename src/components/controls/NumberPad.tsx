import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  }
};

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[450px] grid grid-cols-5 gap-2 sm:gap-3 px-2"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <motion.button
          key={num}
          variants={itemVariants}
          whileTap={{ scale: 0.94 }}
          disabled={status !== 'playing'}
          onClick={() => handleNumberClick(num)}
          className="aspect-[4/5] flex items-center justify-center text-2xl sm:text-3xl font-medium rounded-xl bg-zen-surface hover:bg-zen-surfaceHover text-zen-primary shadow-sm border border-zen-border/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {num}
        </motion.button>
      ))}
    </motion.div>
  );
};