/**
 * Type Definitions for CameraSettings Components
 *
 * Centralizes all TypeScript interfaces for camera-related components.
 * Ensures type safety and consistent API contracts.
 *
 * @module CameraSettings/types
 */

import type { ThemeColors, ConflictResult, ZoomRange, HelpDescription } from '../../config/types';

/**
 * Base props shared across all camera sub-components
 */
export interface BaseCameraProps {
  /** Theme color configuration for styling */
  themeColors: ThemeColors;
  /** Whether the input is disabled/locked */
  isLocked: boolean;
}

/**
 * Props for select option items
 */
export interface SelectOption {
  /** Display label */
  label: string;
  /** Option value */
  value: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional suffix text (e.g., emoji warning) */
  suffix?: string;
}

/**
 * Props for the StyledSelect component
 */
export interface StyledSelectProps extends BaseCameraProps {
  /** Current selected value */
  value: string;
  /** Available options */
  options: SelectOption[];
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
  /** Additional CSS class for spacing */
  className?: string;
}

/**
 * Props for the SelectWithCustomInput component
 */
export interface SelectWithCustomInputProps extends BaseCameraProps {
  /** Label text for the input group */
  label: string;
  /** Current selected value from dropdown */
  selectedValue: string;
  /** Current custom input value */
  customValue: string;
  /** Available options for dropdown */
  options: SelectOption[];
  /** Placeholder text for custom input */
  customPlaceholder: string;
  /** Callback when dropdown selection changes */
  onSelectChange: (value: string) => void;
  /** Callback when custom input changes */
  onCustomChange: (value: string) => void;
  /** Optional aria-label for the select */
  selectAriaLabel?: string;
  /** Optional aria-label for the custom input */
  inputAriaLabel?: string;
  /** Optional help description for the label */
  help?: HelpDescription;
}

/**
 * Props for the InfoBanner component
 */
export interface InfoBannerProps {
  /** Icon component to display */
  icon: React.ElementType;
  /** Main text content */
  text: string;
  /** Optional secondary/suffix text */
  suffix?: string;
  /** Theme color configuration */
  themeColors: ThemeColors;
  /** Visual variant of the banner */
  variant?: 'info' | 'warning' | 'locked';
}

/**
 * Props for the CameraTypeSelector component
 */
export interface CameraTypeSelectorProps extends BaseCameraProps {
  /** Currently selected camera */
  selectedCamera: string;
  /** Custom camera input value */
  customCamera: string;
  /** Set of blocked camera names from conflicts */
  blockedCameras: Set<string>;
  /** Callback when camera selection changes */
  onCameraChange: (camera: string) => void;
  /** Callback when custom camera input changes */
  onCustomCameraChange: (value: string) => void;
}

/**
 * Props for the LensSelector component
 */
export interface LensSelectorProps extends BaseCameraProps {
  /** Currently selected lens */
  selectedLens: string;
  /** Custom lens input value */
  customLens: string;
  /** Fixed lens value if camera has non-interchangeable lens */
  fixedLens: string | null;
  /** Zoom range if camera has built-in zoom */
  zoomRange: ZoomRange | null;
  /** Callback when lens selection changes */
  onLensChange: (lens: string) => void;
  /** Callback when custom lens input changes */
  onCustomLensChange: (value: string) => void;
}

/**
 * Props for the ShotTypeSelector component
 */
export interface ShotTypeSelectorProps extends BaseCameraProps {
  /** Currently selected shot type */
  selectedShot: string;
  /** Custom shot input value */
  customShot: string;
  /** Callback when shot selection changes */
  onShotChange: (shot: string) => void;
  /** Callback when custom shot input changes */
  onCustomShotChange: (value: string) => void;
}

/**
 * Props for the AspectRatioSelector component
 */
export interface AspectRatioSelectorProps extends BaseCameraProps {
  /** Currently selected aspect ratio */
  aspectRatio: string;
  /** Currently selected camera (for display in restricted message) */
  selectedCamera: string;
  /** Allowed aspect ratios (null = all allowed) */
  allowedAspectRatios: string[] | null;
  /** Callback when aspect ratio changes */
  onAspectRatioChange: (ratio: string) => void;
}

/**
 * Main CameraSettings component props
 */
export interface CameraSettingsProps {
  /** Currently selected camera */
  selectedCamera: string;
  /** Custom camera input value */
  customCamera: string;
  /** Currently selected lens */
  selectedLens: string;
  /** Custom lens input value */
  customLens: string;
  /** Currently selected shot type */
  selectedShot: string;
  /** Custom shot input value */
  customShot: string;
  /** Selected aspect ratio */
  aspectRatio: string;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Whether the section is locked */
  isLocked: boolean;
  /** Conflict detection results */
  conflicts: ConflictResult;
  /** Theme color configuration */
  themeColors: ThemeColors;
  /** Callback to toggle section lock */
  onToggleLock: () => void;
  /** Callback when camera changes */
  onCameraChange: (camera: string) => void;
  /** Callback when custom camera changes */
  onCustomCameraChange: (value: string) => void;
  /** Callback when lens changes */
  onLensChange: (lens: string) => void;
  /** Callback when custom lens changes */
  onCustomLensChange: (value: string) => void;
  /** Callback when shot type changes */
  onShotChange: (shot: string) => void;
  /** Callback when custom shot changes */
  onCustomShotChange: (value: string) => void;
  /** Callback when aspect ratio changes */
  onAspectRatioChange: (ratio: string) => void;
  /** Callback to toggle section expansion */
  onToggleSection: (key: string) => void;
}
