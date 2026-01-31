/**
 * Grain Engine Configuration
 *
 * Presets and options for film grain emulation.
 *
 * @module config/grainEngine
 */

import type { GrainType, GrainSize, GrainTypePreset, GrainSizePreset, GrainEngineState } from './types/grainEngine';

/**
 * Default grain engine state.
 */
export const DEFAULT_GRAIN_ENGINE_STATE: GrainEngineState = {
  enabled: false,
  grainType: 'silver-halide',
  grainSize: 'medium',
  intensity: 40,
  dustScratches: {
    enabled: false,
    intensity: 20,
  },
  gateWeave: false,
};

/**
 * Grain type presets with keywords for prompt generation.
 */
export const grainTypePresets: Record<GrainType, GrainTypePreset> = {
  'silver-halide': {
    id: 'silver-halide',
    name: 'Silver Halide',
    description: 'Classic photochemical film grain with organic structure',
    keywords: 'silver halide film grain, photochemical grain structure, organic film texture',
    safeKeywords: 'classic film grain, photographic grain texture, organic film aesthetics',
  },
  'digital-noise': {
    id: 'digital-noise',
    name: 'Digital Noise',
    description: 'Modern sensor noise pattern for digital look',
    keywords: 'digital sensor noise, electronic noise pattern, digital grain texture',
  },
  none: {
    id: 'none',
    name: 'No Grain',
    description: 'Clean image without grain',
    keywords: '',
  },
};

/**
 * Grain size options.
 */
export const grainSizePresets: Record<GrainSize, GrainSizePreset> = {
  fine: {
    id: 'fine',
    name: 'Fine',
    description: 'Subtle, barely visible grain',
    keywords: 'fine grain, subtle film texture, micro grain structure',
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    description: 'Visible but not overpowering grain',
    keywords: 'medium grain, visible film texture, moderate grain structure',
  },
  coarse: {
    id: 'coarse',
    name: 'Coarse',
    description: 'Heavy, prominent grain',
    keywords: 'coarse grain, heavy film texture, prominent grain structure, large grain particles',
  },
};

/**
 * Intensity level descriptors for prompt generation.
 */
export const intensityDescriptors: Record<string, { min: number; max: number; keywords: string }> = {
  subtle: { min: 0, max: 25, keywords: 'subtle, barely visible' },
  light: { min: 26, max: 40, keywords: 'light, gentle' },
  moderate: { min: 41, max: 60, keywords: 'moderate, noticeable' },
  strong: { min: 61, max: 80, keywords: 'strong, prominent' },
  heavy: { min: 81, max: 100, keywords: 'heavy, intense' },
};

/**
 * Get intensity descriptor based on value.
 */
export function getIntensityDescriptor(intensity: number): string {
  for (const [, config] of Object.entries(intensityDescriptors)) {
    if (intensity >= config.min && intensity <= config.max) {
      return config.keywords;
    }
  }
  return 'moderate';
}

/**
 * Dust and scratches keywords.
 */
export const dustScratchesKeywords = {
  base: 'film dust, light scratches, vintage wear',
  safeBase: 'film texture artifacts, vintage patina, aged film look',
  light: 'subtle dust particles',
  moderate: 'visible dust and light scratches',
  heavy: 'heavy dust, prominent scratches, aged film artifacts',
};

/**
 * Gate weave keywords.
 */
export const gateWeaveKeywords = {
  normal: 'subtle film gate weave, slight frame instability',
  safeKeywords: 'organic frame movement, film projection aesthetic',
};

/**
 * Get dust/scratches intensity description.
 */
export function getDustScratchesDescription(intensity: number): string {
  if (intensity <= 30) return dustScratchesKeywords.light;
  if (intensity <= 70) return dustScratchesKeywords.moderate;
  return dustScratchesKeywords.heavy;
}
