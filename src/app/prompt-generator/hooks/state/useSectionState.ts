/**
 * Section UI State Hook
 *
 * Manages the expanded/collapsed and locked states of UI sections.
 * Provides centralized control over section visibility and locking.
 *
 * @module hooks/state/useSectionState
 */

'use client';

import { useState, useCallback } from 'react';
import type { ExpandedSections, LockedSections } from '../../config/types';
import type { SectionState } from './types';
import { DEFAULT_EXPANDED_SECTIONS, DEFAULT_LOCKED_SECTIONS } from './constants';

/**
 * Hook for managing section UI state (expand/collapse and lock)
 *
 * @returns Section state and handlers
 *
 * @example
 * ```tsx
 * const sections = useSectionState();
 *
 * // Toggle a section's visibility
 * sections.toggleSection('camera');
 *
 * // Lock a section
 * sections.toggleLock('lighting');
 *
 * // Check if locked before allowing changes
 * if (!sections.isLocked('atmosphere')) {
 *   // Allow changes
 * }
 * ```
 */
export function useSectionState(): SectionState {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    () => ({ ...DEFAULT_EXPANDED_SECTIONS })
  );
  const [lockedSections, setLockedSections] = useState<LockedSections>(
    () => ({ ...DEFAULT_LOCKED_SECTIONS })
  );

  /**
   * Toggle a section's expanded/collapsed state
   */
  const toggleSection = useCallback((key: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  /**
   * Toggle a section's locked state
   */
  const toggleLock = useCallback((key: keyof LockedSections) => {
    setLockedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  /**
   * Check if a specific section is locked
   */
  const isLocked = useCallback(
    (key: keyof LockedSections): boolean => {
      return lockedSections[key];
    },
    [lockedSections]
  );

  return {
    expandedSections,
    lockedSections,
    toggleSection,
    toggleLock,
    isLocked,
  };
}
