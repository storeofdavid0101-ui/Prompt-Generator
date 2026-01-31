/**
 * Color Grading State Hook
 *
 * Manages professional color grading state including color wheels,
 * temperature/tint, split toning, and global adjustments.
 *
 * @module hooks/state/useColorGradingState
 */

'use client';

import { useState, useCallback } from 'react';
import type {
  ColorGradingStateReturn,
  TonalRange,
  ColorWheelPosition,
} from './types/colorGrading.types';
import type {
  ColorWheelsState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
} from '../../config/types/colorGrading';
import {
  DEFAULT_COLOR_WHEELS,
  DEFAULT_TEMPERATURE_TINT,
  DEFAULT_SPLIT_TONING,
  DEFAULT_GLOBAL_ADJUSTMENTS,
  DEFAULT_COLOR_WHEEL,
  colorGradingPresets,
} from '../../config/colorGrading';

/**
 * Hook for managing professional color grading state.
 *
 * @returns Color grading state and handlers
 *
 * @example
 * ```tsx
 * const colorGrading = useColorGradingState();
 *
 * // Apply a preset
 * colorGrading.applyPreset('teal-orange');
 *
 * // Adjust color wheel
 * colorGrading.setColorWheelPosition('lift', { x: -0.2, y: 0.1 });
 *
 * // Adjust temperature
 * colorGrading.setTemperature(15);
 * ```
 */
