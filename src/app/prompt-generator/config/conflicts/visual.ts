/**
 * Visual Style Conflict Configuration
 *
 * Defines relationships between visual presets and lighting:
 * - Preset mutual exclusions (opposite styles)
 * - Camera category restrictions for presets
 * - Lighting categorization
 * - Redundancy warnings for combined selections
 *
 * @module conflicts/visual
 */

import type { CameraCategory, LightingCategory, LightingKey, VisualPresetKey } from '../types';

/**
 * Visual preset mutual exclusions.
 * Direct opposites that should not be combined.
 *
 * @example
 * // Vivid and desaturated are opposite color treatments
 * presetMutualExclusions.vivid // ['desaturated']
 */
export const presetMutualExclusions: Partial<Record<VisualPresetKey, VisualPresetKey[]>> = {
  vivid: ['desaturated'],
  desaturated: ['vivid'],
  raw: ['filmlook', 'bleachbypass'],
  filmlook: ['raw'],
  bleachbypass: ['raw'],
};

/**
 * Visual presets that block certain camera categories.
 * High-fidelity color treatments are incompatible with lo-fi cameras.
 */
export const presetBlocksCategories: Partial<Record<VisualPresetKey, CameraCategory[]>> = {
  vivid: ['vintage-lofi', 'antique'],
  highcontrast: ['vintage-lofi', 'antique'],
};

/**
 * Lighting style categorization.
 * Groups lighting options by their aesthetic family.
 */
export const lightingCategories: Record<LightingKey, LightingCategory> = {
  rembrandt: 'classic',
  chiaroscuro: 'classic',
  highkey: 'classic',
  lowkey: 'classic',
  goldenhour: 'natural',
  bluehour: 'natural',
  moonlit: 'natural',
  practical: 'natural',
  neon: 'stylized',
  godrays: 'stylized',
  softbox: 'stylized',
};

/**
 * Type for redundancy warning keys.
 * Format: "setting1+setting2"
 */
export type RedundancyKey =
  | 'cyberpunk+neon'
  | 'moody+lowkey'
  | 'moody+chiaroscuro'
  | 'studio+softbox'
  | 'studio+highkey'
  | 'vivid+desaturated';

/**
 * Human-readable warning messages for redundant selections.
 * Explains why certain combinations are unnecessary.
 */
export const redundancyWarnings: Record<RedundancyKey, string> = {
  'cyberpunk+neon': 'Cyberpunk atmosphere already includes neon aesthetic',
  'moody+lowkey': 'Moody atmosphere already implies dark, low-key lighting',
  'moody+chiaroscuro': 'Moody atmosphere already implies dramatic shadows',
  'studio+softbox': 'Studio atmosphere already includes softbox lighting',
  'studio+highkey': 'Studio atmosphere already implies bright, even lighting',
  'vivid+desaturated': 'Vivid and Desaturated are opposite styles',
};
