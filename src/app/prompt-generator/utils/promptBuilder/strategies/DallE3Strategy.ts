/**
 * @fileoverview DALL-E 3-specific prompt strategy.
 * Handles parameter formatting for OpenAI's DALL-E 3 model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * DALL-E 3 prompt strategy.
 *
 * DALL-E 3 uses natural language prompts with:
 * - style: vivid | natural (based on creativity)
 * - quality: hd | standard (based on uniqueness)
 *
 * Important: DALL-E 3 tends to include what you exclude in negative prompts,
 * so negative prompts are NOT supported and intentionally ignored.
 */
export const DallE3Strategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: false,

  translateSliders(
    creativity: number,
    _variation: number,
    uniqueness: number
  ): SliderParams {
    // Style: Higher creativity = vivid, lower = natural
    const styleValue = creativity > 70 ? 'style: vivid' : 'style: natural';

    // Quality: Higher uniqueness = HD quality
    const qualityValue = uniqueness > 50 ? 'quality: hd' : 'quality: standard';

    return {
      creativity: styleValue,
      variation: qualityValue,
      quality: '',
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `, ${context.aspectRatioDisplay} aspect ratio`;
    }

    // Note: Negative prompts intentionally not included for DALL-E 3
    // as they tend to cause the model to include the excluded elements

    return prompt;
  },
};
