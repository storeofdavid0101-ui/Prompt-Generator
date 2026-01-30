/**
 * Type Definitions - Re-export Module
 *
 * This file re-exports all types from the modular types/ directory
 * for backward compatibility with existing imports.
 *
 * @module config/types
 * @version 2.0.0
 *
 * @description
 * Types have been reorganized into domain-specific modules:
 * - types/core.ts: AI models, theme colors, base types
 * - types/visual.ts: Atmosphere, presets, lighting, colors
 * - types/camera.ts: Camera, lens, shot, DOF types
 * - types/conflict.ts: Conflict detection types
 * - types/state.ts: Application state types
 * - types/ui.ts: UI component types
 *
 * For new code, prefer importing from specific modules:
 * @example
 * import type { AIModel } from './types/core';
 * import type { Atmosphere } from './types/visual';
 */

// Re-export all types for backward compatibility
export type {
  // Core types
  AIModel,
  PromptStyle,
  ModelConfig,
  ThemeColors,
  CharacterItem,
  HelpDescription,

  // Visual types
  Atmosphere,
  VisualPresetKey,
  LightingKey,
  LightingCategory,
  AtmosphereConfig,
  PresetConfig,
  LightingConfig,
  ColorPaletteConfig,

  // Camera types
  DOFValue,
  CameraCategory,
  CameraOption,
  ShotOption,
  DOFOption,
  AspectRatioOption,
  ZoomRange,

  // Conflict types
  ConflictRules,
  DirectorStyle,
  EffectCategory,
  EffectStackingWarning,
  ConflictResult,

  // State types
  ExpandedSections,
  ExpandedSectionKey,
  LockedSections,
  LockedSectionKey,
  PromptGeneratorState,

  // UI types
  GradientDirection,
  SelectionState,
  ToastType,
  AnimationTiming,
  CollapseState,
  ButtonVariant,
  InputSize,
  BadgeStatus,
} from './types/index';
