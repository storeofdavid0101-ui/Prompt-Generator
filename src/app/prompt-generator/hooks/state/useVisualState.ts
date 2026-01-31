/**
 * Visual State Hook
 *
 * Manages visual styling state: atmosphere, visual preset, lighting,
 * color palette, and custom colors. Each can be reset independently.
 *
 * @module hooks/state/useVisualState
 */

'use client';

import { useState, useCallback } from 'react';
import type { Atmosphere } from '../../config/types';
import type { VisualState } from './types';
import { DEFAULT_CUSTOM_COLORS } from './constants';
import { analytics } from '../../services';

/**
 * Hook for managing visual styling state
 *
 * @returns Visual state and handlers
 *
 * @example
 * ```tsx
 * const visual = useVisualState();
 *
 * // Set atmosphere
 * visual.setSelectedAtmosphere('cinematic');
 *
 * // Set custom colors
 * visual.setCustomColors(['#FF0000', '#00FF00', '', '', '', '']);
 *
 * // Reset just the colors
 * visual.resetColors();
 * ```
 */
export function useVisualState(): VisualState {
  const [selectedAtmosphere, setSelectedAtmosphereInternal] = useState<Atmosphere | null>(null);
  const [selectedVisualPreset, setSelectedVisualPresetInternal] = useState<string | null>(null);
  const [selectedLighting, setSelectedLightingInternal] = useState<string | null>(null);
  const [selectedColorPalette, setSelectedColorPaletteInternal] = useState<string | null>(null);
  const [customColors, setCustomColorsInternal] = useState<string[]>([...DEFAULT_CUSTOM_COLORS]);

  const setSelectedAtmosphere = useCallback((value: Atmosphere | null) => {
    setSelectedAtmosphereInternal(value);
    analytics.trackAtmosphereSelect(value || '');
  }, []);

  const setSelectedVisualPreset = useCallback((value: string | null) => {
    setSelectedVisualPresetInternal(value);
    analytics.trackVisualPresetSelect(value || '');
  }, []);

  const setSelectedLighting = useCallback((value: string | null) => {
    setSelectedLightingInternal(value);
    analytics.trackLightingSelect(value || '');
  }, []);

  const setSelectedColorPalette = useCallback((value: string | null) => {
    setSelectedColorPaletteInternal(value);
    analytics.trackColorPaletteSelect(value || '');
  }, []);

  const setCustomColors = useCallback((colors: string[]) => {
    setCustomColorsInternal(colors);
  }, []);

  const resetAtmosphere = useCallback(() => {
    setSelectedAtmosphereInternal(null);
  }, []);

  const resetVisualPreset = useCallback(() => {
    setSelectedVisualPresetInternal(null);
  }, []);

  const resetLighting = useCallback(() => {
    setSelectedLightingInternal(null);
  }, []);

  const resetColors = useCallback(() => {
    setSelectedColorPaletteInternal(null);
    setCustomColorsInternal([...DEFAULT_CUSTOM_COLORS]);
  }, []);

  return {
    selectedAtmosphere,
    selectedVisualPreset,
    selectedLighting,
    selectedColorPalette,
    customColors,
    setSelectedAtmosphere,
    setSelectedVisualPreset,
    setSelectedLighting,
    setSelectedColorPalette,
    setCustomColors,
    resetAtmosphere,
    resetVisualPreset,
    resetLighting,
    resetColors,
  };
}
