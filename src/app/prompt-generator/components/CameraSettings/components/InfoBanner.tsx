/**
 * Info Banner Component
 *
 * Displays informational messages with an icon.
 * Used for fixed lens info, zoom range info, and restricted aspect ratios.
 *
 * @module CameraSettings/components/InfoBanner
 */

'use client';

import { memo, useMemo } from 'react';
import { CSS_CLASSES } from '../constants';
import type { InfoBannerProps } from '../types';

/**
 * Get styles based on banner variant
 */
function getVariantStyles(
  variant: InfoBannerProps['variant'],
  themeColors: InfoBannerProps['themeColors']
) {
  switch (variant) {
    case 'warning':
      return {
        iconColor: themeColors.warning,
        textColor: themeColors.textSecondary,
      };
    case 'locked':
      return {
        iconColor: themeColors.warning,
        textColor: themeColors.textSecondary,
      };
    case 'info':
    default:
      return {
        iconColor: themeColors.accent,
        textColor: themeColors.textTertiary,
      };
  }
}

/**
 * Informational banner with icon and text
 *
 * @example
 * ```tsx
 * <InfoBanner
 *   icon={Lock}
 *   text="50mm"
 *   suffix="(fixed)"
 *   variant="locked"
 *   themeColors={themeColors}
 * />
 * ```
 */
export const InfoBanner = memo(function InfoBanner({
  icon: Icon,
  text,
  suffix,
  themeColors,
  variant = 'info',
}: InfoBannerProps) {
  const variantStyles = getVariantStyles(variant, themeColors);

  /**
   * Memoized container styles
   */
  const containerStyles = useMemo(
    () => ({
      backgroundColor: themeColors.promptBg,
      border: `1px solid ${themeColors.borderColor}`,
      color: variantStyles.textColor,
    }),
    [themeColors, variantStyles.textColor]
  );

  const cssClass = variant === 'locked'
    ? CSS_CLASSES.infoBanner
    : CSS_CLASSES.infoBannerSmall;

  return (
    <div className={cssClass} style={containerStyles} role="status">
      <Icon
        className={CSS_CLASSES.iconSmall}
        style={{ color: variantStyles.iconColor }}
        aria-hidden="true"
      />
      <span>{text}</span>
      {suffix && (
        <span className="text-xs opacity-60">{suffix}</span>
      )}
    </div>
  );
});

InfoBanner.displayName = 'InfoBanner';
