/**
 * Theme Selector Hook
 *
 * Provides access to theme-related state only.
 * Use this instead of the full context when only theme data is needed.
 *
 * @module hooks/context/selectors/useThemeSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';
import type { ThemeColors } from '../../../config/types';

/**
 * Theme selector return type
 */
export interface ThemeSelectorReturn {
  /** Current dark mode setting */
  readonly darkMode: boolean;
  /** Update dark mode setting */
  readonly setDarkMode: (value: boolean) => void;
  /** Computed theme colors */
  readonly themeColors: ThemeColors;
}

/**
 * Hook to access only theme-related state
 *
 * @returns Theme state and handlers
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { darkMode, setDarkMode, themeColors } = useThemeSelector();
 *   return (
 *     <button
 *       onClick={() => setDarkMode(!darkMode)}
 *       style={{ color: themeColors.text }}
 *     >
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeSelector(): ThemeSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      darkMode: context.darkMode,
      setDarkMode: context.setDarkMode,
      themeColors: context.themeColors,
    }),
    [context.darkMode, context.setDarkMode, context.themeColors]
  );
}
