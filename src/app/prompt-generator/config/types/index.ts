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
