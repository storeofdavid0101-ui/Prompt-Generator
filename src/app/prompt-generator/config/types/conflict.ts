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

  /** Keywords injected into the prompt (includes director name) */
  readonly keywords: string;

  /** Keywords without director name for models with content restrictions (e.g., ChatGPT) */
  readonly anonymousKeywords: string;

  /**
   * Safe keywords for models with strict content policies (ChatGPT, DALL-E).
   * Avoids fingerprinted phrase combinations and potentially flagged terms.
   * Falls back to anonymousKeywords if not provided.
   */
  readonly safeKeywords?: string;

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
 * Block reason explaining why an option is blocked.
 * Used for tooltip display on blocked options.
 */
export interface BlockReason {
  /** The source that caused the block (e.g., "Wes Anderson", "Cyberpunk atmosphere") */
  readonly source: string;
  /** Human-readable reason for the block */
  readonly reason: string;
}

/**
 * Map of blocked option keys to their block reasons.
 * Used to display tooltips explaining why options are blocked.
 */
export type BlockReasonMap = Map<string, BlockReason>;

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

  /** Set of shots blocked by current selections */
  readonly blockedShots: Set<string>;

  /** Set of lens categories blocked by current selections */
  readonly blockedLensCategories: Set<string>;

  /** Set of lighting options blocked by current selections */
  readonly blockedLighting: Set<string>;

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

  /** Map of blocked atmosphere keys to their block reasons */
  readonly atmosphereBlockReasons: BlockReasonMap;

  /** Map of blocked preset keys to their block reasons */
  readonly presetBlockReasons: BlockReasonMap;

  /** Map of blocked camera keys to their block reasons */
  readonly cameraBlockReasons: BlockReasonMap;

  /** Map of blocked DOF keys to their block reasons */
  readonly dofBlockReasons: BlockReasonMap;

  /** Map of blocked shot keys to their block reasons */
  readonly shotBlockReasons: BlockReasonMap;

  /** Map of blocked lens category keys to their block reasons */
  readonly lensBlockReasons: BlockReasonMap;

  /** Map of blocked lighting keys to their block reasons */
  readonly lightingBlockReasons: BlockReasonMap;

  /** Style stacking warning if too many style assertions */
  readonly styleStackingWarning: string | null;
}
