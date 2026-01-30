/**
 * Model Selection State Hook
 *
 * Manages the selected AI model for prompt generation.
 * Isolated state for better performance and testability.
 *
 * @module hooks/state/useModelState
 */

'use client';

import { useState, useCallback } from 'react';
import type { AIModel } from '../../config/types';
import type { ModelState } from './types';
import { DEFAULT_MODEL } from './constants';

/**
 * Hook for managing AI model selection state
 *
 * @returns Model state and setter
 *
 * @example
 * ```tsx
 * const { selectedModel, setSelectedModel } = useModelState();
 *
 * // Change to DALL-E 3
 * setSelectedModel('dalle3');
 * ```
 */
export function useModelState(): ModelState {
  const [selectedModel, setSelectedModelInternal] = useState<AIModel>(DEFAULT_MODEL);

  const setSelectedModel = useCallback((model: AIModel) => {
    setSelectedModelInternal(model);
  }, []);

  return {
    selectedModel,
    setSelectedModel,
  };
}
