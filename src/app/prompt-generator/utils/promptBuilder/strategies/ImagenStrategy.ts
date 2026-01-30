/**
 * @fileoverview Google Imagen 3-specific prompt strategy.
 * Handles parameter formatting for Google's Imagen model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Imagen prompt strategy.
 *
 * Google Imagen 3 uses natural language prompts with bracketed parameters:
 * - [aspect_ratio: X:Y] for dimensions
 * - [negative_prompt: X] for exclusions
 * - Creativity expressed as descriptive terms
 */
export const ImagenStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: true,

  translateSliders(
    creativity: number,
    variation: number,
    uniqueness: number
  ): SliderParams {
    // Creativity: Descriptive terms based on threshold
    const creativityValue = creativity > 70 ? 'high creativity' : 'balanced creativity';

    // Quality: Based on uniqueness threshold
    const qualityValue = uniqueness > 50 ? 'high quality' : 'standard quality';

    return {
      creativity: creativityValue,
      variation: `seed variation: ${variation}`,
      quality: qualityValue,
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `\n\n[aspect_ratio: ${context.aspectRatioDisplay}]`;
    }

    if (context.negativePrompt.trim()) {
      prompt += `\n[negative_prompt: ${context.negativePrompt.trim()}]`;
    }

    if (context.creativeControlsEnabled) {
      const { creativity, quality } = context.sliderParams;
      prompt += `\n[${creativity}, ${quality}]`;
    }

    return prompt;
  },
};
