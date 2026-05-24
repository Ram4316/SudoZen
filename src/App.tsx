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

      {status === 'idle' ? (
        <div className="flex-1 w-full max-w-[450px] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-24 h-24 bg-zen-surface rounded-3xl rotate-12 flex items-center justify-center mb-8 shadow-zen border border-zen-border/50">
            <span className="text-4xl font-bold text-zen-primary -rotate-12">9</span>
          </div>
          <h2 className="text-2xl font-semibold text-zen-text mb-2">Find Your Focus</h2>
          <p className="text-sm text-zen-textMuted mb-12">
            Select a difficulty to start a new premium Sudoku experience.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full">
            {(['easy', 'medium', 'hard', 'expert'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => startNewGame(diff)}
                className="py-4 bg-zen-surface hover:bg-zen-surfaceHover rounded-2xl font-medium text-zen-text capitalize transition-colors border border-zen-border/30"
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Timer />

          {/* Main Game Area */}
          <div className="flex-1 w-full flex flex-col items-center justify-center px-2 relative">
            <Board />

            {/* Paused Overlay */}
            {status === 'paused' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zen-darker/80 backdrop-blur-sm rounded-xl">
                 <div className="text-2xl font-medium text-zen-text tracking-widest uppercase">Paused</div>
              </div>
            )}

            {/* Celebration/Game Over Overlay */}
            <Celebration />
          </div>

          {/* Controls Area */}
          <div className="w-full flex flex-col items-center mt-auto pb-safe">
            <GameActions />
            <NumberPad />
          </div>
        </>
      )}

      {/* Modals */}
      <SettingsModal isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)} />
      <StatsModal isOpen={activeModal === 'stats'} onClose={() => setActiveModal(null)} />
      <DailyModal isOpen={activeModal === 'daily'} onClose={() => setActiveModal(null)} />
    </div>
  );
}