/**
 * Content State Type Definitions
 *
 * Types for subject, character, and location content management.
 *
 * @module hooks/state/types/content
 */

import type { CharacterItem } from '../../../config/types';
import type { Setter, ResetAction } from './common.types';

/**
 * Content state interface
 *
 * Manages the core content inputs: subject description,
 * character list, and scene location.
 */
export interface ContentState {
  /** Main subject/scene description text */
  readonly subject: string;

  /** List of character items with unique IDs */
  readonly characterItems: CharacterItem[];

  /** Current character input field value (before adding) */
  readonly currentCharacter: string;

  /** Scene location description */
  readonly location: string;

  /** Update subject description */
  readonly setSubject: Setter<string>;

  /** Update current character input field */
  readonly setCurrentCharacter: Setter<string>;

  /** Update scene location */
  readonly setLocation: Setter<string>;

  /** Add current character to the character list */
  readonly addCharacter: ResetAction;

  /** Remove a character by its unique ID */
  readonly removeCharacter: (id: string) => void;

  /** Reset all content fields to defaults */
  readonly reset: ResetAction;
}
