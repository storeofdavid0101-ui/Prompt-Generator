/**
 * @fileoverview ChatGPT-specific prompt strategy.
 * Handles parameter formatting for ChatGPT's image generation.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';
import { EMPTY_SLIDER_PARAMS } from './BaseModelStrategy';

/**
 * ChatGPT prompt strategy.
 *
 * ChatGPT uses natural language prompts with conversational formatting.
 * - Aspect ratio expressed naturally in the prompt
 * - Negative prompts expressed as "without X" phrases
 * - No specific slider parameters (uses LLM's interpretation)
 */
export const ChatGPTStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: true,

  translateSliders(
    _creativity: number,
    _variation: number,
    _uniqueness: number
  ): SliderParams {
    // ChatGPT doesn't use specific slider parameters
    return EMPTY_SLIDER_PARAMS;
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `, in ${context.aspectRatioDisplay} aspect ratio`;
    }

    if (context.negativePrompt.trim()) {
      prompt += `, without ${context.negativePrompt.trim()}`;
    }

    // Add "generate this:" prefix to help ChatGPT understand intent
    return `generate this: ${prompt}`;
  },
};
