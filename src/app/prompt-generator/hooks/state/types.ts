/**
 * Type Definitions for State Hooks
 *
 * Defines interfaces and types for all domain-specific state hooks.
 * Ensures type safety and consistent API contracts across the state layer.
 *
 * @module hooks/state/types
 */

import type {
  AIModel,
  Atmosphere,
  CharacterItem,
  ThemeColors,
  ConflictResult,
  ExpandedSections,
  LockedSections,
} from '../../config/types';

/**
 * Model selection state and handlers
 */
export interface ModelState {
  /** Currently selected AI model */
  selectedModel: AIModel;
  /** Update the selected model */
  setSelectedModel: (model: AIModel) => void;
}

/**
 * Creative controls state and handlers
 */
export interface CreativeControlsState {
  /** Whether creative controls are enabled */
  enabled: boolean;
  /** Creativity slider value (0-100) */
  creativity: number;
  /** Variation slider value (0-100) */
  variation: number;
  /** Uniqueness slider value (0-100) */
  uniqueness: number;
  /** Toggle creative controls on/off */
  setEnabled: (enabled: boolean) => void;
  /** Update creativity value */
  setCreativity: (value: number) => void;
  /** Update variation value */
  setVariation: (value: number) => void;
  /** Update uniqueness value */
  setUniqueness: (value: number) => void;
  /** Reset all creative controls to defaults */
  reset: () => void;
}

/**
 * Content state and handlers (subject, characters, location)
 */
export interface ContentState {
  /** Main subject text */
  subject: string;
  /** List of character items */
  characterItems: CharacterItem[];
  /** Current character input value */
  currentCharacter: string;
  /** Scene location */
  location: string;
  /** Update subject */
  setSubject: (value: string) => void;
  /** Update current character input */
  setCurrentCharacter: (value: string) => void;
  /** Update location */
  setLocation: (value: string) => void;
  /** Add current character to list */
  addCharacter: () => void;
  /** Remove a character by ID */
  removeCharacter: (id: string) => void;
  /** Reset all content to defaults */
  reset: () => void;
}

/**
 * Visual state and handlers (atmosphere, preset, lighting, colors)
 */
export interface VisualState {
  /** Selected atmosphere preset */
  selectedAtmosphere: Atmosphere | null;
  /** Selected visual style preset */
  selectedVisualPreset: string | null;
  /** Selected lighting option */
  selectedLighting: string | null;
  /** Selected color palette */
  selectedColorPalette: string | null;
  /** Custom color values (6 hex colors) */
  customColors: string[];
  /** Update atmosphere */
  setSelectedAtmosphere: (value: Atmosphere | null) => void;
  /** Update visual preset */
  setSelectedVisualPreset: (value: string | null) => void;
  /** Update lighting */
  setSelectedLighting: (value: string | null) => void;
  /** Update color palette */
  setSelectedColorPalette: (value: string | null) => void;
  /** Update custom colors */
  setCustomColors: (colors: string[]) => void;
  /** Reset atmosphere only */
  resetAtmosphere: () => void;
  /** Reset visual preset only */
  resetVisualPreset: () => void;
  /** Reset lighting only */
  resetLighting: () => void;
  /** Reset colors only */
  resetColors: () => void;
}

/**
 * Camera state and handlers
 */
export interface CameraState {
  /** Selected camera type */
  selectedCamera: string;
  /** Custom camera override */
  customCamera: string;
  /** Selected lens */
  selectedLens: string;
  /** Custom lens override */
  customLens: string;
  /** Selected shot type */
  selectedShot: string;
  /** Custom shot override */
  customShot: string;
  /** Depth of field setting */
  depthOfField: string;
  /** Aspect ratio setting */
  aspectRatio: string;
  /** Update camera with conflict auto-clearing */
  setCamera: (camera: string) => void;
  /** Update custom camera */
  setCustomCamera: (value: string) => void;
  /** Update lens */
  setSelectedLens: (value: string) => void;
  /** Update custom lens */
  setCustomLens: (value: string) => void;
  /** Update shot type */
  setSelectedShot: (value: string) => void;
  /** Update custom shot */
  setCustomShot: (value: string) => void;
  /** Update depth of field */
  setDepthOfField: (value: string) => void;
  /** Update aspect ratio */
  setAspectRatio: (value: string) => void;
  /** Reset all camera settings */
  reset: () => void;
}

/**
 * Director state and handlers
 */
export interface DirectorState {
  /** Selected director style */
  selectedDirector: string;
  /** Update director with conflict auto-clearing */
  setDirector: (director: string) => void;
  /** Reset director selection */
  reset: () => void;
}

/**
 * Advanced settings state and handlers
 */
