/**
 * Application State Type Definitions
 *
 * Type definitions for the main application state and UI state management.
 * Defines the complete state shape for the prompt generator.
 *
 * @module config/types/state
 * @version 1.0.0
 */

import type { AIModel, CharacterItem } from './core';
import type { Atmosphere } from './visual';

/**
 * Expanded sections state.
 *
 * Tracks which collapsible sections are currently expanded in the UI.
 */
export interface ExpandedSections {
  /** Model selection section */
  readonly model: boolean;

  /** Creative sliders section */
  readonly sliders: boolean;

  /** Atmosphere selection section */
  readonly atmosphere: boolean;

  /** Visual preset section */
  readonly visual: boolean;

  /** Color palette section */
  readonly color: boolean;

  /** Camera settings section */
  readonly camera: boolean;

  /** Lighting selection section */
  readonly lighting: boolean;
}

/**
 * Section keys that can be expanded.
 */
export type ExpandedSectionKey = keyof ExpandedSections;

/**
 * Locked sections state.
 *
 * Tracks which sections are locked from randomization.
 * Locked sections preserve their values during shuffle operations.
 */
export interface LockedSections {
  /** Model selection locked */
  readonly model: boolean;

  /** Subject input locked */
  readonly subject: boolean;

  /** Director style locked */
  readonly director: boolean;

  /** Atmosphere locked */
  readonly atmosphere: boolean;

  /** Visual preset locked */
  readonly visual: boolean;

  /** Color palette locked */
  readonly color: boolean;

  /** Camera settings locked */
  readonly camera: boolean;

  /** Lighting locked */
  readonly lighting: boolean;

  /** Advanced settings locked */
  readonly advanced: boolean;
}

/**
 * Section keys that can be locked.
 */
export type LockedSectionKey = keyof LockedSections;

/**
 * Main prompt generator state interface.
 *
 * Complete state shape for the prompt generator application.
 * Used for state management and persistence.
 */
export interface PromptGeneratorState {
  /** Dark mode enabled */
  readonly darkMode: boolean;

  /** Clipboard copy success indicator */
  readonly copied: boolean;

  /** Currently selected AI model */
  readonly selectedModel: AIModel;

  /** Creativity slider value (0-100) */
  readonly creativity: number;

  /** Variation slider value (0-100) */
  readonly variation: number;

  /** Uniqueness slider value (0-100) */
  readonly uniqueness: number;

  /** Main subject description */
  readonly subject: string;

  /** Array of character items for multi-character prompts */
  readonly characterItems: readonly CharacterItem[];

  /** Current character input value */
  readonly currentCharacter: string;

  /** Location/setting description */
  readonly location: string;

  /** Selected atmosphere preset (null = none) */
  readonly selectedAtmosphere: Atmosphere | null;

  /** Selected visual preset key (null = none) */
  readonly selectedVisualPreset: string | null;

  /** Selected lighting key (null = none) */
  readonly selectedLighting: string | null;

  /** Selected color palette name (null = none) */
  readonly selectedColorPalette: string | null;

  /** Custom color hex values */
  readonly customColors: readonly string[];

  /** Selected camera identifier */
  readonly selectedCamera: string;

  /** Custom camera description */
  readonly customCamera: string;

  /** Selected lens identifier */
  readonly selectedLens: string;

  /** Custom lens description */
  readonly customLens: string;

  /** Selected shot type identifier */
  readonly selectedShot: string;

  /** Custom shot description */
  readonly customShot: string;

  /** Selected depth of field value */
  readonly depthOfField: string;

  /** Selected aspect ratio */
  readonly aspectRatio: string;

  /** Negative prompt content */
  readonly negativePrompt: string;

  /** Global settings lock enabled */
  readonly settingsLocked: boolean;

  /** Advanced settings panel visible */
  readonly showAdvanced: boolean;

  /** Creative controls sliders enabled */
  readonly creativeControlsEnabled: boolean;

  /** Selected director style identifier */
  readonly selectedDirector: string;

  /** Expanded sections state */
  readonly expandedSections: ExpandedSections;
}
