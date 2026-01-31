/**
 * Lens Physics Prompt Builder
 *
 * Converts lens physics state into prompt keywords.
 *
 * @module utils/promptBuilder/lensPhysicsBuilder
 */

import type { LensPhysicsState } from '../../config/types/lensPhysics';
import {
  aperturePresets,
  distortionPresets,
  dofControlPresets,
  bokehShapePresets,
  getFocalLengthKeywords,
} from '../../config/lensPhysics';

/**
 * Resolves lens physics state into prompt keywords.
 *
 * @param state - Lens physics state
 * @param _useSafeMode - Whether to use safe keywords (not used here but kept for consistency)
 * @returns Prompt keywords or null if disabled
 */
export function resolveLensPhysics(
  state: LensPhysicsState,
  _useSafeMode: boolean = false
): string | null {
  if (!state.enabled) {
    return null;
  }

  const parts: string[] = [];

  // Focal length
  parts.push(getFocalLengthKeywords(state.focalLength));

  // Aperture
  const aperturePreset = aperturePresets.find(p => p.value === state.aperture);
  if (aperturePreset) {
    parts.push(aperturePreset.keywords);
  }

  // Distortion (only if not none)
  if (state.distortion !== 'none') {
    const distortionPreset = distortionPresets[state.distortion];
    if (distortionPreset && distortionPreset.keywords) {
      parts.push(distortionPreset.keywords);
    }
  }

  // DOF control
  const dofPreset = dofControlPresets[state.dofControl];
  if (dofPreset) {
    parts.push(dofPreset.keywords);
  }

  // Bokeh shape
  const bokehPreset = bokehShapePresets[state.bokehShape];
  if (bokehPreset) {
    parts.push(bokehPreset.keywords);
  }

  return parts.length > 0 ? parts.join(', ') : null;
}

/**
 * Builds machine-readable lens physics output.
 *
 * @param state - Lens physics state
 * @returns Machine format string or null if disabled
 */
export function buildLensPhysicsMachineOutput(state: LensPhysicsState): string | null {
  if (!state.enabled) {
    return null;
  }

  const parts: string[] = [
    `focal: ${state.focalLength}mm`,
    `aperture: ${state.aperture}`,
    `dof: ${state.dofControl}`,
    `bokeh: ${state.bokehShape}`,
  ];

  if (state.distortion !== 'none') {
    parts.push(`distortion: ${state.distortion}`);
  }

  return `[LENS] ${parts.join('; ')}`;
}
