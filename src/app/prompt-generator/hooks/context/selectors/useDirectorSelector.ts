/**
 * Director Selector Hook
 *
 * Provides access to director selection state.
 * Use this for components managing director style selection.
 *
 * @module hooks/context/selectors/useDirectorSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';

/**
 * Director selector return type
 */
export interface DirectorSelectorReturn {
  /** Selected director style */
  readonly selectedDirector: string;
  /** Handle director change with conflict clearing */
  readonly handleDirectorChange: (director: string) => void;
}

/**
 * Hook to access only director selection state
 *
 * @returns Director state and handler
 *
 * @example
 * ```tsx
 * function DirectorPicker() {
 *   const { selectedDirector, handleDirectorChange } = useDirectorSelector();
 *   return <select value={selectedDirector} onChange={e => handleDirectorChange(e.target.value)} />;
 * }
 * ```
 */
export function useDirectorSelector(): DirectorSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      selectedDirector: context.selectedDirector,
      handleDirectorChange: context.handleDirectorChange,
    }),
    [context.selectedDirector, context.handleDirectorChange]
  );
}
