/**
 * Output Format State Types
 *
 * Type definitions for the output format state hook.
 *
 * @module hooks/state/types/outputFormat
 */

import type { OutputMode } from '../../../config/types/outputFormat';

/**
 * Return type for useOutputFormatState hook.
 */
export interface OutputFormatStateReturn {
  /** Current output mode */
  readonly mode: OutputMode;

  /** Set the output mode */
  readonly setMode: (mode: OutputMode) => void;

  /** Reset to default mode */
  readonly reset: () => void;
}
