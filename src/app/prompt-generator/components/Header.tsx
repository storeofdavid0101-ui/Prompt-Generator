/**
 * Application header component
 * Contains title, theme toggle, and lock controls
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Moon, Lock, Unlock } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface HeaderProps {
  darkMode: boolean;
  settingsLocked: boolean;
  onToggleDarkMode: () => void;
  onToggleLock: () => void;
  themeColors: ThemeColors;
}

export function Header({
  darkMode,
  settingsLocked,
  onToggleDarkMode,
  onToggleLock,
  themeColors,
}: HeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Zap className="w-6 h-6" style={{ color: themeColors.accent }} />
        <h1
          className="text-xl font-semibold tracking-tight"
          style={{ color: themeColors.textPrimary }}
        >
          PromptCine Studio
        </h1>
      </div>
      <p className="text-sm" style={{ color: themeColors.textTertiary }}>
        Direct your Prompt
      </p>

      <div className="flex items-center justify-center gap-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
          style={{
            backgroundColor: themeColors.inputBackground,
            borderColor: themeColors.borderColor,
            color: themeColors.textSecondary,
          }}
        >
          {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          {darkMode ? 'Light' : 'Dark'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleLock}
          className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border"
          style={{
            backgroundColor: settingsLocked
              ? themeColors.warning + '20'
              : themeColors.inputBackground,
            borderColor: settingsLocked ? themeColors.warning : themeColors.borderColor,
            color: settingsLocked ? themeColors.warning : themeColors.textSecondary,
          }}
        >
          {settingsLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          {settingsLocked ? 'Locked' : 'Lock'}
        </motion.button>
      </div>
    </div>
  );
}
