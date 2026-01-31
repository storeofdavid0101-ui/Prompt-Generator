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

// Character Creator
export {
  DEFAULT_FACE_FEATURES,
  faceFeatureConfigs,
  characterCreatorHelp,
  featureGroups,
} from './characterCreator';

// Color Grading
export {
  colorGradingPresets,
  getPresetsByCategory,
  DEFAULT_COLOR_WHEELS,
  DEFAULT_COLOR_WHEEL,
  DEFAULT_TEMPERATURE_TINT,
  DEFAULT_SPLIT_TONING,
  DEFAULT_GLOBAL_ADJUSTMENTS,
} from './colorGrading';

// Output Format
export {
  DEFAULT_OUTPUT_MODE,
  outputModeConfigs,
  outputModeOptions,
} from './outputFormat';

// Film Stock
export {
  FILM_STOCK_DEFAULTS,
  filmStockPresets,
  getFilmStocksByCategory,
  getFilmStocksByManufacturer,
  filmStockCategoryNames,
  processingTypeOptions,
  pushPullOptions,
} from './filmStock';

// Grain Engine
export {
  DEFAULT_GRAIN_ENGINE_STATE,
  grainTypePresets,
  grainSizePresets,
  intensityDescriptors,
  getIntensityDescriptor,
  dustScratchesKeywords,
  gateWeaveKeywords,
  getDustScratchesDescription,
} from './grainEngine';

// Lens Physics
export {
  DEFAULT_LENS_PHYSICS_STATE,
  aperturePresets,
  focalLengthPresets,
  distortionPresets,
  dofControlPresets,
  bokehShapePresets,
  getFocalLengthType,
  getFocalLengthKeywords,
} from './lensPhysics';

// Advanced Lighting
export {
  DEFAULT_ADVANCED_LIGHTING_STATE,
  keyLightPositionPresets,
  keyFillRatioPresets,
  lightQualityPresets,
  getColorTemperatureKeywords,
  getShadowStopKeywords,
  getRimLightKeywords,
} from './advancedLighting';

// Composition Engine
export {
  DEFAULT_COMPOSITION_ENGINE_STATE,
  compositionPresets,
  getPlacementKeywords,
  getFrameOccupancyKeywords,
  getVanishingPointKeywords,
  getRuleOfThirdsKeywords,
  getFrameBalanceKeywords,
  getNegativeSpaceDescription,
} from './compositionEngine';
