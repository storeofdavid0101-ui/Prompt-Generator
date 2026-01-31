/**
 * Output Format Type Definitions
 *
 * Defines the output format modes for prompt generation.
 * Supports Prose (natural language), Machine (structured), and Hybrid (both).
 *
 * @module config/types/outputFormat
 */

/**
 * Output format modes for prompt generation.
 *
 * - prose: Natural language descriptions (existing behavior)
 * - machine: Structured key-value format for machine parsing
 * - hybrid: Combines prose description with structured technical data
 */
export type OutputMode = 'prose' | 'machine' | 'hybrid';

/**
 * Configuration for an output mode option.
 */
export interface OutputModeConfig {
  /** Unique identifier */
  readonly id: OutputMode;

  /** Display label */
  readonly label: string;

  /** Short description of the mode */
  readonly description: string;

  /** Example output snippet */
  readonly example: string;
}

/**
 * State for output format selection.
 */
export interface OutputFormatState {
  /** Currently selected output mode */
  readonly mode: OutputMode;
}
