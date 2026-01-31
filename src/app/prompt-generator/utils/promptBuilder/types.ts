/**
 * @fileoverview Type definitions for the prompt builder system.
 * Defines all interfaces and types used across the prompt generation pipeline.
 */

import type { AIModel, CharacterItem } from '../../config/types';

/**
 * Input parameters for prompt generation.
 * Contains all user selections and settings needed to build a complete prompt.
 */
export interface PromptBuilderParams {
  /** Main subject or scene description */
  subject: string;

  /** Array of character items added to the scene */
  characterItems: CharacterItem[];

  /** Currently typed character (not yet added) */
  currentCharacter: string;

  /** Selected gaze direction for character */
  gazeDirection: string;

  /** Selected pose/action for character */
  poseAction: string;

  /** Character position in frame (left/center/right) */
  characterPosition: string;

  /** Scene location or setting */
  location: string;

  /** Selected visual style preset identifier */
  selectedVisualPreset: string | null;

  /** Selected color palette identifier or 'custom' */
  selectedColorPalette: string | null;

  /** Array of custom hex color codes */
  customColors: string[];

  /** Selected atmosphere/mood identifier */
  selectedAtmosphere: string | null;

  /** Selected lighting style identifier */
  selectedLighting: string | null;

  /** Selected director's visual style */
  selectedDirector: string;

  /** Selected camera model/type */
  selectedCamera: string;

  /** Custom camera specification (overrides selectedCamera) */
  customCamera: string;

  /** Selected lens specification */
  selectedLens: string;

  /** Custom lens specification (overrides selectedLens) */
  customLens: string;

  /** Selected shot type (close-up, wide, etc.) */
  selectedShot: string;

  /** Custom shot type (overrides selectedShot) */
  customShot: string;

  /** Depth of field setting identifier */
  depthOfField: string;

  /** Aspect ratio selection */
  aspectRatio: string;

  /** Target AI model for prompt optimization */
  selectedModel: AIModel;

  /** Negative prompt content (elements to avoid) */
  negativePrompt: string;

  /** Whether creative control sliders are enabled */
  creativeControlsEnabled: boolean;

  /** Creativity slider value (0-100) */
  creativity: number;

  /** Variation slider value (0-100) */
  variation: number;

  /** Uniqueness slider value (0-100) */
  uniqueness: number;
}

/**
 * Model-specific slider parameter translations.
 * Contains formatted parameter strings for each control type.
 */
export interface SliderParams {
  /** Formatted creativity parameter for the model */
  creativity: string;

  /** Formatted variation parameter for the model */
  variation: string;

  /** Formatted quality parameter for the model */
  quality: string;
}

/**
 * Resolved prompt component values.
 * Contains processed values ready for prompt composition.
 */
export interface ResolvedComponents {
  /** Trimmed subject text */
  subject: string;

  /** All character descriptions combined */
  characters: string[];

  /** Gaze direction keywords or null */
  gaze: string | null;

  /** Pose/action keywords or null */
  pose: string | null;

  /** Character position keywords or null */
  position: string | null;

  /** Formatted location string */
  location: string;

  /** Visual preset keywords or null */
  visualPreset: string | null;

  /** Color palette value (preset colors or custom hex codes) */
  colorPalette: string | null;

  /** Atmosphere keywords or null */
  atmosphere: string | null;

  /** Lighting keywords or null */
  lighting: string | null;

  /** Director style keywords or null */
  director: string | null;

  /** Camera model keywords or null */
  camera: string | null;

  /** Lens specification or null */
  lens: string | null;

  /** Shot type keywords or null */
  shot: string | null;

  /** Depth of field keywords or null */
  dof: string | null;
}

/**
 * Context passed to model strategies for prompt finalization.
 * Contains all necessary data for model-specific formatting.
 */
export interface ModelContext {
  /** Base prompt before model-specific additions */
  basePrompt: string;

  /** Resolved aspect ratio value */
  aspectRatio: string | null;

  /** Aspect ratio display format (e.g., "16:9") */
  aspectRatioDisplay: string | null;

  /** Negative prompt text */
  negativePrompt: string;

  /** Whether creative controls are enabled */
  creativeControlsEnabled: boolean;

  /** Translated slider parameters */
  sliderParams: SliderParams;
}

/**
 * Re-export AIModel for convenience.
 */
export type { AIModel, CharacterItem };
