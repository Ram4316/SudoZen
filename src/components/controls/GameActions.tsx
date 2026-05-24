import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Undo2, Eraser, PenLine, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[450px] flex justify-between items-center px-4 mb-4"
    >
      {actions.map(({ icon: Icon, label, onClick, disabled, active }) => (
        <motion.button
          key={label}
          variants={itemVariants}
          whileTap={{ scale: 0.94 }}
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
            "text-xs font-medium transition-colors",
            active ? "text-zen-primary" : "text-zen-textMuted"
          )}>
            {label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};