export interface AdvancedState {
  /** Negative prompt text */
  negativePrompt: string;
  /** Whether advanced section is visible */
  showAdvanced: boolean;
  /** Update negative prompt */
  setNegativePrompt: (value: string) => void;
  /** Toggle advanced section visibility */
  setShowAdvanced: (value: boolean) => void;
  /** Reset advanced settings */
  reset: () => void;
}

/**
 * UI section state and handlers
 */
export interface SectionState {
  /** Expanded state for each section */
  expandedSections: ExpandedSections;
  /** Locked state for each section */
  lockedSections: LockedSections;
  /** Toggle a section's expanded state */
  toggleSection: (key: keyof ExpandedSections) => void;
  /** Toggle a section's locked state */
  toggleLock: (key: keyof LockedSections) => void;
  /** Check if a section is locked */
  isLocked: (key: keyof LockedSections) => boolean;
}

/**
 * Clipboard state and handlers
 */
export interface ClipboardState {
  /** Whether content was recently copied */
  copied: boolean;
  /** Copy text to clipboard */
  copy: (text: string) => Promise<void>;
}

/**
 * Theme state and handlers
 */
export interface ThemeState {
  /** Current dark mode setting */
  darkMode: boolean;
  /** Computed theme colors */
  themeColors: ThemeColors;
  /** Toggle dark mode */
  setDarkMode: (value: boolean) => void;
}

/**
 * Parameters for camera state hook with conflict handling
 */
export interface UseCameraStateParams {
  /** Whether camera section is locked */
  isLocked: boolean;
  /** Current atmosphere selection (for conflict clearing) */
  selectedAtmosphere: Atmosphere | null;
  /** Current visual preset (for conflict clearing) */
  selectedVisualPreset: string | null;
  /** Callback to clear atmosphere on conflict */
  onClearAtmosphere: () => void;
  /** Callback to clear visual preset on conflict */
  onClearVisualPreset: () => void;
}

/**
 * Parameters for director state hook with conflict handling
 */
export interface UseDirectorStateParams {
  /** Whether director section is locked */
  isLocked: boolean;
  /** Current atmosphere selection (for conflict clearing) */
  selectedAtmosphere: Atmosphere | null;
  /** Current visual preset (for conflict clearing) */
  selectedVisualPreset: string | null;
  /** Callback to clear atmosphere on conflict */
  onClearAtmosphere: () => void;
  /** Callback to clear visual preset on conflict */
  onClearVisualPreset: () => void;
}

/**
 * Combined state returned by usePromptGeneratorState
 */
export interface PromptGeneratorStateReturn {
  // Theme
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  copied: boolean;
  themeColors: ThemeColors;

  // Model
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;

  // Creative Controls
  creativity: number;
  setCreativity: (value: number) => void;
  variation: number;
  setVariation: (value: number) => void;
  uniqueness: number;
  setUniqueness: (value: number) => void;
  creativeControlsEnabled: boolean;
  setCreativeControlsEnabled: (value: boolean) => void;

  // Content
  subject: string;
  setSubject: (value: string) => void;
  characterItems: CharacterItem[];
  currentCharacter: string;
  setCurrentCharacter: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  addCharacter: () => void;
  removeCharacter: (id: string) => void;

  // Visual
  selectedAtmosphere: Atmosphere | null;
  setSelectedAtmosphere: (value: Atmosphere | null) => void;
  selectedVisualPreset: string | null;
  setSelectedVisualPreset: (value: string | null) => void;
  selectedLighting: string | null;
  setSelectedLighting: (value: string | null) => void;
  selectedColorPalette: string | null;
  setSelectedColorPalette: (value: string | null) => void;
  customColors: string[];
  setCustomColors: (colors: string[]) => void;

  // Camera
  selectedCamera: string;
  customCamera: string;
  setCustomCamera: (value: string) => void;
  selectedLens: string;
  setSelectedLens: (value: string) => void;
  customLens: string;
  setCustomLens: (value: string) => void;
  selectedShot: string;
  setSelectedShot: (value: string) => void;
  customShot: string;
  setCustomShot: (value: string) => void;
  depthOfField: string;
  setDepthOfField: (value: string) => void;
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  handleCameraChange: (camera: string) => void;

  // Director
  selectedDirector: string;
  handleDirectorChange: (director: string) => void;

  // Advanced
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;

  // UI
  lockedSections: LockedSections;
  toggleLock: (key: keyof LockedSections) => void;
  expandedSections: ExpandedSections;
  toggleSection: (key: string) => void;
  conflicts: ConflictResult;

  // Actions
  prompt: string;
  copyToClipboard: () => Promise<void>;
  resetAll: () => void;
}
