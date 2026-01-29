/**
 * Collapsible section header component
 * Provides consistent styling for expandable sections throughout the app
 */

'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Lock, Unlock } from 'lucide-react';
import type { ThemeColors } from '../../config/types';

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  sectionKey: string;
  badge?: string;
  isExpanded: boolean;
  isLocked?: boolean;
  onToggle: (key: string) => void;
  onToggleLock?: () => void;
  themeColors: ThemeColors;
}

export function SectionHeader({
  title,
  icon: Icon,
  sectionKey,
  badge,
  isExpanded,
  isLocked,
  onToggle,
  onToggleLock,
  themeColors,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <button
        onClick={() => onToggle(sectionKey)}
        className="flex-1 flex items-center gap-2 group"
      >
        <Icon className="w-4 h-4" style={{ color: themeColors.accent }} />
        <span
          className="text-sm font-medium"
          style={{ color: themeColors.textPrimary }}
        >
          {title}
        </span>
        {badge && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{
              backgroundColor: themeColors.promptBg,
              color: themeColors.accent,
            }}
          >
            {badge}
          </span>
        )}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: themeColors.textTertiary }}
          />
        </motion.div>
      </button>

      {onToggleLock && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
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
      )}
    </div>
  );
}
