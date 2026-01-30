/**
 * Type definitions for SubjectInputs components
 * Centralizes all interfaces and type aliases for the subject input module
 */

import type { CharacterItem, ThemeColors } from '../../config/types';
import type { LocationPreset } from '../../config/locationPresets';

/**
 * Props for the main SubjectInputs component
 */
export interface SubjectInputsProps {
  /** Main subject/scene description */
  subject: string;
  /** Array of character descriptions added by user */
  characterItems: CharacterItem[];
  /** Current character input value (before submission) */
  currentCharacter: string;
  /** Location description or preset keywords */
  location: string;
  /** Whether the section is locked from editing */
  isLocked: boolean;
  /** Callback to toggle section lock state */
  onToggleLock: () => void;
  /** Callback when subject text changes */
  onSubjectChange: (value: string) => void;
  /** Callback when character input changes */
  onCurrentCharacterChange: (value: string) => void;
  /** Callback to add current character to list */
  onAddCharacter: () => void;
  /** Callback to remove a character by ID */
  onRemoveCharacter: (id: string) => void;
  /** Callback when location changes */
  onLocationChange: (value: string) => void;
  /** Theme colors for consistent styling */
  themeColors: ThemeColors;
}

/**
 * Props for the LocationDropdown component
 */
export interface LocationDropdownProps {
  /** Current location value */
  location: string;
  /** Whether the input is disabled/locked */
  isLocked: boolean;
  /** Callback when location changes */
  onLocationChange: (value: string) => void;
  /** Theme colors for styling */
  themeColors: ThemeColors;
  /** Location presets grouped by category */
  presetsByCategory: Record<string, LocationPreset[]>;
  /** Display names for each category */
  categoryNames: Record<string, string>;
}

/**
 * Props for the CharacterTag component
 */
export interface CharacterTagProps {
  /** Character item data */
  item: CharacterItem;
  /** Whether removal is disabled */
  isLocked: boolean;
  /** Callback when remove button is clicked */
  onRemove: (id: string) => void;
  /** Theme colors for styling */
  themeColors: ThemeColors;
}

/**
 * Props for the CharacterInput component
 */
export interface CharacterInputProps {
  /** Current input value */
  value: string;
  /** Whether input is disabled */
  isLocked: boolean;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Callback when Enter key is pressed */
  onSubmit: () => void;
  /** Theme colors for styling */
  themeColors: ThemeColors;
}

/**
 * Keyboard event codes for accessibility
 */
export const KeyboardCodes = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  TAB: 'Tab',
  SPACE: ' ',
} as const;
