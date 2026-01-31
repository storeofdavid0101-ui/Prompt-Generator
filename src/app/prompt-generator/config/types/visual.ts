/**
 * Visual Style Type Definitions
 *
 * Type definitions for visual styling components including
 * atmospheres, presets, lighting, and color palettes.
 *
 * @module config/types/visual
 * @version 1.0.0
 */

/**
 * Atmosphere preset identifiers.
 *
 * Atmospheres define the overall mood and visual tone of the generated image.
 * Each atmosphere applies specific keywords and color grading to the prompt.
 */
export type Atmosphere =
  | 'cinematic'
  | 'cyberpunk'
  | 'studio'
  | 'moody'
  | 'dreamy'
  | 'natural'
  | 'vintage'
  | 'epic'
  | 'horror'
  | 'romantic';

/**
 * Visual preset identifiers for color grading styles.
 *
 * Presets modify the color treatment and post-processing look.
 * Named after common film and photography techniques.
 */
export type VisualPresetKey =
  | 'raw'
  | 'highcontrast'
  | 'desaturated'
  | 'vivid'
  | 'filmlook'
  | 'bleachbypass';

/**
 * Lighting style identifiers.
 *
 * Professional lighting setups and natural lighting conditions.
 * Each produces distinct shadow patterns and mood.
 */
export type LightingKey =
  | 'rembrandt'
  | 'chiaroscuro'
  | 'highkey'
  | 'lowkey'
  | 'goldenhour'
  | 'bluehour'
  | 'moonlit'
  | 'practical'
  | 'neon'
  | 'godrays'
  | 'softbox';

/**
 * Lighting category classifications.
 *
 * Groups lighting options by their origin/style:
 * - `classic`: Traditional studio/painting techniques
 * - `natural`: Outdoor/ambient lighting conditions
 * - `stylized`: Creative/artistic lighting effects
 */
export type LightingCategory = 'classic' | 'natural' | 'stylized';

/**
 * Atmosphere preset configuration.
 *
 * Defines how an atmosphere is displayed and applied to prompts.
 */
export interface AtmosphereConfig {
  /** Display name for UI */
  readonly name: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;

  /**
   * Safe keywords for models with strict content policies (ChatGPT, DALL-E).
   * Falls back to keywords if not provided.
   */
  readonly safeKeywords?: string;

  /** CSS gradient for visual preview */
  readonly gradient: string;

  /** Human-readable description */
  readonly description: string;
}

/**
 * Visual style preset configuration.
 *
 * Defines color grading and post-processing keywords.
 */
export interface PresetConfig {
  /** Display name for UI */
  readonly name: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;

  /** CSS gradient for visual preview */
  readonly gradient: string;
}

/**
 * Lighting option configuration.
 *
 * Defines lighting setup keywords and categorization.
 */
export interface LightingConfig {
  /** Display name for UI */
  readonly name: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;

  /** Classification category */
  readonly category: LightingCategory;

  /** CSS gradient for visual preview */
  readonly gradient: string;
}

/**
 * Color palette configuration.
 *
 * Predefined color schemes for prompt enhancement.
 */
export interface ColorPaletteConfig {
  /** Display name for UI */
  readonly name: string;

  /** Array of hex color values (typically 6 colors) */
  readonly colors: readonly string[];
}
