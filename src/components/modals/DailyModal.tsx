import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Play } from 'lucide-react';
import { Difficulty } from '@/lib/sudoku';

interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyModal: React.FC<DailyModalProps> = ({ isOpen, onClose }) => {
  const { startNewGame } = useGameStore();

  // Create a seed based on the current date (YYYYMMDD)
  const today = new Date();
  const dateSeed = parseInt(
    `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`
  );

  const handleStartDaily = (difficulty: Difficulty) => {
    // We add an offset to the seed based on difficulty so they are different
    let offset = 0;
    if (difficulty === 'medium') offset = 1;
    if (difficulty === 'hard') offset = 2;
    if (difficulty === 'expert') offset = 3;

    startNewGame(difficulty, dateSeed + offset);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[400px] bg-zen-surface rounded-3xl p-6 shadow-zen z-50 border border-zen-border/50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-zen-text flex items-center gap-2">
                <Calendar className="text-zen-primary" size={24} />
                Daily Challenge
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zen-surfaceHover text-zen-textMuted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-zen-text mb-2">
                {today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
              <p className="text-sm text-zen-textMuted">
                Complete today's seeded puzzle. The same puzzle is generated for everyone!
              </p>
            </div>

            <div className="space-y-3">
              {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => handleStartDaily(diff)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-zen-darker border border-zen-border/30 hover:border-zen-primary/50 transition-colors group"
                >
                  <span className="font-medium text-zen-text capitalize">{diff}</span>
                  <div className="w-8 h-8 rounded-full bg-zen-surfaceHover flex items-center justify-center group-hover:bg-zen-primary group-hover:text-white transition-colors">
                    <Play size={14} className="ml-1" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};