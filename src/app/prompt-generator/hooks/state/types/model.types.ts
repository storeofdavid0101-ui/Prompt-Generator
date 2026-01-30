/**
 * Model State Type Definitions
 *
 * Types for AI model selection state management.
 *
 * @module hooks/state/types/model
 */

import type { AIModel } from '../../../config/types';
import type { Setter } from './common.types';

/**
 * Model selection state interface
 *
 * Manages the currently selected AI model for prompt generation.
 * Each model may have different prompt formatting requirements.
 */
export interface ModelState {
  /** Currently selected AI model identifier */
  readonly selectedModel: AIModel;

  /** Handler to update the selected model */
  readonly setSelectedModel: Setter<AIModel>;
}
