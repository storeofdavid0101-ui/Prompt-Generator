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
  lensesByCategory,
  lensCategoryNames,
  shotOptions,
  shotsByCategory,
  shotCategoryNames,
  dofOptions,
  aspectRatioOptions,
  aspectRatioOptionsWithCategory,
  aspectCategoryNames,
  cameraAspectRatios,
} from './cameraOptions';
export type {
  CameraCategory,
  CameraOptionWithCategory,
  LensCategory,
  LensOptionWithCategory,
  ShotCategory,
  ShotOptionWithCategory,
  AspectCategory,
  AspectRatioOptionWithCategory,
} from './cameraOptions';

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
  // Location conflicts
  locationMeta,
  atmosphereEraConflicts,
  lightingLocationConflicts,
  shotScaleConflicts,
  getLocationMeta,
  isAtmosphereBlockedByLocation,
  isLightingBlockedByLocation,
  // Camera grammar conflicts
  shotGrammar,
  shotLensConflicts,
  shotDOFConflicts,
  lensDOFConflicts,
  lensRecommendedShots,
  isLensBlockedByShot,
  isDOFBlockedByShot,
  isDOFBlockedByLens,
  getRecommendedShots,
  getBlockedLensesForShot,
  // Style stacking
  directorImpliedStyles,
  atmosphereImpliedStyles,
  presetImpliedStyles,
  lightingImpliedStyles,
  STYLE_CATEGORY_LIMITS,
  analyzeStyleStacking,
  getReducingOptions,
  // Director-lens conflicts
  directorBlockedLens,
  getDirectorBlockedLenses,
  // Subject-location compatibility
  filterCompatibleLocations,
} from './conflicts';
export type {
  RedundancyKey,
  DirectorWithConflicts,
  LocationCategory,
  LocationMetaCategory,
  LocationScale,
  LocationEra,
  LocationMeta,
  ShotGrammar,
  StyleCategory,
  StyleStackingAnalysis,
} from './conflicts';

// Help descriptions
export { helpDescriptions } from './helpDescriptions';
export type { HelpDescription } from './helpDescriptions';

// Magic randomize subjects
export {
  magicSubjects,
  magicCharacters,
  getRandomItem,
  getRandomSubject,
  getRandomSubjectWithMeta,
  getSubjectText,
  getRandomCharacter,
  getCharacterText,
  getMatchingCharacter,
  getSubjectThemes,
} from './magicSubjects';
export type { MagicSubject, MagicCharacter, SubjectTheme } from './magicSubjects';
