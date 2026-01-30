/**
 * @fileoverview Base strategy interface for model-specific prompt formatting.
 * Defines the contract that all AI model strategies must implement.
 */

import type { ModelContext, SliderParams } from '../types';

/**
 * Strategy interface for AI model-specific prompt operations.
 * Each supported AI model implements this interface to handle
 * its unique parameter formatting and prompt structure.
 */
export interface ModelStrategy {
  /**
   * The preferred prompt composition style for this model.
   * - 'natural': Prose-based, flowing descriptions
   * - 'tags': Comma-separated keywords
   */
  readonly promptStyle: 'natural' | 'tags';

  /**
   * Whether the model supports negative prompts.
   */
  readonly supportsNegativePrompt: boolean;

  /**
   * Translates universal slider values (0-100) to model-specific parameters.
   *
   * @param creativity - Creativity level (0-100)
   * @param variation - Variation level (0-100)
   * @param uniqueness - Uniqueness level (0-100)
   * @returns Model-specific slider parameter strings
   */
  translateSliders(
    creativity: number,
    variation: number,
    uniqueness: number
  ): SliderParams;

  /**
   * Applies model-specific formatting to the base prompt.
   * Adds aspect ratio, negative prompts, creative parameters, etc.
   *
   * @param context - The model context containing base prompt and settings
   * @returns Finalized prompt string for the model
   */
  finalizePrompt(context: ModelContext): string;
}

/**
 * Default empty slider parameters.
 * Used as a base for models that don't use certain parameters.
 */
export const EMPTY_SLIDER_PARAMS: SliderParams = {
  creativity: '',
  variation: '',
  quality: '',
};
