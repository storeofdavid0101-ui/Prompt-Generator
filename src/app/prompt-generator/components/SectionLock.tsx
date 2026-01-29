/**
 * Small lock icon toggle for individual section locking
 */

'use client';

import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface SectionLockProps {
  isLocked: boolean;
  onToggle: () => void;
  themeColors: ThemeColors;
}

export function SectionLock({ isLocked, onToggle, themeColors }: SectionLockProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="p-1 rounded-md transition-colors"
      style={{
        color: isLocked ? themeColors.accent : themeColors.textTertiary,
        backgroundColor: isLocked ? `${themeColors.accent}15` : 'transparent',
      }}
      title={isLocked ? 'Unlock this section' : 'Lock this section'}
    >
      {isLocked ? (
        <Lock className="w-3.5 h-3.5" />
      ) : (
        <Unlock className="w-3.5 h-3.5" />
      )}
    </motion.button>
  );
}
