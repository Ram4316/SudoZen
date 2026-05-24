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
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-sm bg-zen-surface p-8 rounded-3xl shadow-zen border border-zen-border/50 text-center flex flex-col items-center"
        >
          {isWin ? (
            <>
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-zen-primary/20 text-zen-primary rounded-full flex items-center justify-center mb-6"
              >
                <Trophy size={40} />
              </motion.div>
              <h2 className="text-3xl font-bold text-zen-text mb-2 tracking-tight">Puzzle Solved!</h2>
              <p className="text-zen-textMuted mb-8">
                Great job! You completed the puzzle with {mistakes} mistake{mistakes !== 1 ? 's' : ''}.
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-zen-error/20 text-zen-error rounded-full flex items-center justify-center mb-6"
              >
                <RefreshCcw size={40} />
              </motion.div>
              <h2 className="text-3xl font-bold text-zen-text mb-2 tracking-tight">Game Over</h2>
              <p className="text-zen-textMuted mb-8">
                You've made 3 mistakes. Keep practicing to improve!
              </p>
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