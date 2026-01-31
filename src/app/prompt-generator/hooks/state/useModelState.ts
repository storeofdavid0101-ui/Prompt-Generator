/**
 * Model Selection State Hook
 *
 * Manages the selected AI model for prompt generation.
 * Isolated state for better performance and testability.
 *
 * @module hooks/state/useModelState
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import type { AIModel } from '../../config/types';
import type { ModelState } from './types';
import { DEFAULT_MODEL } from './constants';
import { analytics } from '../../services';

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
  const previousModelRef = useRef<AIModel | undefined>(undefined);

  const setSelectedModel = useCallback((model: AIModel) => {
    analytics.trackModelSelect(previousModelRef.current, model);
    previousModelRef.current = model;
    setSelectedModelInternal(model);
  }, []);

  return {
    selectedModel,
    setSelectedModel,
  };
}
