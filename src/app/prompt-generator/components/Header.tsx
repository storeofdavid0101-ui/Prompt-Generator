/**
 * Application header component
 * Contains logo and theme toggle
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import type { ThemeColors } from '../config/types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  themeColors: ThemeColors;
}

export function Header({
  darkMode,
  onToggleDarkMode,
  themeColors,
}: HeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center mb-2">
        <Image
          src="/logo.png"
          alt="PromptCine Studio"
          width={200}
          height={50}
          className="h-12 w-auto"
          priority
        />
      </div>
      <p className="text-sm" style={{ color: themeColors.textTertiary }}>
        Cinematic camera-logic tool
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
      </div>
    </div>
  );
}
