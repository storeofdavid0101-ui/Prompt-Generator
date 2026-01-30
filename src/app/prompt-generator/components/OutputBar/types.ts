/**
 * Type definitions for OutputBar component
 * Centralizes all interfaces and type aliases for the output bar system
 */

import type { ThemeColors } from '../../config/types';

/**
 * View state enumeration for OutputBar
 * Consolidates multiple boolean flags into a single state machine
 */
export type OutputBarViewState =
  | 'minimized'      // Compact view with only action buttons
  | 'collapsed'      // Full bar visible, prompt preview collapsed to single line
  | 'expanded'       // Prompt preview expanded with scroll (30vh max)
  | 'fully-expanded'; // Prompt preview fully expanded (no height limit)

/**
 * Props for the main OutputBar component
 */
export interface OutputBarProps {
  /** The generated prompt text to display */
  prompt: string;
  /** Whether the prompt was recently copied to clipboard */
  copied: boolean;
  /** Callback to reset all prompt settings */
  onReset: () => void;
  /** Callback to copy prompt to clipboard */
  onCopy: () => void;
  /** Theme colors for consistent styling */
  themeColors: ThemeColors;
}

/**
 * Props for the PromptPreview sub-component
 */
export interface PromptPreviewProps {
  /** The prompt text to display */
  prompt: string;
  /** Current view state */
  viewState: OutputBarViewState;
  /** Callback when preview is clicked */
  onPreviewClick: () => void;
  /** Callback when expand/collapse icon is clicked */
  onToggleExpand: () => void;
  /** Theme colors */
  themeColors: ThemeColors;
}

/**
 * Props for the ActionButtons sub-component
 */
export interface ActionButtonsProps {
  /** Whether prompt was copied */
  copied: boolean;
  /** Reset callback */
  onReset: () => void;
  /** Copy callback */
  onCopy: () => void;
  /** Theme colors */
  themeColors: ThemeColors;
  /** Whether to show compact (minimized) variant */
  compact?: boolean;
}

/**
 * Props for the MinimizedToggle sub-component
 */
export interface MinimizedToggleProps {
  /** Whether bar is currently minimized */
  isMinimized: boolean;
  /** Toggle callback */
  onToggle: () => void;
  /** Theme colors */
  themeColors: ThemeColors;
}
