/**
 * Advanced Lighting State Types
 *
 * Type definitions for the advanced lighting state hook.
 *
 * @module hooks/state/types/advancedLighting
 */

import type {
  KeyLightPosition,
  KeyFillRatio,
  LightQuality,
  RimLightConfig,
  RimLightPosition,
} from '../../../config/types/advancedLighting';

/**
 * Return type for useAdvancedLightingState hook.
 */
export interface AdvancedLightingStateReturn {
  /** Whether advanced lighting is enabled */
  readonly enabled: boolean;

  /** Set enabled state */
  readonly setEnabled: (enabled: boolean) => void;

  /** Key light position */
  readonly keyLightPosition: KeyLightPosition;

  /** Set key light position */
  readonly setKeyLightPosition: (position: KeyLightPosition) => void;

  /** Key to fill ratio */
  readonly keyFillRatio: KeyFillRatio;

  /** Set key fill ratio */
  readonly setKeyFillRatio: (ratio: KeyFillRatio) => void;

  /** Color temperature in Kelvin */
  readonly colorTemperature: number;

  /** Set color temperature */
  readonly setColorTemperature: (kelvin: number) => void;

  /** Shadow stop adjustment */
  readonly shadowStop: number;

  /** Set shadow stop */
  readonly setShadowStop: (stop: number) => void;

  /** Rim light configuration */
  readonly rimLight: RimLightConfig;

  /** Set rim light enabled */
  readonly setRimLightEnabled: (enabled: boolean) => void;

  /** Set rim light position */
  readonly setRimLightPosition: (position: RimLightPosition) => void;

  /** Light quality */
  readonly lightQuality: LightQuality;

  /** Set light quality */
  readonly setLightQuality: (quality: LightQuality) => void;

  /** Reset to defaults */
  readonly reset: () => void;
}
