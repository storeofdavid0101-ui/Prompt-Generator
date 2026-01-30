/**
 * @fileoverview Midjourney-specific prompt strategy.
 * Handles parameter formatting for Midjourney's unique syntax.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Midjourney prompt strategy.
 *
 * Midjourney uses tag-based prompts with specific parameter flags:
 * - --ar for aspect ratio
 * - --s (stylize) for creativity (0-1000 scale)
 * - --chaos for variation (0-100)
 * - --q for quality (1 or 2)
 * - --no for negative prompts
 */
export const MidjourneyStrategy: ModelStrategy = {
  promptStyle: 'tags',
  supportsNegativePrompt: true,

  translateSliders(
    creativity: number,
    variation: number,
    uniqueness: number
  ): SliderParams {
    // Stylize: 0-100 input maps to 0-1000 output
    const stylizeValue = Math.round(creativity * 10);

    // Quality: Use --q 2 for high creativity settings
    const qualityParam = creativity > 70 ? '--q 2' : '';

    return {
      creativity: `--s ${stylizeValue}`,
      variation: `--chaos ${Math.round(variation)}`,
      quality: qualityParam,
    };
  },

  finalizePrompt(context: ModelContext): string {
    const params: string[] = [];

    if (context.aspectRatioDisplay) {
      params.push(`--ar ${context.aspectRatioDisplay}`);
    }

    if (context.creativeControlsEnabled) {
      const { creativity, variation, quality } = context.sliderParams;
      if (creativity) params.push(creativity);
      if (variation) params.push(variation);
      if (quality) params.push(quality);
    }

    if (context.negativePrompt.trim()) {
      params.push(`--no ${context.negativePrompt.trim()}`);
    }

    if (params.length === 0) {
      return context.basePrompt;
    }

    return `${context.basePrompt} ${params.join(' ')}`;
  },
};
