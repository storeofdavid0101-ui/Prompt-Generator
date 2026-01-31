/**
 * Lens Physics State Hook
 *
 * Manages state for advanced lens control and optical effects.
 *
 * @module hooks/state/useLensPhysicsState
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Aperture, DistortionType, DOFControl, BokehShape } from '../../config/types/lensPhysics';
import type { LensPhysicsStateReturn } from './types/lensPhysics.types';
import { DEFAULT_LENS_PHYSICS_STATE } from '../../config/lensPhysics';

/**
 * Hook for managing lens physics state.
 *
 * @returns Lens physics state and handlers
 */
export function useLensPhysicsState(): LensPhysicsStateReturn {
  const [enabled, setEnabled] = useState(DEFAULT_LENS_PHYSICS_STATE.enabled);
  const [focalLength, setFocalLength] = useState(DEFAULT_LENS_PHYSICS_STATE.focalLength);
  const [aperture, setAperture] = useState<Aperture>(DEFAULT_LENS_PHYSICS_STATE.aperture);
  const [distortion, setDistortion] = useState<DistortionType>(DEFAULT_LENS_PHYSICS_STATE.distortion);
  const [dofControl, setDOFControl] = useState<DOFControl>(DEFAULT_LENS_PHYSICS_STATE.dofControl);
  const [bokehShape, setBokehShape] = useState<BokehShape>(DEFAULT_LENS_PHYSICS_STATE.bokehShape);

  const reset = useCallback(() => {
    setEnabled(DEFAULT_LENS_PHYSICS_STATE.enabled);
    setFocalLength(DEFAULT_LENS_PHYSICS_STATE.focalLength);
    setAperture(DEFAULT_LENS_PHYSICS_STATE.aperture);
    setDistortion(DEFAULT_LENS_PHYSICS_STATE.distortion);
    setDOFControl(DEFAULT_LENS_PHYSICS_STATE.dofControl);
    setBokehShape(DEFAULT_LENS_PHYSICS_STATE.bokehShape);
  }, []);

  return useMemo(
    () => ({
      enabled,
      setEnabled,
      focalLength,
      setFocalLength,
      aperture,
      setAperture,
      distortion,
      setDistortion,
      dofControl,
      setDOFControl,
      bokehShape,
      setBokehShape,
      reset,
    }),
    [
      enabled,
      focalLength,
      aperture,
      distortion,
      dofControl,
      bokehShape,
      reset,
    ]
  );
}
