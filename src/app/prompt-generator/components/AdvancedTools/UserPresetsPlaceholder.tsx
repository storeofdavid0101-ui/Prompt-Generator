/**
 * User Presets Placeholder Component
 *
 * Placeholder UI for the upcoming user presets feature.
 * Displays a disabled state with "Coming Soon" badge.
 *
 * @module AdvancedTools/UserPresetsPlaceholder
 */

'use client';

import { memo, useMemo } from 'react';
import { Bookmark, Save } from 'lucide-react';
import { CSS_CLASSES } from './constants';
import type { UserPresetsPlaceholderProps } from './types';

/**
 * Placeholder for upcoming user presets feature
 *
 * Shows a preview of the presets functionality that will allow
 * users to save and recall their favorite parameter combinations.
 *
 * @example
 * ```tsx
 * <UserPresetsPlaceholder themeColors={themeColors} />
 * ```
 */
export const UserPresetsPlaceholder = memo(function UserPresetsPlaceholder({
  themeColors,
}: UserPresetsPlaceholderProps) {
  /**
   * Memoized badge styles
   */
  const badgeStyles = useMemo(
    () => ({
      backgroundColor: `${themeColors.warning}20`,
      color: themeColors.warning,
    }),
    [themeColors]
  );

  /**
   * Memoized button styles
   */
  const buttonStyles = useMemo(
    () => ({
      backgroundColor: themeColors.inputBackground,
      color: themeColors.textTertiary,
    }),
    [themeColors]
  );

  return (
    <section
      className={CSS_CLASSES.placeholder}
      style={{ borderColor: themeColors.borderColor }}
      aria-labelledby="presets-title"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Bookmark
          className="w-4 h-4"
          style={{ color: themeColors.textTertiary }}
          aria-hidden="true"
        />
        <h3
          id="presets-title"
          className="text-sm font-medium"
          style={{ color: themeColors.textSecondary }}
        >
          User Presets
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={badgeStyles}
          role="status"
        >
          Coming Soon
        </span>
      </div>

      {/* Description */}
      <p
        className="text-xs"
        style={{ color: themeColors.textTertiary }}
      >
        Save your favorite combinations for quick access
      </p>

      {/* Disabled action button */}
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="mt-3 w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
        style={buttonStyles}
      >
        <Save className="w-3 h-3" aria-hidden="true" />
        Save Current Settings
      </button>
    </section>
  );
});

UserPresetsPlaceholder.displayName = 'UserPresetsPlaceholder';
