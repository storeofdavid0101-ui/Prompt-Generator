/**
 * MinimizedToggle component for OutputBar
 * Toggle button to minimize/expand the output bar
 */

'use client';

import { memo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { MinimizedToggleProps } from '../types';
import { ARIA_LABELS } from '../constants';

/**
 * Toggle button for minimizing/expanding the output bar
 * Displays chevron icon indicating current state
 */
export const MinimizedToggle = memo(function MinimizedToggle({
  isMinimized,
  onToggle,
  themeColors,
}: MinimizedToggleProps) {
  const iconStyle = { color: themeColors.textTertiary };
  const Icon = isMinimized ? ChevronUp : ChevronDown;

  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-center py-1 hover:bg-black/5 transition-colors"
      aria-label={ARIA_LABELS.toggleMinimize}
      aria-expanded={!isMinimized}
    >
      <Icon className="w-4 h-4" style={iconStyle} aria-hidden="true" />
    </button>
  );
});
