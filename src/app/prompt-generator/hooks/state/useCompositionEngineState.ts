/**
 * Composition Engine State Hook
 *
 * Manages state for precise composition control.
 *
 * @module hooks/state/useCompositionEngineState
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import type {
  CompositionEngineState,
  CompositionPreset,
  SubjectPlacement,
  VanishingPointType,
  RuleOfThirdsPosition,
  FrameBalance,
} from '../../config/types/compositionEngine';
import type { CompositionEngineStateReturn } from './types/compositionEngine.types';
import {
  DEFAULT_COMPOSITION_ENGINE_STATE,
  compositionPresets,
} from '../../config/compositionEngine';

/**
 * Hook for managing composition engine state.
 */
export function useCompositionEngineState(): CompositionEngineStateReturn {
  const [enabled, setEnabled] = useState(DEFAULT_COMPOSITION_ENGINE_STATE.enabled);
  const [preset, setPresetState] = useState<CompositionPreset>(DEFAULT_COMPOSITION_ENGINE_STATE.preset);
  const [subjectPlacement, setSubjectPlacement] = useState<SubjectPlacement>(
    DEFAULT_COMPOSITION_ENGINE_STATE.subjectPlacement
  );
  const [frameOccupancy, setFrameOccupancy] = useState(DEFAULT_COMPOSITION_ENGINE_STATE.frameOccupancy);
  const [negativeSpace, setNegativeSpace] = useState(DEFAULT_COMPOSITION_ENGINE_STATE.negativeSpace);
  const [vanishingPoint, setVanishingPoint] = useState<VanishingPointType>(
    DEFAULT_COMPOSITION_ENGINE_STATE.vanishingPoint
  );
  const [ruleOfThirds, setRuleOfThirds] = useState<RuleOfThirdsPosition>(
    DEFAULT_COMPOSITION_ENGINE_STATE.ruleOfThirds
  );
  const [frameBalance, setFrameBalance] = useState<FrameBalance>(
    DEFAULT_COMPOSITION_ENGINE_STATE.frameBalance
  );

  // Enable/disable
  const handleSetEnabled = useCallback((value: boolean) => {
    setEnabled(value);
  }, []);

  // Preset selection (stores selection but doesn't apply)
  const setPreset = useCallback((value: CompositionPreset) => {
    setPresetState(value);
  }, []);

  // Apply preset (updates all values from preset)
  const applyPreset = useCallback((presetId: NonNullable<CompositionPreset>) => {
    const presetConfig = compositionPresets[presetId];
    if (presetConfig) {
      setPresetState(presetId);
      setSubjectPlacement(presetConfig.placement);
      setFrameOccupancy(presetConfig.frameOccupancy);
      setRuleOfThirds(presetConfig.ruleOfThirds);
      setVanishingPoint(presetConfig.vanishingPoint);
      setEnabled(true);
    }
  }, []);

  // Subject placement
  const handleSetSubjectPlacement = useCallback((placement: SubjectPlacement) => {
    setSubjectPlacement(placement);
    setPresetState(null); // Clear preset when manually adjusting
  }, []);

  const setSubjectX = useCallback((x: number) => {
    setSubjectPlacement((prev) => ({ ...prev, x: Math.max(0, Math.min(1, x)) }));
    setPresetState(null);
  }, []);

  const setSubjectY = useCallback((y: number) => {
    setSubjectPlacement((prev) => ({ ...prev, y: Math.max(0, Math.min(1, y)) }));
    setPresetState(null);
  }, []);

  // Frame occupancy
  const handleSetFrameOccupancy = useCallback((value: number) => {
    setFrameOccupancy(Math.max(0, Math.min(100, value)));
    setPresetState(null);
  }, []);

  // Negative space
  const setNegativeSpaceLeft = useCallback((value: number) => {
    setNegativeSpace((prev) => ({ ...prev, left: Math.max(0, Math.min(100, value)) }));
  }, []);

  const setNegativeSpaceRight = useCallback((value: number) => {
    setNegativeSpace((prev) => ({ ...prev, right: Math.max(0, Math.min(100, value)) }));
  }, []);

  const setNegativeSpaceTop = useCallback((value: number) => {
    setNegativeSpace((prev) => ({ ...prev, top: Math.max(0, Math.min(100, value)) }));
  }, []);

  const setNegativeSpaceBottom = useCallback((value: number) => {
    setNegativeSpace((prev) => ({ ...prev, bottom: Math.max(0, Math.min(100, value)) }));
  }, []);

  // Composition rules
  const handleSetVanishingPoint = useCallback((point: VanishingPointType) => {
    setVanishingPoint(point);
    setPresetState(null);
  }, []);

  const handleSetRuleOfThirds = useCallback((position: RuleOfThirdsPosition) => {
    setRuleOfThirds(position);
    setPresetState(null);
  }, []);

  const handleSetFrameBalance = useCallback((balance: FrameBalance) => {
    setFrameBalance(balance);
    setPresetState(null);
  }, []);

  // Reset
  const reset = useCallback(() => {
    setEnabled(DEFAULT_COMPOSITION_ENGINE_STATE.enabled);
    setPresetState(DEFAULT_COMPOSITION_ENGINE_STATE.preset);
    setSubjectPlacement(DEFAULT_COMPOSITION_ENGINE_STATE.subjectPlacement);
    setFrameOccupancy(DEFAULT_COMPOSITION_ENGINE_STATE.frameOccupancy);
    setNegativeSpace(DEFAULT_COMPOSITION_ENGINE_STATE.negativeSpace);
    setVanishingPoint(DEFAULT_COMPOSITION_ENGINE_STATE.vanishingPoint);
    setRuleOfThirds(DEFAULT_COMPOSITION_ENGINE_STATE.ruleOfThirds);
    setFrameBalance(DEFAULT_COMPOSITION_ENGINE_STATE.frameBalance);
  }, []);

  return useMemo(
    () => ({
      // State values
      enabled,
      preset,
      subjectPlacement,
      frameOccupancy,
      negativeSpace,
      vanishingPoint,
      ruleOfThirds,
      frameBalance,

      // Setters
      setEnabled: handleSetEnabled,
      setPreset,
      applyPreset,
      setSubjectPlacement: handleSetSubjectPlacement,
      setSubjectX,
      setSubjectY,
      setFrameOccupancy: handleSetFrameOccupancy,
      setNegativeSpaceLeft,
      setNegativeSpaceRight,
      setNegativeSpaceTop,
      setNegativeSpaceBottom,
      setVanishingPoint: handleSetVanishingPoint,
      setRuleOfThirds: handleSetRuleOfThirds,
      setFrameBalance: handleSetFrameBalance,
      reset,
    }),
    [
      enabled,
      preset,
      subjectPlacement,
      frameOccupancy,
      negativeSpace,
      vanishingPoint,
      ruleOfThirds,
      frameBalance,
      handleSetEnabled,
      setPreset,
      applyPreset,
      handleSetSubjectPlacement,
      setSubjectX,
      setSubjectY,
      handleSetFrameOccupancy,
      setNegativeSpaceLeft,
      setNegativeSpaceRight,
      setNegativeSpaceTop,
      setNegativeSpaceBottom,
      handleSetVanishingPoint,
      handleSetRuleOfThirds,
      handleSetFrameBalance,
      reset,
    ]
  );
}
