/**
 * Director Style Conflict Configuration
 *
 * Defines redundancy warnings when director styles overlap with:
 * - Lighting choices
 * - Visual presets
 * - Atmosphere selections
 *
 * These are not hard blocks, but inform users of redundant selections.
 *
 * @module conflicts/director
 */

import type { Atmosphere, LightingKey, VisualPresetKey } from '../types';

/**
 * Director names that have defined conflict relationships.
 * Used for type safety in conflict mappings.
 */
export type DirectorWithConflicts =
  | 'Wong Kar-wai'
  | 'Terrence Malick'
  | 'David Fincher'
  | 'David Lynch';

/**
 * Director + Lighting redundancy warnings.
 * Identifies when a director's signature style already includes the lighting aesthetic.
 *
 * @example
 * // Wong Kar-wai's style already includes neon nights and golden hour warmth
 * directorLightingRedundancy['Wong Kar-wai'] // ['neon', 'goldenhour']
 */
export const directorLightingRedundancy: Partial<Record<DirectorWithConflicts, LightingKey[]>> = {
  'Wong Kar-wai': ['neon', 'goldenhour'],
  'Terrence Malick': ['goldenhour'],
};

/**
 * Director + Preset redundancy warnings.
 * Identifies when a director's color grade already matches the preset.
 *
 * @example
 * // David Fincher's style already includes desaturated color grading
 * directorPresetRedundancy['David Fincher'] // ['desaturated']
 */
export const directorPresetRedundancy: Partial<Record<DirectorWithConflicts, VisualPresetKey[]>> = {
  'David Fincher': ['desaturated'],
};

/**
 * Director + Atmosphere redundancy warnings.
 * Identifies when a director's style already embodies the atmosphere.
 *
 * @example
 * // David Lynch's style already includes moody/dark atmosphere
 * directorAtmosphereRedundancy['David Lynch'] // ['moody']
 */
export const directorAtmosphereRedundancy: Partial<Record<DirectorWithConflicts, Atmosphere[]>> = {
  'David Lynch': ['moody'],
};
