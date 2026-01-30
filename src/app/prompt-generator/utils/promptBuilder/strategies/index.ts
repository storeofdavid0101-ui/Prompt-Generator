/**
 * @fileoverview Model strategy registry and factory.
 * Provides centralized access to all model-specific prompt strategies.
 */

import type { AIModel } from '../types';
import type { ModelStrategy } from './BaseModelStrategy';
import { MidjourneyStrategy } from './MidjourneyStrategy';
import { FluxStrategy } from './FluxStrategy';
import { StableDiffusionStrategy } from './StableDiffusionStrategy';
import { DallE3Strategy } from './DallE3Strategy';
import { ChatGPTStrategy } from './ChatGPTStrategy';
import { ImagenStrategy } from './ImagenStrategy';
import { IdeogramStrategy } from './IdeogramStrategy';
import { LeonardoStrategy } from './LeonardoStrategy';
import { FireflyStrategy } from './FireflyStrategy';

/**
 * Registry mapping AI model identifiers to their prompt strategies.
 * Each strategy encapsulates model-specific formatting logic.
 */
const strategyRegistry: Record<AIModel, ModelStrategy> = {
  midjourney: MidjourneyStrategy,
  flux: FluxStrategy,
  'stable-diffusion': StableDiffusionStrategy,
  dalle3: DallE3Strategy,
  chatgpt: ChatGPTStrategy,
  imagen: ImagenStrategy,
  ideogram: IdeogramStrategy,
  leonardo: LeonardoStrategy,
  firefly: FireflyStrategy,
};

/**
 * Retrieves the prompt strategy for a given AI model.
 *
 * @param model - The target AI model identifier
 * @returns The corresponding model strategy
 * @throws Error if the model is not supported
 *
 * @example
 * const strategy = getModelStrategy('midjourney');
 * const params = strategy.translateSliders(75, 50, 60);
 */
export function getModelStrategy(model: AIModel): ModelStrategy {
  const strategy = strategyRegistry[model];

  if (!strategy) {
    throw new Error(`Unsupported AI model: ${model}`);
  }

  return strategy;
}

/**
 * Checks if a given model identifier has a registered strategy.
 *
 * @param model - The model identifier to check
 * @returns True if the model is supported
 */
export function isModelSupported(model: string): model is AIModel {
  return model in strategyRegistry;
}

/**
 * Returns an array of all supported AI model identifiers.
 */
export function getSupportedModels(): AIModel[] {
  return Object.keys(strategyRegistry) as AIModel[];
}

export type { ModelStrategy };
export { EMPTY_SLIDER_PARAMS } from './BaseModelStrategy';
