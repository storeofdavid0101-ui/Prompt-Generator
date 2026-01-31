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
 * character list, gaze direction, and scene location.
 */
export interface ContentState {
  /** Main subject/scene description text */
  readonly subject: string;

  /** List of character items with unique IDs */
  readonly characterItems: CharacterItem[];

  /** Current character input field value (before adding) */
  readonly currentCharacter: string;

  /** Selected gaze direction for the character */
  readonly gazeDirection: string;

  /** Selected pose/action for the character */
  readonly poseAction: string;

  /** Selected character position in frame (left/center/right) */
  readonly characterPosition: string;

  /** Scene location description */
  readonly location: string;

  /** Update subject description */
  readonly setSubject: Setter<string>;

  /** Update current character input field */
  readonly setCurrentCharacter: Setter<string>;

  /** Update gaze direction */
  readonly setGazeDirection: Setter<string>;

  /** Update pose/action */
  readonly setPoseAction: Setter<string>;

  /** Update character position in frame */
  readonly setCharacterPosition: Setter<string>;

  /** Update scene location */
  readonly setLocation: Setter<string>;

  /** Add current character to the character list */
  readonly addCharacter: ResetAction;

  /** Remove a character by its unique ID */
  readonly removeCharacter: (id: string) => void;

  /** Reset all content fields to defaults */
  readonly reset: ResetAction;

  /** Reset only subject */
  readonly resetSubject: ResetAction;

  /** Reset only character fields */
  readonly resetCharacter: ResetAction;

  /** Reset only gaze direction */
  readonly resetGaze: ResetAction;

  /** Reset only pose/action */
  readonly resetPose: ResetAction;

  /** Reset only character position */
  readonly resetPosition: ResetAction;

  /** Reset only location */
  readonly resetLocation: ResetAction;
}
