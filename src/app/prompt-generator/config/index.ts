/**
 * Configuration exports
 * Central export point for all configuration modules
 */

// Types
export * from './types';

// Model configurations
export { modelConfigs } from './models';

// Visual styling
export { atmosphereConfigs } from './atmospheres';
export { visualPresets } from './visualPresets';
export { lightingOptions } from './lighting';
export { colorPalettes } from './colorPalettes';

// Camera and cinematography
export {
  cameraOptions,
  camerasByCategory,
  cameraCategoryNames,
  lensOptions,
  shotOptions,
  dofOptions,
  aspectRatioOptions,
  cameraAspectRatios,
} from './cameraOptions';
export type { CameraCategory, CameraOptionWithCategory } from './cameraOptions';

// Director styles
export { directorStyles } from './directorStyles';

// Location presets
export {
  locationPresets,
  locationPresetsByCategory,
  locationCategoryNames,
} from './locationPresets';
export type { LocationPreset } from './locationPresets';

// Conflict detection
export {
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  cameraLocationConflicts,
  atmosphereBlocksCategories,
  atmosphereBlocksDOF,
  atmosphereLightingRedundancy,
  atmosphereLightingExclusions,
  atmosphereShotConflicts,
  presetMutualExclusions,
  presetBlocksCategories,
  lightingCategories,
  redundancyWarnings,
  directorLightingRedundancy,
  directorPresetRedundancy,
  directorAtmosphereRedundancy,
} from './conflicts';
export type { RedundancyKey, DirectorWithConflicts } from './conflicts';

// Help descriptions
export { helpDescriptions } from './helpDescriptions';
export type { HelpDescription } from './helpDescriptions';
