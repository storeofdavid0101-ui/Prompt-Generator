/**
 * Clipboard State Type Definitions
 *
 * Types for clipboard operations and copy feedback.
 *
 * @module hooks/state/types/clipboard
 */

/**
 * Clipboard state interface
 *
 * Manages clipboard operations with visual feedback
 * when content is copied successfully.
 */
export interface ClipboardState {
  /** Whether content was recently copied (for UI feedback) */
  readonly copied: boolean;

  /** Copy text to system clipboard */
  readonly copy: (text: string) => Promise<void>;
}
