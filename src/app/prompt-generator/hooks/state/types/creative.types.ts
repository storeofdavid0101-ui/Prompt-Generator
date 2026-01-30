/**
 * Creative Controls State Type Definitions
 *
 * Types for creative control sliders (creativity, variation, uniqueness).
 *
 * @module hooks/state/types/creative
 */

import type { SliderValue, Setter, ResetAction } from './common.types';

/**
 * Creative controls state interface
 *
 * Manages slider values that influence prompt generation style.
 * All values are normalized to 0-100 range.
 */
export interface CreativeControlsState {
  /** Whether creative controls are enabled */
  readonly enabled: boolean;

  /** Creativity level (0-100) - affects prompt style variation */
  readonly creativity: SliderValue;

  /** Variation level (0-100) - affects output diversity */
  readonly variation: SliderValue;

  /** Uniqueness level (0-100) - affects prompt originality */
  readonly uniqueness: SliderValue;

  /** Toggle creative controls on/off */
  readonly setEnabled: Setter<boolean>;

  /** Update creativity slider value */
  readonly setCreativity: Setter<SliderValue>;

  /** Update variation slider value */
  readonly setVariation: Setter<SliderValue>;

  /** Update uniqueness slider value */
  readonly setUniqueness: Setter<SliderValue>;

  /** Reset all creative controls to default values */
  readonly reset: ResetAction;
}
