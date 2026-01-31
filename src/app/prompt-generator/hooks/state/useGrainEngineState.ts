/**
 * Grain Engine State Hook
 *
 * Manages state for film grain and texture emulation.
 *
 * @module hooks/state/useGrainEngineState
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import type { GrainType, GrainSize, DustScratchesConfig } from '../../config/types/grainEngine';
import type { GrainEngineStateReturn } from './types/grainEngine.types';
import { DEFAULT_GRAIN_ENGINE_STATE } from '../../config/grainEngine';

/**
 * Hook for managing grain engine state.
 *
 * @returns Grain engine state and handlers
 */
export function useGrainEngineState(): GrainEngineStateReturn {
  const [enabled, setEnabled] = useState(DEFAULT_GRAIN_ENGINE_STATE.enabled);
  const [grainType, setGrainType] = useState<GrainType>(DEFAULT_GRAIN_ENGINE_STATE.grainType);
  const [grainSize, setGrainSize] = useState<GrainSize>(DEFAULT_GRAIN_ENGINE_STATE.grainSize);
  const [intensity, setIntensity] = useState(DEFAULT_GRAIN_ENGINE_STATE.intensity);
  const [dustScratches, setDustScratches] = useState<DustScratchesConfig>(
    DEFAULT_GRAIN_ENGINE_STATE.dustScratches
  );
  const [gateWeave, setGateWeave] = useState(DEFAULT_GRAIN_ENGINE_STATE.gateWeave);

  const setDustScratchesEnabled = useCallback((dustEnabled: boolean) => {
    setDustScratches((prev) => ({ ...prev, enabled: dustEnabled }));
  }, []);

  const setDustScratchesIntensity = useCallback((dustIntensity: number) => {
    setDustScratches((prev) => ({ ...prev, intensity: dustIntensity }));
  }, []);

  const reset = useCallback(() => {
    setEnabled(DEFAULT_GRAIN_ENGINE_STATE.enabled);
    setGrainType(DEFAULT_GRAIN_ENGINE_STATE.grainType);
    setGrainSize(DEFAULT_GRAIN_ENGINE_STATE.grainSize);
    setIntensity(DEFAULT_GRAIN_ENGINE_STATE.intensity);
    setDustScratches(DEFAULT_GRAIN_ENGINE_STATE.dustScratches);
    setGateWeave(DEFAULT_GRAIN_ENGINE_STATE.gateWeave);
  }, []);

  return useMemo(
    () => ({
      enabled,
      setEnabled,
      grainType,
      setGrainType,
      grainSize,
      setGrainSize,
      intensity,
      setIntensity,
      dustScratches,
      setDustScratchesEnabled,
      setDustScratchesIntensity,
      gateWeave,
      setGateWeave,
      reset,
    }),
    [
      enabled,
      grainType,
      grainSize,
      intensity,
      dustScratches,
      gateWeave,
      setDustScratchesEnabled,
      setDustScratchesIntensity,
      reset,
    ]
  );
}
