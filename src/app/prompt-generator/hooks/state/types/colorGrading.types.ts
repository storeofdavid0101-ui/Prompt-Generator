/**
 * Color Grading State Types
 *
 * Type definitions for the color grading state hook return values.
 *
 * @module hooks/state/types/colorGrading
 */

import type {
  ColorGradingState,
  ColorWheelsState,
  ColorWheelState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
  TonalRange,
  ColorWheelPosition,
} from '../../../config/types/colorGrading';
import type { Setter, ResetAction } from './common.types';

/**
 * Color grading state hook return type.
 */
export interface ColorGradingStateReturn extends ColorGradingState {
  // Enable/disable
  readonly setEnabled: Setter<boolean>;

  // Preset selection
  readonly setSelectedPreset: (key: string | null) => void;
  readonly applyPreset: (key: string) => void;

  // Color wheels
  readonly setColorWheelPosition: (range: TonalRange, position: ColorWheelPosition) => void;
  readonly setColorWheelLuminance: (range: TonalRange, luminance: number) => void;
  readonly resetColorWheel: (range: TonalRange) => void;
  readonly resetAllColorWheels: ResetAction;

  // Temperature/Tint
  readonly setTemperature: Setter<number>;
  readonly setTint: Setter<number>;
  readonly resetTemperatureTint: ResetAction;

  // Split Toning
  readonly setShadowHue: Setter<number>;
  readonly setShadowSaturation: Setter<number>;
  readonly setHighlightHue: Setter<number>;
  readonly setHighlightSaturation: Setter<number>;
  readonly setSplitToningBalance: Setter<number>;
  readonly resetSplitToning: ResetAction;

  // Global Adjustments
  readonly setContrast: Setter<number>;
  readonly setSaturation: Setter<number>;
  readonly setVibrance: Setter<number>;
  readonly resetGlobalAdjustments: ResetAction;

  // Full reset
  readonly reset: ResetAction;
}

// Re-export types from config for convenience
export type {
  ColorGradingState,
  ColorWheelsState,
  ColorWheelState,
  TemperatureTintState,
  SplitToningState,
  GlobalAdjustmentsState,
  TonalRange,
  ColorWheelPosition,
};
