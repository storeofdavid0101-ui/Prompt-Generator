/**
 * @fileoverview Stable Diffusion-specific prompt strategy.
 * Handles parameter formatting for Stable Diffusion models.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Stable Diffusion prompt strategy.
 *
 * Stable Diffusion uses tag-based prompts with:
 * - CFG Scale for creativity guidance (1-30 typical)
 * - Denoising strength for variation
 * - Steps for quality (30-50 typical)
 * - Negative prompt on separate line
 */
export const StableDiffusionStrategy: ModelStrategy = {
  promptStyle: 'tags',
  supportsNegativePrompt: true,

  translateSliders(
    creativity: number,
    variation: number,
    uniqueness: number
  ): SliderParams {
    // CFG Scale: 0-100 input maps to 0-30 output
    const cfgValue = ((creativity / 100) * 30).toFixed(1);

    // Steps: Higher uniqueness = more steps for detail
    const stepsValue = uniqueness > 50 ? 'Steps: 50' : 'Steps: 30';

    return {
      creativity: `CFG Scale: ${cfgValue}`,
      variation: `Denoising: ${variation}%`,
      quality: stepsValue,
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `, ${context.aspectRatioDisplay} aspect ratio`;
    }

    if (context.negativePrompt.trim()) {
      prompt += `\n\nNegative prompt: ${context.negativePrompt.trim()}`;
    }

    if (context.creativeControlsEnabled) {
      const { creativity, quality } = context.sliderParams;
      prompt += `\n\n${creativity}, ${quality}`;
    }

    return prompt;
  },
};
