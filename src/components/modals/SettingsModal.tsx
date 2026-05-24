import React from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Smartphone, Timer, AlertCircle, Volume2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    showMistakes, toggleMistakes,
    showTimer, toggleTimer,
    hapticsEnabled, toggleHaptics,
    soundEnabled, toggleSound
  } = useSettingsStore();

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
                <Settings className="text-zen-primary" size={24} />
                Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zen-surfaceHover text-zen-textMuted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <SettingToggle
                icon={<AlertCircle size={20} />}
                label="Show Mistakes"
                description="Highlight incorrect numbers"
                checked={showMistakes}
                onChange={toggleMistakes}
              />
              <SettingToggle
                icon={<Timer size={20} />}
                label="Show Timer"
                description="Display elapsed time"
                checked={showTimer}
                onChange={toggleTimer}
              />
              <SettingToggle
                icon={<Smartphone size={20} />}
                label="Haptics"
                description="Vibrate on interaction (mobile)"
                checked={hapticsEnabled}
                onChange={toggleHaptics}
              />
              <SettingToggle
                icon={<Volume2 size={20} />}
                label="Sound Effects"
                description="Play sounds on tap"
                checked={soundEnabled}
                onChange={toggleSound}
              />
            </div>

            <div className="mt-8 text-center text-xs text-zen-border">
              SudoZen v1.0.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SettingToggle = ({ icon, label, description, checked, onChange }: { icon: React.ReactNode, label: string, description: string, checked: boolean, onChange: () => void }) => (
  <div className="flex items-center justify-between p-3 rounded-2xl bg-zen-darker border border-zen-border/30">
    <div className="flex items-center gap-3">
      <div className="text-zen-textMuted">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zen-text">{label}</span>
        <span className="text-[10px] text-zen-textMuted">{description}</span>
      </div>
    </div>
    <button
      onClick={onChange}
      className={cn(
        "w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out flex",
        checked ? "bg-zen-primary justify-end" : "bg-zen-surfaceHover justify-start border border-zen-border/50"
      )}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);