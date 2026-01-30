/**
 * Visual State Type Definitions
 *
 * Types for visual styling: atmosphere, presets, lighting, colors.
 *
 * @module hooks/state/types/visual
 */

import type { Atmosphere } from '../../../config/types';
import type { Setter, ResetAction } from './common.types';

/**
 * Visual state interface
 *
 * Manages all visual styling options including atmosphere,
 * visual presets, lighting, and color palettes.
 */
export interface VisualState {
  /** Selected atmosphere preset (null = none) */
  readonly selectedAtmosphere: Atmosphere | null;

  /** Selected visual style preset name (null = none) */
  readonly selectedVisualPreset: string | null;

  /** Selected lighting option (null = none) */
  readonly selectedLighting: string | null;

  /** Selected color palette name (null = none) */
  readonly selectedColorPalette: string | null;

  /** Custom color hex values (6 slots) */
  readonly customColors: string[];

  /** Update atmosphere selection */
  readonly setSelectedAtmosphere: Setter<Atmosphere | null>;

  /** Update visual preset selection */
  readonly setSelectedVisualPreset: Setter<string | null>;

  /** Update lighting selection */
  readonly setSelectedLighting: Setter<string | null>;

  /** Update color palette selection */
  readonly setSelectedColorPalette: Setter<string | null>;

  /** Update custom colors array */
  readonly setCustomColors: Setter<string[]>;

  /** Reset only atmosphere to default */
  readonly resetAtmosphere: ResetAction;

  /** Reset only visual preset to default */
  readonly resetVisualPreset: ResetAction;

  /** Reset only lighting to default */
  readonly resetLighting: ResetAction;

  /** Reset only colors to default */
  readonly resetColors: ResetAction;
}
