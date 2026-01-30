/**
 * @fileoverview Prompt Builder - Main entry point.
 *
 * This module provides the core prompt generation functionality for Cineprompt.
 * It transforms user selections into optimized prompts for various AI image generators.
 *
 * Architecture:
 * - Strategy Pattern: Each AI model has its own strategy for formatting
 * - Single Responsibility: Components, composition, and model-specifics are separated
 * - Open/Closed: New models can be added without modifying existing code
 *
 * @example
 * import { generatePrompt } from './promptBuilder';
 *
 * const prompt = generatePrompt({
 *   subject: 'A lone samurai',
 *   selectedModel: 'midjourney',
 *   // ... other parameters
 * });
 */

import type { PromptBuilderParams, ModelContext } from './types';
import { resolveComponents, resolveAspectRatio } from './parameterResolver';
import { composeNaturalPrompt, composeTagPrompt } from './promptComposer';
import { getModelStrategy } from './strategies';

/** Default message when no prompt content is provided */
const EMPTY_PROMPT_MESSAGE = 'Start by adding a subject...';

/**
 * Generates an AI-optimized prompt from user selections.
 *
 * This is the main entry point for prompt generation. It:
 * 1. Resolves all user selections to prompt-ready components
 * 2. Composes the base prompt using the model's preferred style
 * 3. Applies model-specific parameters and formatting
 *
 * @param params - All user selections and settings
 * @returns The formatted prompt string optimized for the target AI model
 *
 * @example
 * const prompt = generatePrompt({
 *   subject: 'A mysterious castle',
 *   characterItems: [],
 *   currentCharacter: '',
 *   location: 'on a misty hilltop',
 *   selectedVisualPreset: 'cinematic',
 *   selectedColorPalette: 'moody',
 *   customColors: [],
 *   selectedAtmosphere: 'mysterious',
 *   selectedLighting: 'dramatic',
 *   selectedDirector: 'Christopher Nolan',
 *   selectedCamera: 'ARRI ALEXA',
 *   customCamera: '',
 *   selectedLens: '35mm',
 *   customLens: '',
 *   selectedShot: 'wide',
 *   customShot: '',
 *   depthOfField: 'deep',
 *   aspectRatio: '2.39:1',
 *   selectedModel: 'midjourney',
 *   negativePrompt: 'blurry, distorted',
 *   creativeControlsEnabled: true,
 *   creativity: 75,
 *   variation: 50,
 *   uniqueness: 60,
 * });
 */
export function generatePrompt(params: PromptBuilderParams): string {
  const strategy = getModelStrategy(params.selectedModel);

  // Resolve all user selections to prompt components
  const components = resolveComponents(params);

  // Build base prompt using model's preferred style
  const basePrompt = strategy.promptStyle === 'natural'
    ? composeNaturalPrompt(components)
    : composeTagPrompt(components);

  // Handle empty prompt case
  if (!basePrompt) {
    return EMPTY_PROMPT_MESSAGE;
  }

  // Translate slider values for this model
  const sliderParams = strategy.translateSliders(
    params.creativity,
    params.variation,
    params.uniqueness
  );

  // Build context for model-specific finalization
  const context: ModelContext = {
    basePrompt,
    aspectRatio: params.aspectRatio,
    aspectRatioDisplay: resolveAspectRatio(params.aspectRatio),
    negativePrompt: params.negativePrompt,
    creativeControlsEnabled: params.creativeControlsEnabled,
    sliderParams,
  };

  // Apply model-specific formatting and return final prompt
  return strategy.finalizePrompt(context);
}

// Re-export types for external use
export type {
  PromptBuilderParams,
  SliderParams,
  ResolvedComponents,
  ModelContext,
  AIModel,
  CharacterItem,
} from './types';

// Re-export utilities that may be useful externally
export { isValidHexColor, formatHexColor } from './colorUtils';
export { getModelStrategy, isModelSupported, getSupportedModels } from './strategies';
