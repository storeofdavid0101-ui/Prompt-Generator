/**
 * OutputBar - Main component for the sticky bottom prompt output bar
 *
 * Features:
 * - Responsive design with mobile-first approach
 * - State machine-based view management (minimized, collapsed, expanded, fully-expanded)
 * - Auto-expand on scroll to bottom (desktop only)
 * - Accessible with proper ARIA labels and keyboard navigation
 * - Performance optimized with memoization and throttled scroll handling
 *
 * @module OutputBar
 */

'use client';

import { memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OutputBarProps } from './types';
import { useOutputBarState } from './hooks';
import { ActionButtons, PromptPreview, MinimizedToggle } from './components';
import {
  OUTPUT_BAR_VARIANTS,
  CONTENT_VARIANTS,
  CONTAINER_MAX_WIDTH,
  DISCLAIMER_TEXT,
} from './constants';

/**
 * OutputBar component - Sticky bottom bar with prompt preview and action buttons
 *
 * Provides a persistent interface for viewing and copying the generated prompt.
 * Supports multiple view states for optimal UX across devices.
 *
 * @param props - Component props
 * @returns Rendered OutputBar component
 */
export const OutputBar = memo(function OutputBar({
  prompt,
  copied,
  onReset,
  onCopy,
  themeColors,
}: OutputBarProps) {
  // Get view state and handlers from custom hook
  const {
    viewState,
    isMinimized,
    toggleMinimize,
    handlePreviewClick,
    handleToggleExpand,
  } = useOutputBarState();

  // Memoize container styles to prevent recalculation on every render
  const containerStyles = useMemo(
    () => ({
      backgroundColor: isMinimized
        ? `${themeColors.cardBackground}ee`
        : themeColors.cardBackground,
      borderColor: themeColors.borderColor,
    }),
    [isMinimized, themeColors.cardBackground, themeColors.borderColor]
  );

  // Memoize disclaimer styles
  const disclaimerStyles = useMemo(
    () => ({ color: themeColors.textTertiary }),
    [themeColors.textTertiary]
  );

  // Memoize max-width style object
  const containerMaxWidthStyle = useMemo(
    () => ({ maxWidth: CONTAINER_MAX_WIDTH }),
    []
  );

  // Stable callback references for child components
  const stableOnReset = useCallback(() => onReset(), [onReset]);
  const stableOnCopy = useCallback(() => onCopy(), [onCopy]);

  return (
    <motion.div
      {...OUTPUT_BAR_VARIANTS}
      className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-xl z-50"
      style={containerStyles}
      role="region"
      aria-label="Prompt output"
    >
      <div className="mx-auto" style={containerMaxWidthStyle}>
        {/* Minimize/Expand Toggle */}
        <MinimizedToggle
          isMinimized={isMinimized}
          onToggle={toggleMinimize}
          themeColors={themeColors}
        />

        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* Minimized View - Compact action buttons only */
            <motion.div
              key="minimized"
              {...CONTENT_VARIANTS}
              className="px-4 pb-3"
            >
              <ActionButtons
                copied={copied}
                onReset={stableOnReset}
                onCopy={stableOnCopy}
                themeColors={themeColors}
                compact
              />
            </motion.div>
          ) : (
            /* Expanded View - Full preview and actions */
            <motion.div
              key="expanded"
              {...CONTENT_VARIANTS}
              className="px-4 pb-4"
            >
              {/* Prompt Preview */}
              <PromptPreview
                prompt={prompt}
                viewState={viewState}
                onPreviewClick={handlePreviewClick}
                onToggleExpand={handleToggleExpand}
                themeColors={themeColors}
              />

              {/* Action Buttons */}
              <ActionButtons
                copied={copied}
                onReset={stableOnReset}
                onCopy={stableOnCopy}
                themeColors={themeColors}
              />

              {/* Disclaimer */}
              <p
                className="text-[10px] text-center mt-3 opacity-60"
                style={disclaimerStyles}
              >
                {DISCLAIMER_TEXT}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
