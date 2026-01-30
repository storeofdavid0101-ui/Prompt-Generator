/**
 * Advanced Tools Header Component
 *
 * Specialized header for the Advanced Tools accordion section.
 * Includes expand/collapse toggle and section lock functionality.
 *
 * @module AdvancedTools/AdvancedToolsHeader
 */

'use client';

import { memo, useCallback, useMemo, type MouseEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Settings, ChevronDown, Lock, Unlock } from 'lucide-react';
import { ARIA_LABELS, OPACITY } from './constants';
import type { ThemeColors } from '../../config/types';

interface AdvancedToolsHeaderProps {
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Whether the section is locked */
  isLocked: boolean;
  /** Theme color configuration */
  themeColors: ThemeColors;
  /** Callback to toggle section visibility */
  onToggle: () => void;
  /** Callback to toggle section lock */
  onToggleLock: () => void;
}

/**
 * Header component for the Advanced Tools section
 *
 * Provides expand/collapse functionality and lock toggle.
 * Fully accessible with keyboard navigation support.
 *
 * @example
 * ```tsx
 * <AdvancedToolsHeader
 *   isExpanded={showAdvanced}
 *   isLocked={isLocked}
 *   onToggle={handleToggle}
 *   onToggleLock={handleLock}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const AdvancedToolsHeader = memo(function AdvancedToolsHeader({
  isExpanded,
  isLocked,
  themeColors,
  onToggle,
  onToggleLock,
}: AdvancedToolsHeaderProps) {
  /**
   * Handle lock button click
   */
  const handleLockClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onToggleLock();
    },
    [onToggleLock]
  );

  /**
   * Handle keyboard navigation for lock button
   */
  const handleLockKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        onToggleLock();
      }
    },
    [onToggleLock]
  );

  /**
   * Memoized lock button styles
   */
  const lockButtonStyles = useMemo(
    () => ({
      color: isLocked ? themeColors.accent : themeColors.textTertiary,
      backgroundColor: isLocked ? `${themeColors.accent}15` : 'transparent',
    }),
    [isLocked, themeColors]
  );

  const ariaLabel = isExpanded
    ? ARIA_LABELS.collapseSection
    : ARIA_LABELS.expandSection;

  const lockAriaLabel = isLocked
    ? ARIA_LABELS.unlockSection
    : ARIA_LABELS.lockSection;

  return (
    <div className="flex items-center justify-between p-4">
      {/* Expand/Collapse button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={ariaLabel}
        className="flex-1 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
      >
        <Settings
          className="w-4 h-4"
          style={{ color: themeColors.accent }}
          aria-hidden="true"
        />
        <span
          className="text-sm font-medium"
          style={{ color: themeColors.textPrimary }}
        >
          Advanced Tools
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: themeColors.textTertiary }}
            aria-hidden="true"
          />
        </motion.div>
      </button>

      {/* Lock toggle button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLockClick}
        onKeyDown={handleLockKeyDown}
        aria-pressed={isLocked}
        aria-label={lockAriaLabel}
        title={lockAriaLabel}
        className="p-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2"
        style={lockButtonStyles}
      >
        {isLocked ? (
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
});

AdvancedToolsHeader.displayName = 'AdvancedToolsHeader';
