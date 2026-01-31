/**
 * Type definitions for SubjectInputs components
 * Centralizes all interfaces and type aliases for the subject input module
 */

import type { CharacterItem, ThemeColors } from '../../config/types';
import type { LocationPreset } from '../../config/locationPresets';

/**
 * Magic state for glow effects on randomized fields
 */
export interface MagicFieldState {
  subject: boolean;
  character: boolean;
  gaze: boolean;
  pose: boolean;
  position: boolean;
  location: boolean;
}

/**
 * Magic randomize handlers
 */
export interface MagicHandlers {
  randomizeSubject: () => void;
  randomizeCharacter: () => void;
  randomizeGaze: () => void;
  randomizePose: () => void;
  randomizePosition: () => void;
  randomizeLocation: () => void;
  randomizeContent: () => void;
}

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
  /** Selected gaze direction */
  gazeDirection: string;
  /** Selected pose/action */
  poseAction: string;
  /** Selected character position in frame */
  characterPosition: string;
  /** Location description or preset keywords */
  location: string;
  /** Whether the subject section is locked from editing */
  isSubjectLocked: boolean;
  /** Whether the character section is locked from editing */
  isCharacterLocked: boolean;
  /** Whether the gaze direction is locked from editing */
  isGazeLocked: boolean;
  /** Whether the pose/action is locked from editing */
  isPoseLocked: boolean;
  /** Whether the position is locked from editing */
  isPositionLocked: boolean;
  /** Whether the location is locked from editing */
  isLocationLocked: boolean;
  /** Callback to toggle subject lock state */
  onToggleSubjectLock: () => void;
  /** Callback to toggle character lock state */
  onToggleCharacterLock: () => void;
  /** Callback to toggle gaze lock state */
  onToggleGazeLock: () => void;
  /** Callback to toggle pose lock state */
  onTogglePoseLock: () => void;
  /** Callback to toggle position lock state */
  onTogglePositionLock: () => void;
  /** Callback to toggle location lock state */
  onToggleLocationLock: () => void;
  /** Callback when subject text changes */
  onSubjectChange: (value: string) => void;
  /** Callback when character input changes */
  onCurrentCharacterChange: (value: string) => void;
  /** Callback to add current character to list */
  onAddCharacter: () => void;
  /** Callback to remove a character by ID */
  onRemoveCharacter: (id: string) => void;
  /** Callback when gaze direction changes */
  onGazeChange: (gaze: string) => void;
  /** Callback when pose/action changes */
  onPoseChange: (pose: string) => void;
  /** Callback when character position changes */
  onPositionChange: (position: string) => void;
  /** Callback when location changes */
  onLocationChange: (value: string) => void;
  /** Theme colors for consistent styling */
  themeColors: ThemeColors;
  /** Magic state for glow effects (optional) */
  magicState?: MagicFieldState;
  /** Magic randomize handlers (optional) */
  magicHandlers?: MagicHandlers;
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
  /** Callback when Add button is clicked */
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
