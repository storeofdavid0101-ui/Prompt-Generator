/**
 * OutputFormatToggle Component Types
 *
 * @module components/OutputFormatToggle/types
 */

import type { ThemeColors } from '../../config/types';
import type { OutputMode } from '../../config/types/outputFormat';

/**
 * Props for the OutputFormatToggle component.
 */
export interface OutputFormatToggleProps {
  /** Currently selected output mode */
  readonly mode: OutputMode;

  /** Callback when mode changes */
  readonly onModeChange: (mode: OutputMode) => void;

  /** Theme colors for styling */
  readonly themeColors: ThemeColors;

  /** Whether the toggle is disabled */
  readonly disabled?: boolean;
}
