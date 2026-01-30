/**
 * @fileoverview Leonardo.ai-specific prompt strategy.
 * Handles parameter formatting for Leonardo's AI model.
 */

import type { ModelStrategy } from './BaseModelStrategy';
import type { ModelContext, SliderParams } from '../types';

/**
 * Leonardo.ai prompt strategy.
 *
 * Leonardo uses natural language prompts with bracketed parameters:
 * - [dimensions: X:Y] for aspect ratio
 * - [negative_prompt: X] for exclusions
 * - guidance_scale for creativity (0-20 scale)
 * - preset_style for variation-based rendering
 */
export const LeonardoStrategy: ModelStrategy = {
  promptStyle: 'natural',
  supportsNegativePrompt: true,

  translateSliders(
    creativity: number,
    variation: number,
    uniqueness: number
  ): SliderParams {
    // Guidance Scale: 0-100 input maps to 0-20 output
    const guidanceValue = ((creativity / 100) * 20).toFixed(1);

    // Preset Style: Based on variation threshold
    const presetValue = variation > 50 ? 'preset_style: dynamic' : 'preset_style: cinematic';

    // High Resolution: Based on uniqueness threshold
    const qualityValue = uniqueness > 50 ? 'high_resolution: true' : '';

    return {
      creativity: `guidance_scale: ${guidanceValue}`,
      variation: presetValue,
      quality: qualityValue,
    };
  },

  finalizePrompt(context: ModelContext): string {
    let prompt = context.basePrompt;

    if (context.aspectRatioDisplay) {
      prompt += `\n\n[dimensions: ${context.aspectRatioDisplay}]`;
    }

    if (context.negativePrompt.trim()) {
      prompt += `\n[negative_prompt: ${context.negativePrompt.trim()}]`;
    }

    if (context.creativeControlsEnabled) {
      const { creativity, variation } = context.sliderParams;
      prompt += `\n[${creativity}, ${variation}]`;
    }

    return prompt;
  },
};
