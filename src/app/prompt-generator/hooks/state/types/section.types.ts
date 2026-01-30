/**
 * Section State Type Definitions
 *
 * Types for UI section expand/collapse and lock states.
 *
 * @module hooks/state/types/section
 */

import type { ExpandedSections, LockedSections } from '../../../config/types';

/**
 * Section state interface
 *
 * Manages UI state for collapsible sections including
 * their expanded/collapsed and locked/unlocked states.
 */
export interface SectionState {
  /** Map of section keys to their expanded state */
  readonly expandedSections: ExpandedSections;

  /** Map of section keys to their locked state */
  readonly lockedSections: LockedSections;

  /** Toggle a section's expanded/collapsed state */
  readonly toggleSection: (key: keyof ExpandedSections) => void;

  /** Toggle a section's locked/unlocked state */
  readonly toggleLock: (key: keyof LockedSections) => void;

  /** Check if a specific section is locked */
  readonly isLocked: (key: keyof LockedSections) => boolean;
}
