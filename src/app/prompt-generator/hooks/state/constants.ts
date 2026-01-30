/**
 * Constants for State Hooks
 *
 * Centralizes all default values and magic numbers used across state hooks.
 * Ensures consistency and makes maintenance easier.
 *
 * @module hooks/state/constants
 */

import type { AIModel, ExpandedSections, LockedSections } from '../../config/types';

/**
 * Default AI model selection
 */
export const DEFAULT_MODEL: AIModel = 'chatgpt';

/**
 * Creative controls defaults type
 */
interface CreativeControlsDefaults {
  creativity: number;
  variation: number;
  uniqueness: number;
  enabled: boolean;
}

/**
 * Default creative control values
 */
export const CREATIVE_CONTROLS_DEFAULTS: CreativeControlsDefaults = {
  /** Default creativity slider value */
  creativity: 50,
  /** Default variation slider value */
  variation: 50,
  /** Default uniqueness slider value */
  uniqueness: 50,
  /** Whether creative controls are enabled by default */
  enabled: false,
};

/**
 * Camera defaults type for proper inference
 */
interface CameraDefaults {
  camera: string;
  customCamera: string;
  lens: string;
  customLens: string;
  shot: string;
  customShot: string;
  depthOfField: string;
  aspectRatio: string;
}

/**
 * Default camera settings
 */
export const CAMERA_DEFAULTS: CameraDefaults = {
  /** Default selected camera (empty = none) */
  camera: '',
  /** Default custom camera input */
  customCamera: '',
  /** Default lens selection */
  lens: '50mm',
  /** Default custom lens input */
  customLens: '',
  /** Default shot type */
  shot: 'Medium Shot (MS)',
  /** Default custom shot input */
  customShot: '',
  /** Default depth of field */
  depthOfField: 'normal',
  /** Default aspect ratio */
  aspectRatio: 'none',
};

/**
 * Default custom colors array (6 empty slots)
 */
export const DEFAULT_CUSTOM_COLORS: string[] = ['', '', '', '', '', ''];

/**
 * Number of custom color slots
 */
export const CUSTOM_COLOR_COUNT = 6;

/**
 * Default expanded sections state
 * Controls which sections are initially visible
 */
export const DEFAULT_EXPANDED_SECTIONS: ExpandedSections = {
  model: true,
  sliders: true,
  atmosphere: true,
  visual: false,
  color: false,
  camera: false,
  lighting: false,
};

/**
 * Default locked sections state
 * All sections start unlocked
 */
export const DEFAULT_LOCKED_SECTIONS: LockedSections = {
  model: false,
  subject: false,
  director: false,
  atmosphere: false,
  visual: false,
  color: false,
  camera: false,
  lighting: false,
  advanced: false,
};

/**
 * Clipboard feedback duration in milliseconds
 */
export const CLIPBOARD_FEEDBACK_DURATION = 2000;

/**
 * Theme defaults type
 */
interface ThemeDefaults {
  darkMode: boolean;
}

/**
 * Theme defaults
 */
export const THEME_DEFAULTS: ThemeDefaults = {
  /** Start in dark mode by default */
  darkMode: true,
};
