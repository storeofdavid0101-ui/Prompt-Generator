/**
 * @fileoverview Nano Banano-specific prompt strategy.
 * Handles parameter formatting for Google's Nano Banano image generation.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';
import { EMPTY_SLIDER_PARAMS } from './BaseModelStrategy';

/**
 * Nano Banano prompt strategy.
 *
 * Nano Banano (Google's Gemini-based image model) uses natural language prompts
 * with structured descriptive elements:
 * - Subject + action + scene structure
 * - Detailed camera/lighting specifications supported
 * - Excellent text rendering capabilities
 * - No negative prompt support (uses positive descriptive language only)
 */
export const NanoBananoStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: false,

  translateSliders(
    _creativity: number,
    _variation: number,
    _uniqueness: number
  ): SliderParams {
    // Nano Banano doesn't use specific slider parameters
    return EMPTY_SLIDER_PARAMS;
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `, ${context.aspectRatioDisplay} aspect ratio`;
    }

    // Nano Banano doesn't support negative prompts
    // Uses positive descriptive language instead

    return prompt;
  },
};
