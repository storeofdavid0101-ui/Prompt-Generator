/**
 * Type definitions for AdvancedTools components
 *
 * Centralizes all TypeScript interfaces and types used across
 * the AdvancedTools feature module.
 *
 * @module AdvancedTools/types
 */

import type { LucideIcon } from 'lucide-react';
import type { AIModel, ThemeColors, ConflictResult } from '../../config/types';

/**
 * Base props shared across all AdvancedTools sub-components
 */
export interface BaseAdvancedToolsProps {
  /** Theme color configuration for styling */
  themeColors: ThemeColors;
  /** Whether the section is locked from user interaction */
  isLocked: boolean;
}

/**
 * Props for the NegativePromptInput component
 */
export interface NegativePromptInputProps extends BaseAdvancedToolsProps {
  /** Current negative prompt value */
  value: string;
  /** Currently selected AI model */
  selectedModel: AIModel;
  /** Callback when negative prompt changes */
  onChange: (value: string) => void;
}

/**
 * Props for the CreativeControls component
 */
export interface CreativeControlsProps extends BaseAdvancedToolsProps {
  /** Whether creative controls are enabled */
  enabled: boolean;
  /** Creativity slider value (0-100) */
  creativity: number;
  /** Variation slider value (0-100) */
  variation: number;
  /** Uniqueness slider value (0-100) */
  uniqueness: number;
  /** Currently selected AI model for parameter translation info */
  selectedModel: AIModel;
  /** Callback to toggle creative controls on/off */
  onToggle: () => void;
  /** Callback when creativity value changes */
  onCreativityChange: (value: number) => void;
  /** Callback when variation value changes */
  onVariationChange: (value: number) => void;
  /** Callback when uniqueness value changes */
  onUniquenessChange: (value: number) => void;
}

/**
 * Props for the DepthOfFieldSelector component
 */
export interface DepthOfFieldSelectorProps extends BaseAdvancedToolsProps {
  /** Currently selected depth of field value */
  value: string;
  /** Conflict detection results for blocked DOF options */
  conflicts: ConflictResult;
  /** Callback when depth of field selection changes */
  onChange: (value: string) => void;
}

/**
 * Props for the UserPresetsPlaceholder component
 */
export interface UserPresetsPlaceholderProps {
  /** Theme color configuration for styling */
  themeColors: ThemeColors;
}

/**
 * Props for the accessible Toggle component
 */
export interface ToggleProps {
  /** Current toggle state */
  checked: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** Theme color configuration for styling */
  themeColors: ThemeColors;
  /** Callback when toggle state changes */
  onChange: () => void;
}

/**
 * Creative control slider configuration
 */
export interface CreativeSliderConfig {
  /** Unique identifier for the slider */
  id: string;
  /** Display label for the slider */
  label: string;
  /** Icon component to display */
  icon: LucideIcon;
  /** Current value getter key */
  valueKey: 'creativity' | 'variation' | 'uniqueness';
  /** Change handler key */
  onChangeKey: 'onCreativityChange' | 'onVariationChange' | 'onUniquenessChange';
}

/**
 * Main AdvancedTools component props
 */
export interface AdvancedToolsProps {
  /** Current negative prompt value */
  negativePrompt: string;
  /** Whether creative controls are enabled */
  creativeControlsEnabled: boolean;
  /** Creativity slider value */
  creativity: number;
  /** Variation slider value */
  variation: number;
  /** Uniqueness slider value */
  uniqueness: number;
  /** Selected depth of field */
  depthOfField: string;
  /** Currently selected AI model */
  selectedModel: AIModel;
  /** Whether the advanced section is expanded */
  showAdvanced: boolean;
  /** Whether the section is locked */
  isLocked: boolean;
  /** Conflict detection results */
  conflicts: ConflictResult;
  /** Theme color configuration */
  themeColors: ThemeColors;
  /** Callback to toggle section lock */
  onToggleLock: () => void;
  /** Callback when negative prompt changes */
  onNegativePromptChange: (value: string) => void;
  /** Callback to toggle creative controls */
  onCreativeControlsToggle: () => void;
  /** Callback when creativity changes */
  onCreativityChange: (value: number) => void;
  /** Callback when variation changes */
  onVariationChange: (value: number) => void;
  /** Callback when uniqueness changes */
  onUniquenessChange: (value: number) => void;
  /** Callback when depth of field changes */
  onDepthOfFieldChange: (value: string) => void;
  /** Callback to toggle advanced section visibility */
  onToggleAdvanced: () => void;
}
