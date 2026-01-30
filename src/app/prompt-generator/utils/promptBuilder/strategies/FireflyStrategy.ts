/**
 * @fileoverview Adobe Firefly-specific prompt strategy.
 * Handles parameter formatting for Adobe's Firefly model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Adobe Firefly prompt strategy.
 *
 * Firefly uses natural language prompts with:
 * - Aspect ratio expressed naturally in the prompt
 * - style_strength for creativity levels
 * - quality for output resolution
 *
 * Note: Firefly does NOT support negative prompts in the traditional sense.
 */
export const FireflyStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: false,

  translateSliders(
    creativity: number,
    _variation: number,
    uniqueness: number
  ): SliderParams {
    // Style Strength: Based on creativity threshold
    const styleValue = creativity > 70 ? 'style_strength: high' : 'style_strength: medium';

    // Quality: Based on uniqueness threshold
    const qualityValue = uniqueness > 50 ? 'quality: high' : 'quality: standard';

    return {
      creativity: styleValue,
      variation: '',
      quality: qualityValue,
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `, ${context.aspectRatioDisplay} aspect ratio`;
    }

    if (context.creativeControlsEnabled) {
      const { creativity, quality } = context.sliderParams;
      prompt += `\n\n[${creativity}, ${quality}]`;
    }

    return prompt;
  },
};
