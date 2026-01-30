/**
 * Advanced Settings State Hook
 *
 * Manages advanced options: negative prompt and section visibility.
 * Isolated for components that only need advanced settings access.
 *
 * @module hooks/state/useAdvancedState
 */

'use client';

import { useState, useCallback } from 'react';
import type { AdvancedState } from './types';

/**
 * Hook for managing advanced settings state
 *
 * @returns Advanced state and handlers
 *
 * @example
 * ```tsx
 * const advanced = useAdvancedState();
 *
 * // Set negative prompt
 * advanced.setNegativePrompt('blurry, low quality');
 *
 * // Toggle visibility
 * advanced.setShowAdvanced(true);
 *
 * // Reset
 * advanced.reset();
 * ```
 */
export function useAdvancedState(): AdvancedState {
  const [negativePrompt, setNegativePromptInternal] = useState('');
  const [showAdvanced, setShowAdvancedInternal] = useState(false);

  const setNegativePrompt = useCallback((value: string) => {
    setNegativePromptInternal(value);
  }, []);

  const setShowAdvanced = useCallback((value: boolean) => {
    setShowAdvancedInternal(value);
  }, []);

  const reset = useCallback(() => {
    setNegativePromptInternal('');
    // Note: showAdvanced is a UI preference, not reset
  }, []);

  return {
    negativePrompt,
    showAdvanced,
    setNegativePrompt,
    setShowAdvanced,
    reset,
  };
}
