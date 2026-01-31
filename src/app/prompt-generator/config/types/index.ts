/**
 * Type Definitions Module
 *
 * Central barrel export for all CinePrompt type definitions.
 * Import from this module for clean, organized access to all types.
 *
 * @module config/types
 * @version 1.0.0
 *
 * @example
 * // Import specific types
 * import type { AIModel, Atmosphere, ConflictResult } from '@/config/types';
 *
 * // Import all types from a category
 * import type * as CameraTypes from '@/config/types/camera';
 */

// =============================================================================
// Core Types
// =============================================================================

export type {
  AIModel,
  PromptStyle,
  ModelConfig,
  ThemeColors,
  CharacterItem,
  HelpDescription,
} from './core';

// =============================================================================
// Visual Types
// =============================================================================

export type {
  Atmosphere,
  VisualPresetKey,
  LightingKey,
  LightingCategory,
  AtmosphereConfig,
  PresetConfig,
  LightingConfig,
  ColorPaletteConfig,
} from './visual';

// =============================================================================
// Camera Types
// =============================================================================

export type {
  DOFValue,
  CameraCategory,
  CameraOption,
  ShotOption,
  DOFOption,
  AspectRatioOption,
  ZoomRange,
} from './camera';

// =============================================================================
// Conflict Types
// =============================================================================

export type {
  BlockReason,
  BlockReasonMap,
  ConflictRules,
  DirectorStyle,
  EffectCategory,
  EffectStackingWarning,
  ConflictResult,
} from './conflict';

// =============================================================================
// State Types
// =============================================================================

export type {
  ExpandedSections,
  ExpandedSectionKey,
  LockedSections,
  LockedSectionKey,
  PromptGeneratorState,
} from './state';

// =============================================================================
// UI Types
// =============================================================================

export type {
  GradientDirection,
  SelectionState,
  ToastType,
  AnimationTiming,
  CollapseState,
  ButtonVariant,
  InputSize,
  BadgeStatus,
} from './ui';

// =============================================================================
// Character Creator Types
// =============================================================================

export type {
  CharacterType,
  FaceFeatures,
  FaceFeatureKey,
  FeatureThreshold,
  FeatureConfig,
  FaceFeatureConfigs,
} from './characterCreator';

// =============================================================================
// Color Grading Types
// =============================================================================

export type {
  TonalRange,
  ColorWheelPosition,
  ColorWheelState,
  ColorWheelsState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
  ColorGradingState,
  ColorGradingPreset,
  ColorGradingPresetValues,
  ColorGradingCategory,
} from './colorGrading';

export { colorGradingCategoryNames } from './colorGrading';

// =============================================================================
// Output Format Types
// =============================================================================

export type {
  OutputMode,
  OutputModeConfig,
  OutputFormatState,
} from './outputFormat';

// =============================================================================
// Film Stock Types
// =============================================================================

export type {
  FilmStockCategory,
  ProcessingType,
  PushPullValue,
  ColorBalance,
  FilmStockPreset,
  FilmStockState,
} from './filmStock';

// =============================================================================
// Grain Engine Types
// =============================================================================

export type {
  GrainType,
  GrainSize,
  DustScratchesConfig,
  GrainEngineState,
  GrainTypePreset,
  GrainSizePreset,
} from './grainEngine';

// =============================================================================
// Lens Physics Types
// =============================================================================

export type {
  DistortionType,
  DOFControl,
  BokehShape,
  Aperture,
  LensPhysicsState,
  AperturePreset,
  FocalLengthPreset,
  DistortionPreset,
  DOFControlPreset,
  BokehShapePreset,
} from './lensPhysics';

// =============================================================================
// Advanced Lighting Types
// =============================================================================

export type {
  KeyLightPosition,
  KeyFillRatio,
  RimLightPosition,
  LightQuality,
  RimLightConfig,
  AdvancedLightingState,
  KeyLightPositionPreset,
  KeyFillRatioPreset,
  LightQualityPreset,
} from './advancedLighting';

// =============================================================================
// Composition Engine Types
// =============================================================================

export type {
  RuleOfThirdsPosition,
  VanishingPointType,
  FrameBalance,
  SubjectPlacement,
  NegativeSpace,
  CompositionPreset,
  CompositionPresetConfig,
  CompositionEngineState,
} from './compositionEngine';
