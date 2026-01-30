/**
 * State Hooks Module Exports
 *
 * Barrel export file for domain-specific state hooks.
 * Each hook manages an isolated piece of application state.
 *
 * @module hooks/state
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // Utility types
  SliderValue,
  Setter,
  AsyncAction,
  ResetAction,
  ConflictHandlerParams,
  // Domain state types
  ModelState,
  CreativeControlsState,
  ContentState,
  VisualState,
  CameraState,
  DirectorState,
  AdvancedState,
  SectionState,
  ClipboardState,
  ThemeState,
  // Hook parameter types
  UseCameraStateParams,
  UseDirectorStateParams,
  // Composed state type
  PromptGeneratorStateReturn,
} from './types';

// ============================================================================
// Constants
// ============================================================================

export {
  DEFAULT_MODEL,
  CREATIVE_CONTROLS_DEFAULTS,
  CAMERA_DEFAULTS,
  DEFAULT_CUSTOM_COLORS,
  CUSTOM_COLOR_COUNT,
  DEFAULT_EXPANDED_SECTIONS,
  DEFAULT_LOCKED_SECTIONS,
  CLIPBOARD_FEEDBACK_DURATION,
  THEME_DEFAULTS,
} from './constants';

// ============================================================================
// Hooks
// ============================================================================

export { useModelState } from './useModelState';
export { useCreativeControlsState } from './useCreativeControlsState';
export { useContentState } from './useContentState';
export { useVisualState } from './useVisualState';
export { useCameraState } from './useCameraState';
export { useDirectorState } from './useDirectorState';
export { useAdvancedState } from './useAdvancedState';
export { useSectionState } from './useSectionState';
export { useClipboard } from './useClipboard';
