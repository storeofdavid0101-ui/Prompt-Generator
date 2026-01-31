/**
 * Grain Engine Prompt Builder
 *
 * Converts grain engine state into prompt keywords.
 *
 * @module utils/promptBuilder/grainEngineBuilder
 */

import type { GrainEngineState } from '../../config/types/grainEngine';
import {
  grainTypePresets,
  grainSizePresets,
  getIntensityDescriptor,
  dustScratchesKeywords,
  gateWeaveKeywords,
  getDustScratchesDescription,
} from '../../config/grainEngine';

/**
 * Resolves grain engine state into prompt keywords.
 *
 * @param state - Grain engine state
 * @param useSafeMode - Whether to use safe keywords for strict content policy models
 * @returns Prompt keywords or null if disabled
 */
export function resolveGrainEngine(
  state: GrainEngineState,
  useSafeMode: boolean = false
): string | null {
  if (!state.enabled || state.grainType === 'none') {
    return null;
  }

  const parts: string[] = [];

  // Grain type
  const typePreset = grainTypePresets[state.grainType];
  if (typePreset && typePreset.keywords) {
    const typeKeywords = useSafeMode && typePreset.safeKeywords
      ? typePreset.safeKeywords
      : typePreset.keywords;
    parts.push(typeKeywords);
  }

  // Grain size
  const sizePreset = grainSizePresets[state.grainSize];
  if (sizePreset) {
    parts.push(sizePreset.keywords);
  }

  // Intensity descriptor
  const intensityDesc = getIntensityDescriptor(state.intensity);
  parts.push(`${intensityDesc} grain intensity`);

  // Dust and scratches
  if (state.dustScratches.enabled) {
    const dustBase = useSafeMode ? dustScratchesKeywords.safeBase : dustScratchesKeywords.base;
    const dustIntensity = getDustScratchesDescription(state.dustScratches.intensity);
    parts.push(`${dustBase}, ${dustIntensity}`);
  }

  // Gate weave
  if (state.gateWeave) {
    const weaveKeywords = useSafeMode
      ? gateWeaveKeywords.safeKeywords
      : gateWeaveKeywords.normal;
    parts.push(weaveKeywords);
  }

  return parts.length > 0 ? parts.join(', ') : null;
}

/**
 * Builds machine-readable grain engine output.
 *
 * @param state - Grain engine state
 * @returns Machine format string or null if disabled
 */
export function buildGrainEngineMachineOutput(state: GrainEngineState): string | null {
  if (!state.enabled || state.grainType === 'none') {
    return null;
  }

  const parts: string[] = [
    `type: ${state.grainType}`,
    `size: ${state.grainSize}`,
    `intensity: ${state.intensity}%`,
  ];

  if (state.dustScratches.enabled) {
    parts.push(`dust_scratches: ${state.dustScratches.intensity}%`);
  }

  if (state.gateWeave) {
    parts.push('gate_weave: enabled');
  }

  return `[GRAIN] ${parts.join('; ')}`;
}
