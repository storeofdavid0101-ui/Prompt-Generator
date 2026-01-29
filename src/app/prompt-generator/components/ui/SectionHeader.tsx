/**
 * Collapsible section header component
 * Provides consistent styling for expandable sections throughout the app
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ThemeColors } from '../../config/types';

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  sectionKey: string;
  badge?: string;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  themeColors: ThemeColors;
}

export function SectionHeader({
  title,
  icon: Icon,
  sectionKey,
  badge,
  isExpanded,
  onToggle,
  themeColors,
}: SectionHeaderProps) {
  return (
    <button
      onClick={() => onToggle(sectionKey)}
      className="w-full flex items-center justify-between py-3 group"
    >
      <div className="flex items-center gap-2">
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
      </div>
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
  );
}
