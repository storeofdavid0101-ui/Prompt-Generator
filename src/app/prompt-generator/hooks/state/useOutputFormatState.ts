/**
 * Output Format State Hook
 *
 * Manages the output format mode selection (prose/machine/hybrid).
 *
 * @module hooks/state/useOutputFormatState
 */

import { useState, useCallback } from 'react';
import type { OutputMode } from '../../config/types/outputFormat';
import type { OutputFormatStateReturn } from './types/outputFormat.types';
import { DEFAULT_OUTPUT_MODE } from '../../config/outputFormat';

/**
 * Hook for managing output format state.
 *
 * @returns Output format state and handlers
 */
export function useOutputFormatState(): OutputFormatStateReturn {
  const [mode, setModeInternal] = useState<OutputMode>(DEFAULT_OUTPUT_MODE);

  const setMode = useCallback((newMode: OutputMode) => {
    setModeInternal(newMode);
  }, []);

  const reset = useCallback(() => {
    setModeInternal(DEFAULT_OUTPUT_MODE);
  }, []);

  return {
    mode,
    setMode,
    reset,
  };
}
