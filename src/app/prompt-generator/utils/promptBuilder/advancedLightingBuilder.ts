/**
 * Advanced Lighting Prompt Builder
 *
 * Converts advanced lighting state into prompt keywords.
 *
 * @module utils/promptBuilder/advancedLightingBuilder
 */

import type { AdvancedLightingState } from '../../config/types/advancedLighting';
import {
  keyLightPositionPresets,
  keyFillRatioPresets,
  lightQualityPresets,
  getColorTemperatureKeywords,
  getShadowStopKeywords,
  getRimLightKeywords,
} from '../../config/advancedLighting';

/**
 * Resolves advanced lighting state into prompt keywords.
 *
 * @param state - Advanced lighting state
 * @param _useSafeMode - Whether to use safe keywords (not used here but kept for consistency)
 * @returns Prompt keywords or null if disabled
 */
export function resolveAdvancedLighting(
  state: AdvancedLightingState,
  _useSafeMode: boolean = false
): string | null {
  if (!state.enabled) {
    return null;
  }

  const parts: string[] = [];

  // Key light position
  const positionPreset = keyLightPositionPresets[state.keyLightPosition];
  if (positionPreset) {
    parts.push(positionPreset.keywords);
  }

  // Key fill ratio
  const ratioPreset = keyFillRatioPresets[state.keyFillRatio];
  if (ratioPreset) {
    parts.push(ratioPreset.keywords);
  }

  // Light quality
  const qualityPreset = lightQualityPresets[state.lightQuality];
  if (qualityPreset) {
    parts.push(qualityPreset.keywords);
  }

  // Color temperature
  parts.push(getColorTemperatureKeywords(state.colorTemperature));

  // Shadow stop (only include if not default)
  if (state.shadowStop !== 0) {
    parts.push(getShadowStopKeywords(state.shadowStop));
  }

  // Rim light
  if (state.rimLight.enabled) {
    parts.push(getRimLightKeywords(state.rimLight.position));
  }

  return parts.length > 0 ? parts.join(', ') : null;
}

/**
 * Builds machine-readable advanced lighting output.
 *
 * @param state - Advanced lighting state
 * @returns Machine format string or null if disabled
 */
export function buildAdvancedLightingMachineOutput(state: AdvancedLightingState): string | null {
  if (!state.enabled) {
    return null;
  }

  const parts: string[] = [
    `key_position: ${state.keyLightPosition}`,
    `ratio: ${state.keyFillRatio}`,
    `quality: ${state.lightQuality}`,
    `temp: ${state.colorTemperature}K`,
    `shadow: ${state.shadowStop > 0 ? '+' : ''}${state.shadowStop}`,
  ];

  if (state.rimLight.enabled) {
    parts.push(`rim: ${state.rimLight.position}`);
  }

  return `[LIGHTING] ${parts.join('; ')}`;
}
