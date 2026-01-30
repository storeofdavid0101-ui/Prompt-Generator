/**
 * Director State Type Definitions
 *
 * Types for director style selection and conflict handling.
 *
 * @module hooks/state/types/director
 */

import type { Setter, ResetAction, ConflictHandlerParams } from './common.types';

/**
 * Director state interface
 *
 * Manages director style selection. Director styles can
 * conflict with certain visual settings and atmospheres.
 */
export interface DirectorState {
  /** Selected director style name (empty string = none) */
  readonly selectedDirector: string;

  /** Update director with automatic conflict clearing */
  readonly setDirector: Setter<string>;

  /** Reset director selection to default */
  readonly reset: ResetAction;
}

/**
 * Parameters for director state hook initialization
 *
 * Extends ConflictHandlerParams for consistency with camera hook.
 */
export interface UseDirectorStateParams extends ConflictHandlerParams {}
