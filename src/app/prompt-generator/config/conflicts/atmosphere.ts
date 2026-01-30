/**
 * Atmosphere Conflict Configuration
 *
 * Defines relationships between atmospheres and other settings:
 * - Camera category restrictions
 * - DOF incompatibilities
 * - Lighting redundancies
 * - Shot type mismatches
 *
 * @module conflicts/atmosphere
 */

import type { Atmosphere, CameraCategory, DOFValue, LightingKey } from '../types';

/**
 * Atmospheres that block specific camera categories.
 * These combinations produce technically impossible or aesthetically jarring results.
 *
 * @example
 * // Studio atmosphere blocks vintage-lofi and antique cameras
 * atmosphereBlocksCategories.studio // ['vintage-lofi', 'antique']
 */
export const atmosphereBlocksCategories: Partial<Record<Atmosphere, CameraCategory[]>> = {
  studio: ['vintage-lofi', 'antique'],
  cyberpunk: ['antique'],
};

/**
 * Atmospheres that block specific DOF settings.
 * Prevents effect stacking that causes visual artifacts.
 *
 * @example
 * // Dreamy atmosphere already includes soft focus/bokeh effects
 * atmosphereBlocksDOF.dreamy // ['shallow']
 */
export const atmosphereBlocksDOF: Partial<Record<Atmosphere, DOFValue[]>> = {
  dreamy: ['shallow'],
};

/**
 * Atmosphere + Lighting redundancy warnings.
 * Identifies combinations where the atmosphere already implies the lighting style.
 *
 * @example
 * // Cyberpunk atmosphere already includes neon aesthetic
 * atmosphereLightingRedundancy.cyberpunk // ['neon']
 */
export const atmosphereLightingRedundancy: Partial<Record<Atmosphere, LightingKey[]>> = {
  cyberpunk: ['neon'],
  moody: ['lowkey', 'chiaroscuro'],
  studio: ['softbox', 'highkey'],
};

/**
 * Atmosphere + Lighting mutual exclusions.
 * These combinations should not be selected together (one implies the other).
 */
export const atmosphereLightingExclusions: Partial<Record<Atmosphere, LightingKey[]>> = {
  studio: ['softbox', 'highkey'],
};

/**
 * Atmosphere + Shot type conflicts.
 * Identifies scale mismatches between atmosphere scope and shot framing.
 *
 * @example
 * // Epic atmosphere conflicts with extreme close-ups (scale mismatch)
 * atmosphereShotConflicts.epic // ['Extreme Close-Up (ECU)']
 */
export const atmosphereShotConflicts: Partial<Record<Atmosphere, string[]>> = {
  epic: ['Extreme Close-Up (ECU)'],
};
