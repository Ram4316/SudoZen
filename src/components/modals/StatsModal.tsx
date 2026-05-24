import React from 'react';
import { useStatsStore } from '@/store/statsStore';
import { Difficulty } from '@/lib/sudoku';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Clock, Target, Flame } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  const { statsByDifficulty } = useStatsStore();
  const [activeTab, setActiveTab] = React.useState<Difficulty>('easy');

  const stats = statsByDifficulty[activeTab];

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[400px] bg-zen-surface rounded-3xl p-6 shadow-zen z-50 border border-zen-border/50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-zen-text flex items-center gap-2">
                <Trophy className="text-zen-primary" size={24} />
                Statistics
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zen-surfaceHover text-zen-textMuted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex justify-between bg-zen-darker p-1 rounded-xl mb-6">
              {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setActiveTab(diff)}
                  className={cn(
                    "flex-1 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors",
                    activeTab === diff
                      ? "bg-zen-surface text-zen-text shadow-sm"
                      : "text-zen-textMuted hover:text-zen-text"
                  )}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<Target size={20} className="text-zen-secondary" />}
                label="Games Won"
                value={stats.gamesWon.toString()}
                subValue={`${stats.gamesPlayed} Played`}
              />
              <StatCard
                icon={<Clock size={20} className="text-zen-accent" />}
                label="Best Time"
                value={formatTime(stats.bestTime)}
              />
              <StatCard
                icon={<Flame size={20} className="text-orange-500" />}
                label="Current Streak"
                value={stats.currentStreak.toString()}
              />
              <StatCard
                icon={<Trophy size={20} className="text-yellow-500" />}
                label="Best Streak"
                value={stats.bestStreak.toString()}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const StatCard = ({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue?: string }) => (
  <div className="bg-zen-darker p-4 rounded-2xl border border-zen-border/30 flex flex-col items-center text-center">
    <div className="mb-2 p-2 bg-zen-surface rounded-full">
      {icon}
    </div>
    <span className="text-2xl font-bold text-zen-text mb-1">{value}</span>
    <span className="text-xs font-medium text-zen-textMuted">{label}</span>
    {subValue && <span className="text-[10px] text-zen-border mt-1">{subValue}</span>}
  </div>
);