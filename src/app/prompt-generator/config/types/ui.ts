/**
 * UI Component Type Definitions
 *
 * Type definitions for UI components and presentation logic.
 * Kept separate from business logic types for clean architecture.
 *
 * @module config/types/ui
 * @version 1.0.0
 */

/**
 * Gradient direction values.
 *
 * CSS linear-gradient direction keywords for visual previews.
 */
export type GradientDirection =
  | 'to right'
  | 'to left'
  | 'to bottom'
  | 'to top'
  | 'to bottom right'
  | 'to bottom left'
  | 'to top right'
  | 'to top left';

/**
 * Selection state for option items.
 *
 * Used by selectors to indicate current selection status.
 */
export type SelectionState = 'selected' | 'blocked' | 'available';

/**
 * Toast notification type.
 *
 * Categorizes toast messages for appropriate styling.
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Animation timing preset.
 *
 * Standardized animation durations for consistent UX.
 */
export type AnimationTiming = 'instant' | 'fast' | 'normal' | 'slow';

/**
 * Section collapse transition state.
 *
 * Used for animating section expand/collapse.
 */
export type CollapseState = 'collapsed' | 'expanding' | 'expanded' | 'collapsing';

/**
 * Button variant types.
 *
 * Defines visual treatment for button components.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Input size variants.
 *
 * Standardized input field sizes.
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Badge status indicators.
 *
 * Visual status badges for labels and indicators.
 */
export type BadgeStatus = 'active' | 'inactive' | 'warning' | 'error';
