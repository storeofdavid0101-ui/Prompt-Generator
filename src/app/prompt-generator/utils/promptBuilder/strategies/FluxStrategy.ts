/**
 * @fileoverview Flux-specific prompt strategy.
 * Handles parameter formatting for Black Forest Labs' Flux model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Flux prompt strategy.
 *
 * Flux uses natural language prompts with bracketed parameters:
 * - [guidance: X] for creativity (scale 1-20)
 * - [seed_variation: X] for variation
 * - [aspect_ratio: X:Y] for dimensions
 *
 * Note: Flux does NOT support negative prompts - they are ignored.
 */
export const FluxStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: false,

  translateSliders(
    creativity: number,
    variation: number,
    _uniqueness: number
  ): SliderParams {
    // Guidance: 0-100 input maps to 1-20 output (divided by 5)
    const guidanceValue = (creativity / 5).toFixed(1);

    return {
      creativity: `guidance: ${guidanceValue}`,
      variation: `seed_variation: ${variation}`,
      quality: '',
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.creativeControlsEnabled) {
      const { creativity, variation } = context.sliderParams;
      prompt += `\n\n[${creativity}, ${variation}]`;
    }

    if (context.aspectRatioDisplay) {
      prompt += `\n[aspect_ratio: ${context.aspectRatioDisplay}]`;
    }

    return prompt;
  },
};
