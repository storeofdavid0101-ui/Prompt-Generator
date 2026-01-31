/**
 * Grain Engine State Types
 *
 * Type definitions for the grain engine state hook.
 *
 * @module hooks/state/types/grainEngine
 */

import type { GrainType, GrainSize, DustScratchesConfig } from '../../../config/types/grainEngine';

/**
 * Return type for useGrainEngineState hook.
 */
export interface GrainEngineStateReturn {
  /** Whether grain engine is enabled */
  readonly enabled: boolean;

  /** Set enabled state */
  readonly setEnabled: (enabled: boolean) => void;

  /** Current grain type */
  readonly grainType: GrainType;

  /** Set grain type */
  readonly setGrainType: (type: GrainType) => void;

  /** Current grain size */
  readonly grainSize: GrainSize;

  /** Set grain size */
  readonly setGrainSize: (size: GrainSize) => void;

  /** Grain intensity (0-100) */
  readonly intensity: number;

  /** Set grain intensity */
  readonly setIntensity: (intensity: number) => void;

  /** Dust and scratches configuration */
  readonly dustScratches: DustScratchesConfig;

  /** Set dust and scratches enabled */
  readonly setDustScratchesEnabled: (enabled: boolean) => void;

  /** Set dust and scratches intensity */
  readonly setDustScratchesIntensity: (intensity: number) => void;

  /** Gate weave enabled */
  readonly gateWeave: boolean;

  /** Set gate weave enabled */
  readonly setGateWeave: (enabled: boolean) => void;

  /** Reset to defaults */
  readonly reset: () => void;
}
