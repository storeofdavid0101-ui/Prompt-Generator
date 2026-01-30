/**
 * Constants for CameraSettings Components
 *
 * Centralizes CSS classes, animation configs, and static values.
 *
 * @module CameraSettings/constants
 */

/**
 * Animation configuration for collapsible content
 */
export const COLLAPSE_ANIMATION = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
} as const;

/**
 * Opacity values for locked states
 */
export const OPACITY = {
  enabled: 1,
  disabled: 0.6,
} as const;

/**
 * CSS classes for form elements
 */
export const CSS_CLASSES = {
  /** Base select/input styling */
  input: 'w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2',
  /** Input with bottom margin */
  inputWithMargin: 'w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2',
  /** Label styling */
  label: 'block text-xs mb-2',
  /** Info banner base styling */
  infoBanner: 'w-full rounded-lg px-3 py-2 text-sm flex items-center gap-2',
  /** Small info banner styling */
  infoBannerSmall: 'w-full rounded-lg px-3 py-1.5 text-xs mb-2 flex items-center gap-2',
  /** Icon size small */
  iconSmall: 'w-3 h-3',
} as const;

/**
 * Aria labels for accessibility
 */
export const ARIA_LABELS = {
  cameraSelect: 'Select camera type',
  cameraCustom: 'Enter custom camera name',
  lensSelect: 'Select lens focal length',
  lensCustom: 'Enter custom lens specification',
  shotSelect: 'Select shot type',
  shotCustom: 'Enter custom shot description',
  aspectRatioSelect: 'Select aspect ratio',
} as const;

/**
 * Placeholder texts
 */
export const PLACEHOLDERS = {
  customCamera: 'Or enter custom camera (e.g., Canon 5D)',
  customLens: 'Or enter custom lens (e.g., 21mm Zeiss)',
  customShot: 'Or enter custom shot type',
} as const;

/**
 * Section key for the camera settings
 */
export const SECTION_KEY = 'camera';
