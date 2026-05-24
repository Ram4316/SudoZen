import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export const Celebration: React.FC = () => {
  const { status, setGameStatus, mistakes } = useGameStore();

  const isWin = status === 'completed' && mistakes < 3;
  const isLoss = status === 'completed' && mistakes >= 3;

  if (!isWin && !isLoss) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-30 flex items-center justify-center bg-zen-darker/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full max-w-sm bg-zen-surface p-8 rounded-3xl shadow-zen border border-zen-border/50 text-center flex flex-col items-center"
        >
          {isWin ? (
            <>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                className="w-20 h-20 bg-zen-primary/20 text-zen-primary rounded-full flex items-center justify-center mb-6"
              >
                <Trophy size={40} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold text-zen-text mb-2 tracking-tight"
              >
                Puzzle Solved!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-zen-textMuted mb-8"
              >
                Great job! You completed the puzzle with {mistakes} mistake{mistakes !== 1 ? 's' : ''}.
              </motion.p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                className="w-20 h-20 bg-zen-error/20 text-zen-error rounded-full flex items-center justify-center mb-6"
              >
                <RefreshCcw size={40} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold text-zen-text mb-2 tracking-tight"
              >
                Game Over
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-zen-textMuted mb-8"
              >
                You've made 3 mistakes. Keep practicing to improve!
              </motion.p>
            </>
          )}

          <button
            onClick={() => setGameStatus('idle')}
            className="w-full py-4 bg-zen-primary text-white rounded-2xl font-semibold shadow-zen-sm hover:opacity-90 transition-opacity"
          >
            Return Home
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};