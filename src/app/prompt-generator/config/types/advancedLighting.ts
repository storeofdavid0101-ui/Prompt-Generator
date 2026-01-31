/**
 * Advanced Lighting Type Definitions
 *
 * Types for professional lighting control with key/fill/rim positioning,
 * ratios, color temperature, and shadow control.
 *
 * @module config/types/advancedLighting
 */

/**
 * Key light position options.
 */
export type KeyLightPosition =
  | 'front'
  | 'front-left'
  | 'front-right'
  | 'side-left'
  | 'side-right'
  | 'back'
  | 'top'
  | 'under';

/**
 * Key to fill lighting ratio options.
 */
export type KeyFillRatio = '1:1' | '2:1' | '4:1' | '8:1' | '16:1';

/**
 * Rim light position options.
 */
export type RimLightPosition = 'left' | 'right' | 'both';

/**
 * Light quality/softness options.
 */
export type LightQuality = 'hard' | 'soft' | 'diffused';

/**
 * Rim light configuration.
 */
export interface RimLightConfig {
  /** Whether rim light is enabled */
  readonly enabled: boolean;
  /** Position of rim light */
  readonly position: RimLightPosition;
}

/**
 * Advanced lighting state interface.
 */
export interface AdvancedLightingState {
  /** Whether advanced lighting controls are enabled */
  readonly enabled: boolean;

  /** Key light position */
  readonly keyLightPosition: KeyLightPosition;

  /** Key to fill ratio */
  readonly keyFillRatio: KeyFillRatio;

  /** Color temperature in Kelvin (2700-6500K) */
  readonly colorTemperature: number;

  /** Shadow stop adjustment (-3 to +1) */
  readonly shadowStop: number;

  /** Rim light configuration */
  readonly rimLight: RimLightConfig;

  /** Light quality/softness */
  readonly lightQuality: LightQuality;
}

/**
 * Key light position preset configuration.
 */
export interface KeyLightPositionPreset {
  readonly id: KeyLightPosition;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
  readonly icon?: string;
}

/**
 * Key fill ratio preset configuration.
 */
export interface KeyFillRatioPreset {
  readonly id: KeyFillRatio;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}

/**
 * Light quality preset configuration.
 */
export interface LightQualityPreset {
  readonly id: LightQuality;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}
