/**
 * UI State Selector Hook
 *
 * Provides access to UI-related state (sections, locks, conflicts).
 * Use this for components managing UI state.
 *
 * @module hooks/context/selectors/useUISelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';
import type { ExpandedSections, LockedSections, ConflictResult } from '../../../config/types';

/**
 * UI selector return type
 */
export interface UISelectorReturn {
  /** Map of locked section states */
  readonly lockedSections: LockedSections;
  /** Toggle section lock state */
  readonly toggleLock: (key: keyof LockedSections) => void;
  /** Map of expanded section states */
  readonly expandedSections: ExpandedSections;
  /** Toggle section expanded state */
  readonly toggleSection: (key: keyof ExpandedSections) => void;
  /** Current conflict detection results */
  readonly conflicts: ConflictResult;
}

/**
 * Hook to access only UI-related state
 *
 * @returns UI state and handlers
 *
 * @example
 * ```tsx
 * function SectionHeader({ sectionKey }) {
 *   const { lockedSections, toggleLock, expandedSections, toggleSection } = useUISelector();
 *   return (
 *     <button onClick={() => toggleSection(sectionKey)}>
 *       {expandedSections[sectionKey] ? 'Collapse' : 'Expand'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useUISelector(): UISelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      lockedSections: context.lockedSections,
      toggleLock: context.toggleLock,
      expandedSections: context.expandedSections,
      toggleSection: context.toggleSection,
      conflicts: context.conflicts,
    }),
    [
      context.lockedSections,
      context.toggleLock,
      context.expandedSections,
      context.toggleSection,
      context.conflicts,
    ]
  );
}
