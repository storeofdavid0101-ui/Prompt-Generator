/**
 * Creative Controls State Hook
 *
 * Manages the creative parameter sliders (creativity, variation, uniqueness)
 * and their enabled state. Values translate to model-specific parameters.
 *
 * @module hooks/state/useCreativeControlsState
 */

'use client';

import { useState, useCallback } from 'react';
import type { CreativeControlsState } from './types';
import { CREATIVE_CONTROLS_DEFAULTS } from './constants';

/**
 * Hook for managing creative control sliders state
 *
 * @returns Creative controls state and handlers
 *
 * @example
 * ```tsx
 * const creative = useCreativeControlsState();
 *
 * // Enable creative controls
 * creative.setEnabled(true);
 *
 * // Adjust creativity
 * creative.setCreativity(75);
 *
 * // Reset all to defaults
 * creative.reset();
 * ```
 */
export function useCreativeControlsState(): CreativeControlsState {
  const [enabled, setEnabledInternal] = useState(CREATIVE_CONTROLS_DEFAULTS.enabled);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledInternal(value);
  }, []);
  const [creativity, setCreativityInternal] = useState(CREATIVE_CONTROLS_DEFAULTS.creativity);
  const [variation, setVariationInternal] = useState(CREATIVE_CONTROLS_DEFAULTS.variation);
  const [uniqueness, setUniquenessInternal] = useState(CREATIVE_CONTROLS_DEFAULTS.uniqueness);

  const setCreativity = useCallback((value: number) => {
    setCreativityInternal(value);
  }, []);

  const setVariation = useCallback((value: number) => {
    setVariationInternal(value);
  }, []);

  const setUniqueness = useCallback((value: number) => {
    setUniquenessInternal(value);
  }, []);

  const reset = useCallback(() => {
    setEnabledInternal(CREATIVE_CONTROLS_DEFAULTS.enabled);
    setCreativityInternal(CREATIVE_CONTROLS_DEFAULTS.creativity);
    setVariationInternal(CREATIVE_CONTROLS_DEFAULTS.variation);
    setUniquenessInternal(CREATIVE_CONTROLS_DEFAULTS.uniqueness);
  }, []);

  return {
    enabled,
    creativity,
    variation,
    uniqueness,
    setEnabled,
    setCreativity,
    setVariation,
    setUniqueness,
    reset,
  };
}
