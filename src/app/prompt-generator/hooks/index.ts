/**
 * Hooks Module Exports
 *
 * Central export point for all custom hooks used in the Prompt Generator.
 * Organized into core hooks and domain-specific state hooks.
 *
 * @module hooks
 */

// Core Hooks
export { useTheme } from './useTheme';
export { useConflicts } from './useConflicts';
export { usePromptGeneratorState } from './usePromptGeneratorState';

// Domain State Hooks (for components that need isolated state)
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

// State Types
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
  PromptGeneratorStateReturn,
} from './state';

// State Constants (for testing and defaults)
export {
  DEFAULT_MODEL,
  CREATIVE_CONTROLS_DEFAULTS,
  CAMERA_DEFAULTS,
  DEFAULT_EXPANDED_SECTIONS,
  DEFAULT_LOCKED_SECTIONS,
} from './state';
