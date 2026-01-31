/**
 * Director State Hook
 *
 * Manages director style selection with automatic conflict resolution.
 * When director changes, incompatible atmospheres and presets are
 * automatically cleared based on the director's blocked lists.
 *
 * @module hooks/state/useDirectorState
 */

'use client';

import { useState, useCallback } from 'react';
import { directorStyles } from '../../config';
import { analytics } from '../../services';
import type { DirectorState, UseDirectorStateParams } from './types';

/**
 * Hook for managing director state with conflict auto-clearing
 *
 * @param params - Configuration including lock state and conflict callbacks
 * @returns Director state and handlers
 *
 * @example
 * ```tsx
 * const director = useDirectorState({
 *   isLocked: lockedSections.director,
 *   selectedAtmosphere,
 *   selectedVisualPreset,
 *   onClearAtmosphere: () => setSelectedAtmosphere(null),
 *   onClearVisualPreset: () => setSelectedVisualPreset(null),
 * });
 *
 * // Change director (auto-clears conflicts)
 * director.setDirector('Christopher Nolan');
 * ```
 */
export function useDirectorState({
  isLocked,
  selectedAtmosphere,
  selectedVisualPreset,
  onClearAtmosphere,
  onClearVisualPreset,
}: UseDirectorStateParams): DirectorState {
  const [selectedDirector, setSelectedDirectorInternal] = useState('');

  /**
   * Set director with automatic conflict resolution
   * Clears incompatible atmospheres and visual presets
   */
  const setDirector = useCallback(
    (newDirector: string) => {
      if (isLocked) return;

      setSelectedDirectorInternal(newDirector);
      analytics.trackDirectorSelect(newDirector);

      // Find director config to check for conflicts
      const directorConfig = directorStyles.find((d) => d.name === newDirector);

      if (directorConfig) {
        // Clear atmosphere if it conflicts with the director
        if (selectedAtmosphere && directorConfig.blockedAtmospheres.includes(selectedAtmosphere)) {
          onClearAtmosphere();
        }

        // Clear visual preset if it conflicts with the director
        if (selectedVisualPreset && directorConfig.blockedPresets.includes(selectedVisualPreset)) {
          onClearVisualPreset();
        }
      }
    },
    [isLocked, selectedAtmosphere, selectedVisualPreset, onClearAtmosphere, onClearVisualPreset]
  );

  const reset = useCallback(() => {
    setSelectedDirectorInternal('');
  }, []);

  return {
    selectedDirector,
    setDirector,
    reset,
  };
}
