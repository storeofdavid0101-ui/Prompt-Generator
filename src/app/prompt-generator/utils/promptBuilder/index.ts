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
import { modelConfigs } from '../../config';

/** Default message when no prompt content is provided */
const EMPTY_PROMPT_MESSAGE = 'Start by adding a subject...';

/** Slider value bounds */
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

/**
 * Clamps a slider value to the valid range (0-100).
 * Ensures slider values don't produce invalid model parameters.
 */
function clampSlider(value: number): number {
  return Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, value));
}

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
  // Pass model to handle model-specific transformations (e.g., anonymous director keywords for ChatGPT)
  const components = resolveComponents(params, params.selectedModel);

  // Check if model has strict content policies (ChatGPT, DALL-E, Firefly)
  const useSafeMode = modelConfigs[params.selectedModel]?.strictContentPolicy === true;

  // Build base prompt using model's preferred style
  // Safe mode uses simplified structure to avoid trigger phrases
  const basePrompt = strategy.promptStyle === 'natural'
    ? composeNaturalPrompt(components, useSafeMode)
    : composeTagPrompt(components);

  // Handle empty prompt case
  if (!basePrompt) {
    return EMPTY_PROMPT_MESSAGE;
  }

  // Translate slider values for this model (clamped to 0-100 range)
  const sliderParams = strategy.translateSliders(
    clampSlider(params.creativity),
    clampSlider(params.variation),
    clampSlider(params.uniqueness)
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
