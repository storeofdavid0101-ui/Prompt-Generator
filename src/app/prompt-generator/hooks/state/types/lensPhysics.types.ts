/**
 * Lens Physics State Types
 *
 * Type definitions for the lens physics state hook.
 *
 * @module hooks/state/types/lensPhysics
 */

import type { Aperture, DistortionType, DOFControl, BokehShape } from '../../../config/types/lensPhysics';

/**
 * Return type for useLensPhysicsState hook.
 */
export interface LensPhysicsStateReturn {
  /** Whether lens physics is enabled */
  readonly enabled: boolean;

  /** Set enabled state */
  readonly setEnabled: (enabled: boolean) => void;

  /** Current focal length in mm */
  readonly focalLength: number;

  /** Set focal length */
  readonly setFocalLength: (length: number) => void;

  /** Current aperture */
  readonly aperture: Aperture;

  /** Set aperture */
  readonly setAperture: (aperture: Aperture) => void;

  /** Current distortion type */
  readonly distortion: DistortionType;

  /** Set distortion type */
  readonly setDistortion: (distortion: DistortionType) => void;

  /** Current DOF control */
  readonly dofControl: DOFControl;

  /** Set DOF control */
  readonly setDOFControl: (dof: DOFControl) => void;

  /** Current bokeh shape */
  readonly bokehShape: BokehShape;

  /** Set bokeh shape */
  readonly setBokehShape: (shape: BokehShape) => void;

  /** Reset to defaults */
  readonly reset: () => void;
}
