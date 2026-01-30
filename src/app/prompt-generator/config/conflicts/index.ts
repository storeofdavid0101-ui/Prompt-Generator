/**
 * Conflict Detection Configuration
 *
 * Central export point for all conflict detection rules.
 * Manages incompatibilities between:
 * - Camera types and categories
 * - Atmospheres and visual settings
 * - Lighting and preset combinations
 * - Director style redundancies
 *
 * @module conflicts
 */

// Camera-related conflicts
export {
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  cameraLocationConflicts,
} from './camera';

// Atmosphere-related conflicts
export {
  atmosphereBlocksCategories,
  atmosphereBlocksDOF,
  atmosphereLightingRedundancy,
  atmosphereLightingExclusions,
  atmosphereShotConflicts,
} from './atmosphere';

// Visual preset and lighting conflicts
export {
  presetMutualExclusions,
  presetBlocksCategories,
  lightingCategories,
  redundancyWarnings,
} from './visual';
export type { RedundancyKey } from './visual';

// Director style conflicts
export {
  directorLightingRedundancy,
  directorPresetRedundancy,
  directorAtmosphereRedundancy,
} from './director';
export type { DirectorWithConflicts } from './director';
