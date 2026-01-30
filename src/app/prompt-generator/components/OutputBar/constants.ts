/**
 * Constants and configuration for OutputBar component
 * Centralizes all magic numbers, breakpoints, and animation settings
 */

/** Breakpoint for mobile device detection (in pixels) */
export const MOBILE_BREAKPOINT = 768;

/** Distance from bottom of page to trigger auto-expand (in pixels) */
export const SCROLL_TRIGGER_OFFSET = 150;

/** Maximum height for expanded prompt preview */
export const EXPANDED_PREVIEW_MAX_HEIGHT = '30vh';

/** Throttle delay for scroll handler (in milliseconds) */
export const SCROLL_THROTTLE_MS = 100;

/** Maximum width of the output bar container */
export const CONTAINER_MAX_WIDTH = '480px';

/**
 * Animation variants for Framer Motion
 * Defines enter/exit animations for the output bar
 */
export const OUTPUT_BAR_VARIANTS = {
  initial: { y: 100 },
  animate: { y: 0 },
  exit: { y: 100 },
} as const;

/**
 * Animation variants for content transitions
 */
export const CONTENT_VARIANTS = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
} as const;

/**
 * Animation settings for prompt text transitions
 */
export const TEXT_TRANSITION = {
  duration: 0.15,
} as const;

/**
 * Button tap animation scale values
 */
export const BUTTON_ANIMATION = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
} as const;

/**
 * Icon animation scale values
 */
export const ICON_ANIMATION = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
} as const;

/**
 * Accessibility labels
 */
export const ARIA_LABELS = {
  toggleMinimize: 'Toggle output bar visibility',
  expandPrompt: 'Expand prompt preview',
  collapsePrompt: 'Collapse prompt preview',
  resetButton: 'Reset all settings',
  copyButton: 'Copy prompt to clipboard',
  copiedButton: 'Prompt copied to clipboard',
  promptPreview: 'Generated prompt preview',
} as const;

/**
 * Disclaimer text
 */
export const DISCLAIMER_TEXT =
  'All director styles are for inspirational purposes and are not endorsed by the artists.';
