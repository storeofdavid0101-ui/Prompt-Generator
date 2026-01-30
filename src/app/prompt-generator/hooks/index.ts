/**
 * Hooks Module Exports
 *
 * Central export point for all custom hooks used in the Prompt Generator.
 *
 * Architecture Overview:
 * - Core hooks: useTheme, useConflicts, usePromptGeneratorState
 * - Context: PromptGeneratorProvider, usePromptGeneratorContext
 * - Selectors: Domain-specific hooks for optimized subscriptions
 * - State hooks: Low-level domain state management
 *
 * Recommended Usage:
 * 1. Wrap app with PromptGeneratorProvider
 * 2. Use selector hooks (useThemeSelector, useCameraSelector, etc.) for components
 * 3. Use usePromptGeneratorContext for components that need full state
 * 4. Use usePromptGeneratorState for standalone usage without provider
 *
 * @module hooks
 */

// ============================================================================
// Core Hooks
// ============================================================================

export { useTheme } from './useTheme';
export { useConflicts } from './useConflicts';
export { usePromptGeneratorState } from './usePromptGeneratorState';

// ============================================================================
// Context Provider & Hook
// ============================================================================

export {
  PromptGeneratorProvider,
  PromptGeneratorContext,
  usePromptGeneratorContext,
  type PromptGeneratorContextValue,
} from './context';

// ============================================================================
// Selector Hooks (for optimized subscriptions)
// ============================================================================

export {
  useThemeSelector,
  useModelSelector,
  useContentSelector,
  useVisualSelector,
  useCameraSelector,
  useDirectorSelector,
  useAdvancedSelector,
  useUISelector,
  useActionsSelector,
  type ThemeSelectorReturn,
  type ModelSelectorReturn,
  type ContentSelectorReturn,
  type VisualSelectorReturn,
  type CameraSelectorReturn,
  type DirectorSelectorReturn,
  type AdvancedSelectorReturn,
  type UISelectorReturn,
  type ActionsSelectorReturn,
} from './context';

// ============================================================================
// Domain State Hooks (for isolated state management)
// ============================================================================

export {
  useModelState,
  useCreativeControlsState,
  useContentState,
  useVisualState,
  useCameraState,
  useDirectorState,
  useAdvancedState,
  useSectionState,
  useClipboard,
} from './state';

// ============================================================================
// State Types
// ============================================================================

export type {
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
  PromptGeneratorStateReturn,
  SliderValue,
  Setter,
  AsyncAction,
  ResetAction,
} from './state';

// ============================================================================
// State Constants
// ============================================================================

export {
  DEFAULT_MODEL,
  CREATIVE_CONTROLS_DEFAULTS,
  CAMERA_DEFAULTS,
  DEFAULT_EXPANDED_SECTIONS,
  DEFAULT_LOCKED_SECTIONS,
  THEME_DEFAULTS,
} from './state';
