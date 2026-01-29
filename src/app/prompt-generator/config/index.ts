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
  lensOptions,
  shotOptions,
  dofOptions,
  aspectRatioOptions,
  cameraAspectRatios,
} from './cameraOptions';

// Director styles
export { directorStyles } from './directorStyles';

// Conflict detection
export {
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  atmosphereBlocksCategories,
  presetBlocksCategories,
} from './conflicts';
