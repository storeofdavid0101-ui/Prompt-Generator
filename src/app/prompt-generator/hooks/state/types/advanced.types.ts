/**
 * Advanced State Type Definitions
 *
 * Types for advanced settings: negative prompt and visibility.
 *
 * @module hooks/state/types/advanced
 */

import type { Setter, ResetAction } from './common.types';

/**
 * Advanced settings state interface
 *
 * Manages advanced configuration options including
 * negative prompts and section visibility.
 */
export interface AdvancedState {
  /** Negative prompt text (things to exclude) */
  readonly negativePrompt: string;

  /** Whether advanced section is currently visible */
  readonly showAdvanced: boolean;

  /** Update negative prompt text */
  readonly setNegativePrompt: Setter<string>;

  /** Toggle advanced section visibility */
  readonly setShowAdvanced: Setter<boolean>;

  /** Reset advanced settings to defaults */
  readonly reset: ResetAction;
}
