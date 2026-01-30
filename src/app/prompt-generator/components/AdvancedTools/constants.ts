/**
 * Constants for AdvancedTools components
 *
 * Centralizes magic numbers, animation configs, and static values
 * to improve maintainability and prevent inconsistencies.
 *
 * @module AdvancedTools/constants
 */

import { Sparkles, Layers, Zap } from 'lucide-react';
import type { CreativeSliderConfig } from './types';

/**
 * Animation configuration for the collapsible content
 */
export const COLLAPSE_ANIMATION = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.2, ease: 'easeInOut' },
} as const;

/**
 * Toggle switch dimensions and positions
 */
export const TOGGLE_CONFIG = {
  /** Width of the toggle track in pixels */
  trackWidth: 44,
  /** Height of the toggle track in pixels */
  trackHeight: 24,
  /** Size of the toggle knob in pixels */
  knobSize: 16,
  /** Padding from track edge in pixels */
  knobPadding: 4,
  /** Translation distance when toggled on */
  knobTranslateOn: 24,
  /** Translation distance when toggled off */
  knobTranslateOff: 4,
} as const;

/**
 * Opacity values for disabled/locked states
 */
export const OPACITY = {
  /** Opacity for fully enabled elements */
  enabled: 1,
  /** Opacity for disabled/locked elements */
  disabled: 0.6,
  /** Opacity for blocked/unavailable elements */
  blocked: 0.4,
} as const;

/**
 * Textarea configuration for negative prompt
 */
export const NEGATIVE_PROMPT_CONFIG = {
  /** Number of visible rows */
  rows: 2,
  /** Placeholder text */
  placeholder: 'blurry, low quality, distorted, watermark...',
} as const;

/**
 * Creative control sliders configuration
 * Defines the sliders shown when creative controls are enabled
 */
export const CREATIVE_SLIDERS: CreativeSliderConfig[] = [
  {
    id: 'creativity',
    label: 'Creativity',
    icon: Sparkles,
    valueKey: 'creativity',
    onChangeKey: 'onCreativityChange',
  },
  {
    id: 'variation',
    label: 'Variation',
    icon: Layers,
    valueKey: 'variation',
    onChangeKey: 'onVariationChange',
  },
  {
    id: 'uniqueness',
    label: 'Uniqueness',
    icon: Zap,
    valueKey: 'uniqueness',
    onChangeKey: 'onUniquenessChange',
  },
] as const;

/**
 * Grid configuration for depth of field options
 */
export const DOF_GRID_COLUMNS = 2;

/**
 * CSS class names used across components
 */
export const CSS_CLASSES = {
  /** Base card styling */
  card: 'rounded-2xl border backdrop-blur-xl overflow-hidden',
  /** Inner section container */
  section: 'p-3 rounded-xl border',
  /** Label styling */
  label: 'block text-xs font-medium mb-2',
  /** Input field styling */
  input: 'w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2',
  /** Grid button styling */
  gridButton: 'p-2.5 rounded-lg text-xs text-left transition-all border flex items-center justify-between',
  /** Placeholder section styling */
  placeholder: 'p-4 rounded-xl border-2 border-dashed',
} as const;

/**
 * Aria labels for accessibility
 */
export const ARIA_LABELS = {
  toggleCreativeControls: 'Toggle creative controls',
  lockSection: 'Lock this section',
  unlockSection: 'Unlock this section',
  expandSection: 'Expand advanced tools section',
  collapseSection: 'Collapse advanced tools section',
} as const;
