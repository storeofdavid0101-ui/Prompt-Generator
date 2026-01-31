/**
 * Character Creator State Types
 *
 * Type definitions for the character creator state hook
 *
 * @module hooks/state/types/characterCreator.types
 */

import type { Setter, ResetAction } from './common.types';
import type { CharacterType, FaceFeatures, FaceFeatureKey } from '../../../config/types';

/**
 * Character Creator State Interface
 *
 * Manages the state for character type selection, face features,
 * custom species input, and clothing description.
 */
export interface CharacterCreatorState {
  // Character type (human or other)
  readonly characterType: CharacterType;
  readonly setCharacterType: Setter<CharacterType>;

  // Custom species (for non-human characters)
  readonly customSpecies: string;
  readonly setCustomSpecies: Setter<string>;

  // Face features (for human characters)
  readonly faceFeatures: FaceFeatures;
  readonly setFaceFeature: (feature: FaceFeatureKey, value: number) => void;
  readonly resetFaceFeatures: ResetAction;

  // Clothing/Attire description
  readonly clothing: string;
  readonly setClothing: Setter<string>;

  // Reset all
  readonly reset: ResetAction;
}
