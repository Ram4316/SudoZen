import { Board } from './components/board/Board';
import { NumberPad } from './components/controls/NumberPad';
import { GameActions } from './components/controls/GameActions';
import { Timer } from './components/controls/Timer';
import { useGameStore } from './store/gameStore';
import { SettingsModal } from './components/modals/SettingsModal';
import { StatsModal } from './components/modals/StatsModal';
import { DailyModal } from './components/modals/DailyModal';
import { Celebration } from './components/ui/Celebration';
import { Settings, Trophy, Calendar } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const springConfig = { type: "spring" as const, bounce: 0.2, duration: 0.5 };
export const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const { status, startNewGame, difficulty } = useGameStore();

  const [activeModal, setActiveModal] = useState<'settings' | 'stats' | 'daily' | null>(null);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center bg-zen-darker overflow-hidden pt-8 pb-4">
      {/* Header Area */}
      <div className="w-full max-w-[450px] flex justify-between items-center px-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-zen-text tracking-tight">Sudo<span className="text-zen-primary">Zen</span></h1>
          {status === 'playing' || status === 'paused' ? (
            <span className="text-[10px] uppercase tracking-widest text-zen-textMuted font-medium">{difficulty}</span>
          ) : null}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setActiveModal('daily')} className="p-2 text-zen-textMuted hover:text-zen-primary transition-colors">
            <Calendar size={22} />
          </button>
          <button onClick={() => setActiveModal('stats')} className="p-2 text-zen-textMuted hover:text-zen-primary transition-colors">
            <Trophy size={22} />
          </button>
          <button onClick={() => setActiveModal('settings')} className="p-2 text-zen-textMuted hover:text-zen-primary transition-colors">
            <Settings size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="flex-1 w-full max-w-[450px] flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: 0 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ delay: 0.1, ...springConfig }}
              className="w-24 h-24 bg-zen-surface rounded-3xl flex items-center justify-center mb-8 shadow-zen border border-zen-border/50"
            >
              <span className="text-4xl font-bold text-zen-primary -rotate-12">9</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: smoothEase }}
              className="text-2xl font-semibold text-zen-text mb-2"
            >
              Find Your Focus
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4, ease: smoothEase }}
              className="text-sm text-zen-textMuted mb-12"
            >
              Select a difficulty to start a new premium Sudoku experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: smoothEase }}
              className="grid grid-cols-2 gap-3 w-full"
            >
              {(['easy', 'medium', 'hard', 'expert'] as const).map((diff) => (
                <motion.button
                  key={diff}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => startNewGame(diff)}
                  className="py-4 bg-zen-surface hover:bg-zen-surfaceHover rounded-2xl font-medium text-zen-text capitalize transition-colors border border-zen-border/30"
                >
                  {diff}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="w-full flex-1 flex flex-col items-center"
          >
            <Timer />

            {/* Main Game Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-center px-2 relative">
              <Board />

              {/* Paused Overlay */}
              <AnimatePresence>
                {status === 'paused' && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-zen-darker/60 rounded-xl"
                  >
                     <motion.div
                       initial={{ scale: 0.95, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0.95, opacity: 0 }}
                       transition={springConfig}
                       className="text-2xl font-medium text-zen-text tracking-widest uppercase"
                     >
                       Paused
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Celebration/Game Over Overlay */}
              <Celebration />
            </div>

            {/* Controls Area */}
            <div className="w-full flex flex-col items-center mt-auto pb-safe">
              <GameActions />
              <NumberPad />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SettingsModal isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)} />
      <StatsModal isOpen={activeModal === 'stats'} onClose={() => setActiveModal(null)} />
      <DailyModal isOpen={activeModal === 'daily'} onClose={() => setActiveModal(null)} />
    </div>
  );
}