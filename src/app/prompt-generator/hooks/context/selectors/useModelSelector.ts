/**
 * Model Selector Hook
 *
 * Provides access to model selection state only.
 * Use this for components that only need model information.
 *
 * @module hooks/context/selectors/useModelSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';
import type { AIModel } from '../../../config/types';

/**
 * Model selector return type
 */
export interface ModelSelectorReturn {
  /** Currently selected AI model */
  readonly selectedModel: AIModel;
  /** Update the selected model */
  readonly setSelectedModel: (model: AIModel) => void;
}

/**
 * Hook to access only model selection state
 *
 * @returns Model state and handler
 *
 * @example
 * ```tsx
 * function ModelPicker() {
 *   const { selectedModel, setSelectedModel } = useModelSelector();
 *   return <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} />;
 * }
 * ```
 */
export function useModelSelector(): ModelSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      selectedModel: context.selectedModel,
      setSelectedModel: context.setSelectedModel,
    }),
    [context.selectedModel, context.setSelectedModel]
  );
}
