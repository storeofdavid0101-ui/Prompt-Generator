/**
 * Theme management hook
 * Provides theme colors based on dark/light mode setting
 */

import { useMemo } from 'react';
import type { ThemeColors } from '../config/types';

export function useTheme(darkMode: boolean): ThemeColors {
  return useMemo(() => {
    if (darkMode) {
      return {
        background: '#0a0a0b',
        cardBackground: 'rgba(20, 20, 22, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        textPrimary: '#f8fafc',
        textSecondary: '#a1a1aa',
        textTertiary: '#71717a',
        inputBackground: 'rgba(39, 39, 42, 0.8)',
        inputBorder: 'rgba(63, 63, 70, 0.8)',
        accent: '#6366f1',
        accentHover: '#818cf8',
        promptBg: 'rgba(88, 80, 140, 0.35)',
        success: '#10b981',
        warning: '#f59e0b',
      };
    }

    return {
      background: '#FFFEF5',
      cardBackground: 'rgba(255, 253, 245, 0.95)',
      borderColor: 'rgba(139, 115, 85, 0.2)',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a4a4a',
      textTertiary: '#6a6a6a',
      inputBackground: 'rgba(255, 250, 240, 0.9)',
      inputBorder: 'rgba(139, 115, 85, 0.3)',
      accent: '#6366f1',
      accentHover: '#818cf8',
      promptBg: 'rgba(99, 102, 241, 0.15)',
      success: '#10b981',
      warning: '#f59e0b',
    };
  }, [darkMode]);
}
