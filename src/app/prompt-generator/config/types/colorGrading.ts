/**
 * Color Grading Type Definitions
 *
 * Professional color grading types inspired by DaVinci Resolve and Premiere Pro.
 * Includes color wheels (Lift/Gamma/Gain), split toning, and LUT-style presets.
 *
 * @module config/types/colorGrading
 */

/**
 * Tonal range identifiers for color wheel adjustments.
 * Maps to industry-standard terminology:
 * - Lift: Shadows (blacks)
 * - Gamma: Midtones
 * - Gain: Highlights
 */
export type TonalRange = 'lift' | 'gamma' | 'gain';

/**
 * Color wheel position in 2D space.
 * Values normalized to -1 to 1 range.
 * Center (0,0) = neutral, outer edge = full saturation in that direction.
 */
export interface ColorWheelPosition {
  /** X position (-1 to 1, negative = cyan/blue, positive = red/orange) */
  readonly x: number;
  /** Y position (-1 to 1, negative = magenta, positive = green) */
  readonly y: number;
}

/**
 * Individual color wheel state for a tonal range.
 * Includes position (hue/saturation) and brightness offset.
 */
export interface ColorWheelState {
  /** Position on the color wheel (hue direction and saturation amount) */
  readonly position: ColorWheelPosition;
  /** Brightness/luminance offset for this range (-100 to 100) */
  readonly luminance: number;
}

/**
 * Full color wheels state (Lift/Gamma/Gain).
 * Industry-standard 3-way color correction.
 */
export interface ColorWheelsState {
  /** Lift (shadows) color wheel */
  readonly lift: ColorWheelState;
  /** Gamma (midtones) color wheel */
  readonly gamma: ColorWheelState;
  /** Gain (highlights) color wheel */
  readonly gain: ColorWheelState;
}

/**
 * Temperature and tint adjustment.
 * Standard white balance controls.
 */
export interface TemperatureTintState {
  /** Color temperature (-100 = cool/blue, +100 = warm/orange) */
  readonly temperature: number;
  /** Tint adjustment (-100 = green, +100 = magenta) */
  readonly tint: number;
}

/**
 * Split toning state.
 * Applies different color tints to shadows and highlights.
 */
export interface SplitToningState {
  /** Shadow tint hue (0-360 degrees) */
  readonly shadowHue: number;
  /** Shadow tint saturation (0-100) */
  readonly shadowSaturation: number;
  /** Highlight tint hue (0-360 degrees) */
  readonly highlightHue: number;
  /** Highlight tint saturation (0-100) */
  readonly highlightSaturation: number;
  /** Balance between shadows and highlights (-100 to 100) */
  readonly balance: number;
}

/**
 * Global adjustments state.
 * Affects entire image contrast and saturation.
 */
export interface GlobalAdjustmentsState {
  /** Overall contrast (-100 to 100) */
  readonly contrast: number;
  /** Overall saturation (-100 to 100) */
  readonly saturation: number;
  /** Vibrance - saturation for less saturated colors (-100 to 100) */
  readonly vibrance: number;
}

/**
 * Complete color grading state.
 * Combines all color grading controls.
 */
export interface ColorGradingState {
  /** Whether color grading is enabled */
  readonly enabled: boolean;
  /** Selected preset key (null if custom) */
  readonly selectedPreset: string | null;
  /** Color wheels (Lift/Gamma/Gain) */
  readonly colorWheels: ColorWheelsState;
  /** Temperature and tint */
  readonly temperatureTint: TemperatureTintState;
  /** Split toning */
  readonly splitToning: SplitToningState;
  /** Global adjustments */
  readonly globalAdjustments: GlobalAdjustmentsState;
}

/**
 * Color grading preset configuration.
 * Defines a complete look with all adjustments.
 */
export interface ColorGradingPreset {
  /** Display name */
  readonly name: string;
  /** Category for grouping in UI */
  readonly category: ColorGradingCategory;
  /** Keywords for prompt generation */
  readonly keywords: string;
  /** Optional safe keywords for strict content policy models */
  readonly safeKeywords?: string;
  /** CSS gradient for UI preview */
  readonly gradient: string;
  /** Description of the look */
  readonly description: string;
  /** Preset values (partial - will be merged with defaults) */
  readonly values: Partial<ColorGradingPresetValues>;
}

/**
 * Preset value structure for serialization.
 */
export interface ColorGradingPresetValues {
  readonly colorWheels?: Partial<ColorWheelsState>;
  readonly temperatureTint?: Partial<TemperatureTintState>;
  readonly splitToning?: Partial<SplitToningState>;
  readonly globalAdjustments?: Partial<GlobalAdjustmentsState>;
}

/**
 * Color grading preset categories.
 */
export type ColorGradingCategory =
  | 'film'
  | 'cinematic'
  | 'stylized'
  | 'technical'
  | 'vintage';

/**
 * Category display names.
 */
export const colorGradingCategoryNames: Record<ColorGradingCategory, string> = {
  film: 'Film Emulation',
  cinematic: 'Cinematic Looks',
  stylized: 'Stylized',
  technical: 'Technical',
  vintage: 'Vintage',
};
