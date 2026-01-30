/**
 * Accessible Toggle Switch Component
 *
 * A fully accessible toggle switch that follows WAI-ARIA guidelines.
 * Supports keyboard navigation and screen reader announcements.
 *
 * @module AdvancedTools/Toggle
 */

'use client';

import { memo, useCallback, type KeyboardEvent } from 'react';
import { TOGGLE_CONFIG, OPACITY } from './constants';
import type { ToggleProps } from './types';

/**
 * Accessible toggle switch with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <Toggle
 *   checked={isEnabled}
 *   onChange={handleToggle}
 *   ariaLabel="Enable dark mode"
 *   themeColors={themeColors}
 * />
 * ```
 */
export const Toggle = memo(function Toggle({
  checked,
  disabled = false,
  ariaLabel,
  themeColors,
  onChange,
}: ToggleProps) {
  /**
   * Handle keyboard interaction for accessibility
   * Supports Space and Enter keys
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        onChange();
      }
    },
    [disabled, onChange]
  );

  /**
   * Handle click events
   */
  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange();
    }
  }, [disabled, onChange]);

  const knobTransform = checked
    ? `translateX(${TOGGLE_CONFIG.knobTranslateOn}px)`
    : `translateX(${TOGGLE_CONFIG.knobTranslateOff}px)`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        width: TOGGLE_CONFIG.trackWidth,
        height: TOGGLE_CONFIG.trackHeight,
        backgroundColor: checked ? themeColors.accent : themeColors.borderColor,
        opacity: disabled ? OPACITY.disabled : OPACITY.enabled,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        className="absolute rounded-full bg-white transition-transform duration-200 ease-in-out"
        style={{
          top: TOGGLE_CONFIG.knobPadding,
          width: TOGGLE_CONFIG.knobSize,
          height: TOGGLE_CONFIG.knobSize,
          transform: knobTransform,
        }}
        aria-hidden="true"
      />
    </button>
  );
});

Toggle.displayName = 'Toggle';
