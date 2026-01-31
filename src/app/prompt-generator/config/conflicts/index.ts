/**
 * Conflict Detection Configuration
 *
 * Central export point for all conflict detection rules.
 * Manages incompatibilities between:
 * - Camera types and categories
 * - Atmospheres and visual settings
 * - Lighting and preset combinations
 * - Director style redundancies
 * - Location/environment conflicts
 * - Camera grammar (shot + lens + DOF)
 * - Style stacking limits
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

// Location-related conflicts
export {
  locationMeta,
  atmosphereEraConflicts,
  lightingLocationConflicts,
  shotScaleConflicts,
  getLocationMeta,
  isAtmosphereBlockedByLocation,
  isLightingBlockedByLocation,
} from './location';
export type {
  LocationCategory,
  LocationMetaCategory,
  LocationScale,
  LocationEra,
  LocationMeta,
} from './location';

// Camera grammar conflicts (shot + lens + DOF)
export {
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
} from './cameraGrammar';
export type { ShotGrammar } from './cameraGrammar';

// Style stacking detection
export {
  directorImpliedStyles,
  atmosphereImpliedStyles,
  presetImpliedStyles,
  lightingImpliedStyles,
  STYLE_CATEGORY_LIMITS,
  analyzeStyleStacking,
  getReducingOptions,
} from './styleStacking';
export type { StyleCategory, StyleStackingAnalysis } from './styleStacking';

// Director-lens conflicts
export {
  directorPreferredLens,
  directorBlockedLens,
  isLensBlockedByDirector,
  getDirectorCompatibleLenses,
  getDirectorBlockedLenses,
} from './directorLens';

// Subject-location compatibility
export {
  subjectKeywordBlockedLocations,
  themeLocationPreferences,
  enclosedLocations,
  openLocations,
  isLocationCompatibleWithSubject,
  getBlockedLocationCategories,
  getPreferredLocationCategories,
  filterCompatibleLocations,
} from './subjectLocation';
export type { LocationCategory as SubjectLocationCategory } from './subjectLocation';
