/**
 * Lens Physics Type Definitions
 *
 * Types for advanced lens control and optical effects.
 *
 * @module config/types/lensPhysics
 */

/**
 * Lens distortion types.
 */
export type DistortionType = 'none' | 'barrel' | 'pincushion';

/**
 * Depth of field control options.
 */
export type DOFControl = 'shallow' | 'moderate' | 'deep' | 'infinite';

/**
 * Bokeh shape options.
 */
export type BokehShape = 'circular' | 'hexagonal' | 'anamorphic-oval';

/**
 * Aperture value type (f-stop string).
 */
export type Aperture =
  | 'f/1.4' | 'f/1.8' | 'f/2' | 'f/2.8'
  | 'f/4' | 'f/5.6' | 'f/8'
  | 'f/11' | 'f/16' | 'f/22';

/**
 * Lens physics state interface.
 */
export interface LensPhysicsState {
  /** Whether lens physics controls are enabled */
  readonly enabled: boolean;

  /** Focal length in mm (14-200) */
  readonly focalLength: number;

  /** Aperture f-stop value */
  readonly aperture: Aperture;

  /** Lens distortion type */
  readonly distortion: DistortionType;

  /** Depth of field control setting */
  readonly dofControl: DOFControl;

  /** Bokeh shape */
  readonly bokehShape: BokehShape;
}

/**
 * Aperture preset configuration.
 */
export interface AperturePreset {
  readonly value: Aperture;
  readonly label: string;
  readonly description: string;
  readonly keywords: string;
}

/**
 * Focal length preset configuration.
 */
export interface FocalLengthPreset {
  readonly value: number;
  readonly label: string;
  readonly type: 'ultra-wide' | 'wide' | 'standard' | 'portrait' | 'telephoto';
  readonly keywords: string;
}

/**
 * Distortion preset configuration.
 */
export interface DistortionPreset {
  readonly id: DistortionType;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}

/**
 * DOF control preset configuration.
 */
export interface DOFControlPreset {
  readonly id: DOFControl;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}

/**
 * Bokeh shape preset configuration.
 */
export interface BokehShapePreset {
  readonly id: BokehShape;
  readonly name: string;
  readonly description: string;
  readonly keywords: string;
}
