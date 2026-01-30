/**
 * Conflict Detection Type Definitions
 *
 * Type definitions for the conflict detection system that ensures
 * visual coherence and prevents incompatible option combinations.
 *
 * @module config/types/conflict
 * @version 1.0.0
 */

import type { Atmosphere } from './visual';
import type { ZoomRange } from './camera';

/**
 * Conflict rules for camera categories.
 *
 * Defines what options are incompatible with a given camera type.
 * Used to enforce realistic camera behavior (e.g., vintage cameras
 * cannot have modern depth of field control).
 *
 * @remarks
 * Uses string types for presets and DOF to support runtime comparison
 * with state values that may include custom entries.
 */
export interface ConflictRules {
  /** Atmospheres that conflict with this camera type */
  readonly blockedAtmospheres: readonly Atmosphere[];

  /** Visual presets that conflict with this camera type */
  readonly blockedPresets: readonly string[];

  /** DOF values that conflict with this camera type */
  readonly blockedDOF: readonly string[];

  /** If set, camera uses this fixed lens (no lens selection) */
  readonly fixedLens?: string;

  /** Optional warning message to display to user */
  readonly warningMessage?: string;
}

/**
 * Director style configuration with conflict rules.
 *
 * Each director style applies a unique visual signature and may
 * restrict certain options that conflict with their aesthetic.
 */
export interface DirectorStyle {
  /** Director name for display */
  readonly name: string;

  /** Brief description of the visual style */
  readonly description: string;

  /** Keywords injected into the prompt */
  readonly keywords: string;

  /** Atmospheres that conflict with this style */
  readonly blockedAtmospheres: readonly Atmosphere[];

  /** Visual presets that conflict with this style */
  readonly blockedPresets: readonly string[];

  /** Cameras that conflict with this style */
  readonly blockedCameras: readonly string[];
}

/**
 * Effect category for stacking warnings.
 *
 * Identifies the type of effect being stacked:
 * - `blur`: Multiple blur/bokeh effects
 * - `mood`: Multiple mood/atmosphere effects
 * - `quality`: Multiple quality enhancement terms
 */
export type EffectCategory = 'blur' | 'mood' | 'quality';

/**
 * Effect stacking warning result.
 *
 * Alerts users when multiple similar effects are applied,
 * which can cause over-processing in AI models.
 */
export interface EffectStackingWarning {
  /** Category of stacked effects */
  readonly category: EffectCategory;

  /** Human-readable warning message */
  readonly message: string;

  /** Terms that triggered the warning */
  readonly includedTerms: readonly string[];
}

/**
 * Complete conflict detection result.
 *
 * Aggregated output from conflict analysis containing all
 * blocked options, active conflicts, and restrictions.
 */
export interface ConflictResult {
  /** Set of atmospheres blocked by current selections */
  readonly blockedAtmospheres: Set<Atmosphere>;

  /** Set of visual presets blocked by current selections */
  readonly blockedPresets: Set<string>;

  /** Set of DOF values blocked by current selections */
  readonly blockedDOF: Set<string>;

  /** Set of cameras blocked by current selections */
  readonly blockedCameras: Set<string>;

  /** Array of human-readable active conflict descriptions */
  readonly activeConflicts: readonly string[];

  /** Array of effect stacking warnings */
  readonly effectStackingWarnings: readonly EffectStackingWarning[];

  /** Optional general warning message */
  readonly warningMessage?: string;

  /** Fixed lens if camera restricts lens selection */
  readonly fixedLens: string | null;

  /** Zoom range if camera has built-in zoom */
  readonly zoomRange: ZoomRange | null;

  /** Restricted aspect ratios if any (mutable for component compatibility) */
  readonly allowedAspectRatios: string[] | null;
}
