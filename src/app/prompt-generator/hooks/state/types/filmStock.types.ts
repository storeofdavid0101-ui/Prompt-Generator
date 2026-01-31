/**
 * Film Stock State Types
 *
 * Type definitions for the film stock state hook.
 *
 * @module hooks/state/types/filmStock
 */

import type { PushPullValue, ProcessingType } from '../../../config/types/filmStock';

/**
 * Return type for useFilmStockState hook.
 */
export interface FilmStockStateReturn {
  /** Whether film stock emulation is enabled */
  readonly enabled: boolean;

  /** Set enabled state */
  readonly setEnabled: (enabled: boolean) => void;

  /** Selected film stock preset ID */
  readonly selectedStock: string | null;

  /** Set selected film stock */
  readonly setSelectedStock: (stock: string | null) => void;

  /** Push/pull processing value */
  readonly pushPull: PushPullValue;

  /** Set push/pull value */
  readonly setPushPull: (value: PushPullValue) => void;

  /** Processing type */
  readonly processingType: ProcessingType;

  /** Set processing type */
  readonly setProcessingType: (type: ProcessingType) => void;

  /** Reset to defaults */
  readonly reset: () => void;
}
