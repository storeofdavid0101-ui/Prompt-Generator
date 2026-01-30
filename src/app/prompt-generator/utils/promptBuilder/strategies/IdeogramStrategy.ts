/**
 * @fileoverview Ideogram-specific prompt strategy.
 * Handles parameter formatting for Ideogram's AI model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Ideogram prompt strategy.
 *
 * Ideogram uses tag-based prompts with flag-style parameters:
 * - --aspect for aspect ratio
 * - --style for artistic vs realistic rendering
 * - --variation for variation level
 * - --negative for exclusions
 */
export const IdeogramStrategy: ModelStrategy = {
  promptStyle: 'tags',
  supportsNegativePrompt: true,

  translateSliders(
    creativity: number,
    variation: number,
    _uniqueness: number
  ): SliderParams {
    // Style: Higher creativity = artistic, lower = realistic
    const styleValue = creativity > 70 ? 'artistic' : 'realistic';

    return {
      creativity: `--style ${styleValue}`,
      variation: `--variation ${variation}`,
      quality: '',
    };
  },

  finalizePrompt(context: ModelContext): string {
    const params: string[] = [];

    if (context.aspectRatioDisplay) {
      params.push(`--aspect ${context.aspectRatioDisplay}`);
    }

    if (context.negativePrompt.trim()) {
      params.push(`--negative ${context.negativePrompt.trim()}`);
    }

    if (context.creativeControlsEnabled) {
      const { creativity, variation } = context.sliderParams;
      if (creativity) params.push(creativity);
      if (variation) params.push(variation);
    }

    if (params.length === 0) {
      return context.basePrompt;
    }

    return `${context.basePrompt} ${params.join(' ')}`;
  },
};
