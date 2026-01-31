/**
 * Theme Context
 * Provides theme colors and dark mode state to all child components
 * Eliminates prop drilling of themeColors throughout the component tree
 */

'use client';

import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react';
import type { ThemeColors } from '../config/types';
import { analytics } from '../services';

interface ThemeContextValue {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  themeColors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const darkTheme: ThemeColors = {
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

const lightTheme: ThemeColors = {
  background: '#FFF9F0',
  cardBackground: 'rgba(255, 249, 240, 0.95)',
  borderColor: 'rgba(139, 115, 85, 0.2)',
  textPrimary: '#1a1a1a',
  textSecondary: '#4a4a4a',
  textTertiary: '#6a6a6a',
  inputBackground: 'rgba(255, 247, 235, 0.9)',
  inputBorder: 'rgba(139, 115, 85, 0.3)',
  accent: '#6366f1',
  accentHover: '#818cf8',
  promptBg: 'rgba(99, 102, 241, 0.15)',
  success: '#10b981',
  warning: '#f59e0b',
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultDarkMode?: boolean;
}

export function ThemeProvider({ children, defaultDarkMode = true }: ThemeProviderProps) {
  const [darkMode, setDarkModeInternal] = useState(defaultDarkMode);

  const setDarkMode = useCallback((value: boolean) => {
    setDarkModeInternal(value);
    analytics.trackThemeToggle(value);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  const themeColors = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      toggleDarkMode,
      themeColors,
    }),
    [darkMode, setDarkMode, toggleDarkMode, themeColors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 * @throws Error if used outside of ThemeProvider
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to access only theme colors (for components that don't need dark mode toggle)
 */
export function useThemeColors(): ThemeColors {
  return useThemeContext().themeColors;
}
