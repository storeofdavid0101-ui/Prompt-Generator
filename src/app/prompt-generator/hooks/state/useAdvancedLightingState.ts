/**
 * Advanced Lighting State Hook
 *
 * Manages state for professional lighting controls.
 *
 * @module hooks/state/useAdvancedLightingState
 */

'use client';

import { useState, useCallback } from 'react';
import type { AdvancedLightingStateReturn } from './types/advancedLighting.types';
import type {
  KeyLightPosition,
  KeyFillRatio,
  LightQuality,
  RimLightConfig,
  RimLightPosition,
} from '../../config/types/advancedLighting';
import { DEFAULT_ADVANCED_LIGHTING_STATE } from '../../config/advancedLighting';

/**
 * Hook for managing advanced lighting state.
 *
 * @returns Advanced lighting state and handlers
 */
export function useAdvancedLightingState(): AdvancedLightingStateReturn {
  const [enabled, setEnabled] = useState(DEFAULT_ADVANCED_LIGHTING_STATE.enabled);
  const [keyLightPosition, setKeyLightPosition] = useState<KeyLightPosition>(
    DEFAULT_ADVANCED_LIGHTING_STATE.keyLightPosition
  );
  const [keyFillRatio, setKeyFillRatio] = useState<KeyFillRatio>(
    DEFAULT_ADVANCED_LIGHTING_STATE.keyFillRatio
  );
  const [colorTemperature, setColorTemperature] = useState(
    DEFAULT_ADVANCED_LIGHTING_STATE.colorTemperature
  );
  const [shadowStop, setShadowStop] = useState(
    DEFAULT_ADVANCED_LIGHTING_STATE.shadowStop
  );
  const [rimLight, setRimLight] = useState<RimLightConfig>(
    DEFAULT_ADVANCED_LIGHTING_STATE.rimLight
  );
  const [lightQuality, setLightQuality] = useState<LightQuality>(
    DEFAULT_ADVANCED_LIGHTING_STATE.lightQuality
  );

  const setRimLightEnabled = useCallback((isEnabled: boolean) => {
    setRimLight((prev) => ({ ...prev, enabled: isEnabled }));
  }, []);

  const setRimLightPosition = useCallback((position: RimLightPosition) => {
    setRimLight((prev) => ({ ...prev, position }));
  }, []);

  const reset = useCallback(() => {
    setEnabled(DEFAULT_ADVANCED_LIGHTING_STATE.enabled);
    setKeyLightPosition(DEFAULT_ADVANCED_LIGHTING_STATE.keyLightPosition);
    setKeyFillRatio(DEFAULT_ADVANCED_LIGHTING_STATE.keyFillRatio);
    setColorTemperature(DEFAULT_ADVANCED_LIGHTING_STATE.colorTemperature);
    setShadowStop(DEFAULT_ADVANCED_LIGHTING_STATE.shadowStop);
    setRimLight(DEFAULT_ADVANCED_LIGHTING_STATE.rimLight);
    setLightQuality(DEFAULT_ADVANCED_LIGHTING_STATE.lightQuality);
  }, []);

  return {
    enabled,
    setEnabled,
    keyLightPosition,
    setKeyLightPosition,
    keyFillRatio,
    setKeyFillRatio,
    colorTemperature,
    setColorTemperature,
    shadowStop,
    setShadowStop,
    rimLight,
    setRimLightEnabled,
    setRimLightPosition,
    lightQuality,
    setLightQuality,
    reset,
  };
}
