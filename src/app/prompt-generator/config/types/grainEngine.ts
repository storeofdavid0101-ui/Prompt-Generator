/**
 * Grain Engine Type Definitions
 *
 * Types for film grain and texture emulation.
 *
 * @module config/types/grainEngine
 */

/**
 * Types of grain emulation available.
 */
export type GrainType = 'silver-halide' | 'digital-noise' | 'none';

/**
 * Grain particle size options.
 */
export type GrainSize = 'fine' | 'medium' | 'coarse';

/**
 * Dust and scratches configuration.
 */
export interface DustScratchesConfig {
  readonly enabled: boolean;
  readonly intensity: number; // 0-100
}

/**
 * Complete grain engine state.
 */
export interface GrainEngineState {
  /** Whether grain engine is enabled */
  readonly enabled: boolean;

  /** Type of grain emulation */
  readonly grainType: GrainType;

  /** Grain particle size */
  readonly grainSize: GrainSize;

  /** Grain intensity (0-100) */
  readonly intensity: number;

  /** Dust and scratches settings */
  readonly dustScratches: DustScratchesConfig;

  /** Film gate weave simulation */
  readonly gateWeave: boolean;
}

/**
 * Grain type preset configuration.
 */
export interface GrainTypePreset {
  readonly id: GrainType;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
  readonly safeKeywords?: string;
}

/**
 * Grain size preset configuration.
 */
export interface GrainSizePreset {
  readonly id: GrainSize;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}
