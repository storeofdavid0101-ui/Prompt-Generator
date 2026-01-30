/**
 * Theme State Type Definitions
 *
 * Types for theme management (dark/light mode).
 *
 * @module hooks/state/types/theme
 */

import type { ThemeColors } from '../../../config/types';
import type { Setter } from './common.types';

/**
 * Theme state interface
 *
 * Manages application theme including dark mode toggle
 * and computed theme color values.
 */
export interface ThemeState {
  /** Current dark mode setting */
  readonly darkMode: boolean;

  /** Computed theme colors based on dark mode */
  readonly themeColors: ThemeColors;

  /** Update dark mode setting */
  readonly setDarkMode: Setter<boolean>;
}
