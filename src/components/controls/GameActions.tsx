import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Undo2, Eraser, PenLine, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const GameActions: React.FC = () => {
  const { eraseCell, toggleNotesMode, notesMode, undo, status, history } = useGameStore();

  const actions = [
    {
      icon: Undo2,
      label: 'Undo',
      onClick: undo,
      disabled: status !== 'playing' || history.length === 0,
      active: false,
    },
    {
      icon: Eraser,
      label: 'Erase',
      onClick: eraseCell,
      disabled: status !== 'playing',
      active: false,
    },
    {
      icon: PenLine,
      label: 'Notes',
      onClick: toggleNotesMode,
      disabled: status !== 'playing',
      active: notesMode,
    },
    {
      icon: Lightbulb,
      label: 'Hint',
      onClick: () => { /* Future feature */ },
      disabled: true, // Disabled for now, as it requires hint logic
      active: false,
    },
  ];

  return (
    <div className="w-full max-w-[450px] flex justify-between items-center px-4 mb-4">
      {actions.map(({ icon: Icon, label, onClick, disabled, active }) => (
        <motion.button
          key={label}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          disabled={disabled}
          className="flex flex-col items-center justify-center gap-1 min-w-[64px] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors border border-zen-border/40 shadow-sm",
              active ? "bg-zen-primary text-white border-zen-primary" : "bg-zen-surface text-zen-text hover:bg-zen-surfaceHover"
            )}
          >
            <Icon size={22} strokeWidth={2} />
          </div>
          <span className={cn(
            "text-xs font-medium",
            active ? "text-zen-primary" : "text-zen-textMuted"
          )}>
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};