/**
 * Camera Type Definitions
 *
 * Type definitions for camera systems, lenses, shots, and depth of field.
 * Used for realistic camera simulation in AI image generation.
 *
 * @module config/types/camera
 * @version 1.0.0
 */

/**
 * Depth of field preset values.
 *
 * Controls the range of focus in the generated image:
 * - `shallow`: Strong background blur, subject isolation
 * - `normal`: Natural focus range
 * - `deep`: Maximum depth, everything in focus
 * - `tilt-shift`: Selective focus plane, miniature effect
 */
export type DOFValue = 'shallow' | 'normal' | 'deep' | 'tilt-shift';

/**
 * Camera category classifications.
 *
 * Groups cameras by era and capability for conflict detection:
 * - Vintage cameras restrict modern lenses
 * - Film cameras have specific aesthetic constraints
 * - Consumer/mobile cameras have fixed characteristics
 */
export type CameraCategory =
  | 'vintage-lofi'
  | 'antique'
  | 'classic-film'
  | 'epic-film'
  | 'medium-format-classic'
  | '35mm-classic'
  | 'modern-cinema'
  | 'modern-digital'
  | 'consumer-mobile'
  | 'none';

/**
 * Camera option configuration.
 *
 * Defines a selectable camera with AI-optimized keywords.
 */
export interface CameraOption {
  /** Display label for UI dropdown */
  readonly label: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;
}

/**
 * Shot type option configuration.
 *
 * Defines a shot composition type with AI-optimized keywords.
 */
export interface ShotOption {
  /** Display label for UI dropdown */
  readonly label: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;
}

/**
 * Depth of field option configuration.
 *
 * Maps DOF presets to display labels and keywords.
 */
export interface DOFOption {
  /** DOF preset value */
  readonly value: DOFValue | string;

  /** Display label for UI */
  readonly label: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;
}

/**
 * Aspect ratio option configuration.
 *
 * Defines supported image dimensions.
 */
export interface AspectRatioOption {
  /** Aspect ratio value (e.g., '16:9', '1:1') */
  readonly value: string;

  /** Display label for UI */
  readonly label: string;

  /** Numeric ratio representation */
  readonly ratio: string;
}

/**
 * Zoom range configuration.
 *
 * For cameras with built-in zoom lenses, defines available focal lengths.
 */
export interface ZoomRange {
  /** Human-readable range description (e.g., '24-70mm') */
  readonly range: string;

  /** Available focal length options */
  readonly options: readonly string[];
}