export function useColorGradingState(): ColorGradingStateReturn {
  // Enable state
  const [enabled, setEnabledInternal] = useState(false);
  const [selectedPreset, setSelectedPresetInternal] = useState<string | null>(null);

  // Color wheels state
  const [colorWheels, setColorWheels] = useState<ColorWheelsState>({ ...DEFAULT_COLOR_WHEELS });

  // Temperature/Tint state
  const [temperatureTint, setTemperatureTint] = useState<TemperatureTintState>({
    ...DEFAULT_TEMPERATURE_TINT,
  });

  // Split toning state
  const [splitToning, setSplitToning] = useState<SplitToningState>({ ...DEFAULT_SPLIT_TONING });

  // Global adjustments state
  const [globalAdjustments, setGlobalAdjustments] = useState<GlobalAdjustmentsState>({
    ...DEFAULT_GLOBAL_ADJUSTMENTS,
  });

  // =========================================================================
  // Enable/Disable
  // =========================================================================
  const setEnabled = useCallback((value: boolean) => {
    setEnabledInternal(value);
  }, []);

  // =========================================================================
  // Preset Selection
  // =========================================================================
  const setSelectedPreset = useCallback((key: string | null) => {
    setSelectedPresetInternal(key);
  }, []);

  const applyPreset = useCallback((key: string) => {
    const preset = colorGradingPresets[key];
    if (!preset) return;

    setSelectedPresetInternal(key);
    setEnabledInternal(true);

    // Apply preset values with defaults
    const values = preset.values;

    // Color wheels
    if (values.colorWheels) {
      setColorWheels({
        lift: values.colorWheels.lift || { ...DEFAULT_COLOR_WHEEL },
        gamma: values.colorWheels.gamma || { ...DEFAULT_COLOR_WHEEL },
        gain: values.colorWheels.gain || { ...DEFAULT_COLOR_WHEEL },
      });
    } else {
      setColorWheels({ ...DEFAULT_COLOR_WHEELS });
    }

    // Temperature/Tint
    if (values.temperatureTint) {
      setTemperatureTint({
        temperature: values.temperatureTint.temperature ?? 0,
        tint: values.temperatureTint.tint ?? 0,
      });
    } else {
      setTemperatureTint({ ...DEFAULT_TEMPERATURE_TINT });
    }

    // Split toning
    if (values.splitToning) {
      setSplitToning({
        shadowHue: values.splitToning.shadowHue ?? DEFAULT_SPLIT_TONING.shadowHue,
        shadowSaturation: values.splitToning.shadowSaturation ?? 0,
        highlightHue: values.splitToning.highlightHue ?? DEFAULT_SPLIT_TONING.highlightHue,
        highlightSaturation: values.splitToning.highlightSaturation ?? 0,
        balance: values.splitToning.balance ?? 0,
      });
    } else {
      setSplitToning({ ...DEFAULT_SPLIT_TONING });
    }

    // Global adjustments
    if (values.globalAdjustments) {
      setGlobalAdjustments({
        contrast: values.globalAdjustments.contrast ?? 0,
        saturation: values.globalAdjustments.saturation ?? 0,
        vibrance: values.globalAdjustments.vibrance ?? 0,
      });
    } else {
      setGlobalAdjustments({ ...DEFAULT_GLOBAL_ADJUSTMENTS });
    }
  }, []);

  // =========================================================================
  // Color Wheels
  // =========================================================================
  const setColorWheelPosition = useCallback((range: TonalRange, position: ColorWheelPosition) => {
    setColorWheels((prev) => ({
      ...prev,
      [range]: { ...prev[range], position },
    }));
    setSelectedPresetInternal(null); // Custom adjustment clears preset
  }, []);

  const setColorWheelLuminance = useCallback((range: TonalRange, luminance: number) => {
    setColorWheels((prev) => ({
      ...prev,
      [range]: { ...prev[range], luminance },
    }));
    setSelectedPresetInternal(null);
  }, []);

  const resetColorWheel = useCallback((range: TonalRange) => {
    setColorWheels((prev) => ({
      ...prev,
      [range]: { ...DEFAULT_COLOR_WHEEL },
    }));
    setSelectedPresetInternal(null);
  }, []);

  const resetAllColorWheels = useCallback(() => {
    setColorWheels({ ...DEFAULT_COLOR_WHEELS });
    setSelectedPresetInternal(null);
  }, []);

  // =========================================================================
  // Temperature/Tint
  // =========================================================================
  const setTemperature = useCallback((value: number) => {
    setTemperatureTint((prev) => ({ ...prev, temperature: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setTint = useCallback((value: number) => {
    setTemperatureTint((prev) => ({ ...prev, tint: value }));
    setSelectedPresetInternal(null);
  }, []);

  const resetTemperatureTint = useCallback(() => {
    setTemperatureTint({ ...DEFAULT_TEMPERATURE_TINT });
    setSelectedPresetInternal(null);
  }, []);

  // =========================================================================
  // Split Toning
  // =========================================================================
  const setShadowHue = useCallback((value: number) => {
    setSplitToning((prev) => ({ ...prev, shadowHue: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setShadowSaturation = useCallback((value: number) => {
    setSplitToning((prev) => ({ ...prev, shadowSaturation: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setHighlightHue = useCallback((value: number) => {
    setSplitToning((prev) => ({ ...prev, highlightHue: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setHighlightSaturation = useCallback((value: number) => {
    setSplitToning((prev) => ({ ...prev, highlightSaturation: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setSplitToningBalance = useCallback((value: number) => {
    setSplitToning((prev) => ({ ...prev, balance: value }));
    setSelectedPresetInternal(null);
  }, []);

  const resetSplitToning = useCallback(() => {
    setSplitToning({ ...DEFAULT_SPLIT_TONING });
    setSelectedPresetInternal(null);
  }, []);

  // =========================================================================
  // Global Adjustments
  // =========================================================================
  const setContrast = useCallback((value: number) => {
    setGlobalAdjustments((prev) => ({ ...prev, contrast: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setSaturation = useCallback((value: number) => {
    setGlobalAdjustments((prev) => ({ ...prev, saturation: value }));
    setSelectedPresetInternal(null);
  }, []);

  const setVibrance = useCallback((value: number) => {
    setGlobalAdjustments((prev) => ({ ...prev, vibrance: value }));
    setSelectedPresetInternal(null);
  }, []);

  const resetGlobalAdjustments = useCallback(() => {
    setGlobalAdjustments({ ...DEFAULT_GLOBAL_ADJUSTMENTS });
    setSelectedPresetInternal(null);
  }, []);

  // =========================================================================
  // Full Reset
  // =========================================================================
  const reset = useCallback(() => {
    setEnabledInternal(false);
    setSelectedPresetInternal(null);
    setColorWheels({ ...DEFAULT_COLOR_WHEELS });
    setTemperatureTint({ ...DEFAULT_TEMPERATURE_TINT });
    setSplitToning({ ...DEFAULT_SPLIT_TONING });
    setGlobalAdjustments({ ...DEFAULT_GLOBAL_ADJUSTMENTS });
  }, []);

  return {
    // State
    enabled,
    selectedPreset,
    colorWheels,
    temperatureTint,
    splitToning,
    globalAdjustments,

    // Enable/Disable
    setEnabled,

    // Preset
    setSelectedPreset,
    applyPreset,

    // Color Wheels
    setColorWheelPosition,
    setColorWheelLuminance,
    resetColorWheel,
    resetAllColorWheels,

    // Temperature/Tint
    setTemperature,
    setTint,
    resetTemperatureTint,

    // Split Toning
    setShadowHue,
    setShadowSaturation,
    setHighlightHue,
    setHighlightSaturation,
    setSplitToningBalance,
    resetSplitToning,

    // Global Adjustments
    setContrast,
    setSaturation,
    setVibrance,
    resetGlobalAdjustments,

    // Reset
    reset,
  };
}
