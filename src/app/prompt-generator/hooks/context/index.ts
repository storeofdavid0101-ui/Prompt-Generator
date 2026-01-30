/**
 * Context Module Exports
 *
 * Exports context provider, hooks, and selectors for prompt generator state.
 *
 * @module hooks/context
 */

// Core context and provider
export {
  PromptGeneratorContext,
  usePromptGeneratorContext,
  type PromptGeneratorContextValue,
} from './PromptGeneratorContext';

export { PromptGeneratorProvider } from './PromptGeneratorProvider';

// Domain-specific selector hooks
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
} from './selectors';
