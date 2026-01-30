/**
 * Common Type Definitions
 *
 * Shared utility types and base interfaces used across state modules.
 *
 * @module hooks/state/types/common
 */

import type { Atmosphere } from '../../../config/types';

/**
 * Valid range for slider values (0-100)
 */
export type SliderValue = number;

/**
 * Generic setter function type
 */
export type Setter<T> = (value: T) => void;

/**
 * Async action function type
 */
export type AsyncAction<T = void> = () => Promise<T>;

/**
 * Reset action function type
 */
export type ResetAction = () => void;

/**
 * Base parameters for hooks that handle preset conflicts.
 * Shared by camera and director state hooks.
 */
export interface ConflictHandlerParams {
  /** Whether the section is locked from changes */
  readonly isLocked: boolean;

  /** Current atmosphere selection (for conflict clearing) */
  readonly selectedAtmosphere: Atmosphere | null;

  /** Current visual preset (for conflict clearing) */
  readonly selectedVisualPreset: string | null;

  /** Callback to clear atmosphere on conflict */
  readonly onClearAtmosphere: ResetAction;

  /** Callback to clear visual preset on conflict */
  readonly onClearVisualPreset: ResetAction;
}
