import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const Timer: React.FC = () => {
  const { timeElapsed, status, incrementTime, setGameStatus, mistakes } = useGameStore();
  const { showTimer, showMistakes } = useSettingsStore();

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'playing') {
      timerRef.current = window.setInterval(() => {
        incrementTime();
      }, 1000);
    } else {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [status, incrementTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    if (status === 'playing') {
      setGameStatus('paused');
    } else if (status === 'paused') {
      setGameStatus('playing');
    }
  };

  return (
    <div className="w-full max-w-[450px] flex justify-between items-center px-4 mb-2 h-8">
      {/* Mistakes Counter */}
      <div className="flex items-center">
        {showMistakes && (
          <span className="text-sm font-medium text-zen-textMuted">
            Mistakes: <span className={cn(mistakes > 0 && "text-zen-error")}>{mistakes}</span>/3
          </span>
        )}
      </div>

      {/* Timer */}
      {showTimer && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-medium text-zen-text tracking-wider w-12 text-right">
            {formatTime(timeElapsed)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePause}
            disabled={status === 'idle' || status === 'completed'}
            className="p-1.5 rounded-full bg-zen-surface hover:bg-zen-surfaceHover text-zen-text transition-colors disabled:opacity-50"
          >
            {status === 'paused' ? <Play size={14} /> : <Pause size={14} />}
          </motion.button>
        </div>
      )}
    </div>
  );
};