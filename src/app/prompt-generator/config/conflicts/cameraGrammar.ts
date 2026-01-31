/**
 * Camera Grammar Conflict Configuration
 *
 * Prevents incompatible camera grammar combinations:
 * - Shot type + lens focal length mismatches
 * - Shot type + DOF incompatibilities
 * - Lens category + shot type logic
 *
 * Based on real cinematography principles:
 * - OTS (over-the-shoulder) shots need portrait/standard lenses (50-135mm)
 * - Tilt-shift is architectural/miniature grammar, not portrait grammar
 * - Extreme wide shots need wide lenses
 * - Close-ups typically use portrait lenses
 *
 * @module conflicts/cameraGrammar
 */

import type { DOFValue } from '../types';
import type { LensCategory, ShotCategory } from '../cameraOptions';

/**
 * Shot types by their cinematographic grammar category.
 */
export type ShotGrammar = 'narrative' | 'portrait' | 'establishing' | 'detail' | 'cinematic';

/**
 * Map shots to their grammar type for conflict detection.
 */
export const shotGrammar: Record<string, ShotGrammar> = {
  // Establishing shots - need context
  'Extreme Wide Shot (XWS)': 'establishing',
  'Wide Shot (WS)': 'establishing',

  // Narrative shots - character in environment
  'Full Shot': 'narrative',
  'Medium Wide Shot': 'narrative',
  'Medium Shot (MS)': 'narrative',
  'Over the Shoulder (OTS)': 'narrative',

  // Portrait shots - face/emotion focus
  'Medium Close-Up (MCU)': 'portrait',
  'Close-Up (CU)': 'portrait',

  // Detail shots - specific focus
  'Extreme Close-Up (ECU)': 'detail',
  'POV': 'detail',

  // Cinematic angles
  'Low Angle': 'cinematic',
  'High Angle': 'cinematic',
  'Dutch Angle': 'cinematic',
  "Bird's Eye View": 'establishing',
};

/**
 * Shot type + Lens category conflicts.
 * Prevents physically/aesthetically incompatible combinations.
 *
 * Key principles:
 * - OTS shots need moderate focal lengths (50-135mm) for proper framing
 * - Extreme wide shots need wide/ultra-wide lenses
 * - Close-ups work best with portrait lenses
 * - Fisheye creates distortion inappropriate for most portraits
 */
export const shotLensConflicts: Record<string, LensCategory[]> = {
  // OTS needs specific focal lengths for proper framing
  'Over the Shoulder (OTS)': ['ultra-wide', 'super-telephoto', 'special'],

  // Extreme wide shot needs wide lenses
  'Extreme Wide Shot (XWS)': ['telephoto', 'super-telephoto', 'portrait'],

  // Wide shot needs wide-ish lenses
  'Wide Shot (WS)': ['super-telephoto'],

  // Close-ups don't work well with ultra-wide (distortion)
  'Close-Up (CU)': ['ultra-wide'],
  'Extreme Close-Up (ECU)': ['ultra-wide', 'super-telephoto'],

  // Portrait shots shouldn't use fisheye
  'Medium Close-Up (MCU)': [],
};

/**
 * Shot type + DOF conflicts.
 * Prevents effect stacking and grammar mismatches.
 *
 * Key principles:
 * - Tilt-shift is miniature/architectural grammar, conflicts with narrative/portrait
 * - Extreme close-ups often have inherently shallow DOF
 * - Establishing shots typically need everything in focus
 */
export const shotDOFConflicts: Record<string, DOFValue[]> = {
  // Tilt-shift conflicts with narrative/portrait grammar
  'Over the Shoulder (OTS)': ['tilt-shift'],
  'Medium Close-Up (MCU)': ['tilt-shift'],
  'Close-Up (CU)': ['tilt-shift'],
  'Extreme Close-Up (ECU)': ['tilt-shift'],

  // Establishing shots typically benefit from deep focus
  'Extreme Wide Shot (XWS)': [],
  'Wide Shot (WS)': [],
};

/**
 * Lens category + DOF conflicts.
 * Based on physical optics and typical use.
 *
 * Key principles:
 * - Macro lenses typically have very shallow DOF inherently
 * - Fisheye has deep DOF due to wide angle
 * - Tilt-shift is a special effect that conflicts with certain lens behaviors
 */
export const lensDOFConflicts: Record<LensCategory, DOFValue[]> = {
  'ultra-wide': [], // Ultra-wide naturally has more DOF
  'wide': [],
  'standard': [],
  'portrait': [], // Portrait lenses are often used for shallow DOF
  'telephoto': [],
  'super-telephoto': ['tilt-shift'], // Super-tele + tilt-shift is impractical
  'special': ['tilt-shift'], // Fisheye/Macro + tilt-shift is unusual
};

/**
 * Lens category + Shot type recommendations.
 * Soft guidance for optimal combinations.
 */
export const lensRecommendedShots: Record<LensCategory, string[]> = {
  'ultra-wide': ['Extreme Wide Shot (XWS)', 'Wide Shot (WS)', "Bird's Eye View"],
  'wide': ['Wide Shot (WS)', 'Full Shot', 'Medium Wide Shot'],
  'standard': ['Medium Shot (MS)', 'Full Shot', 'Over the Shoulder (OTS)'],
  'portrait': ['Medium Close-Up (MCU)', 'Close-Up (CU)', 'Over the Shoulder (OTS)'],
  'telephoto': ['Close-Up (CU)', 'Medium Close-Up (MCU)'],
  'super-telephoto': ['Extreme Close-Up (ECU)'],
  'special': ['Extreme Close-Up (ECU)', 'POV'],
};

/**
 * Check if a lens category conflicts with a shot type.
 */
export function isLensBlockedByShot(
  lensCategory: LensCategory,
  shotLabel: string
): boolean {
  const blockedCategories = shotLensConflicts[shotLabel] || [];
  return blockedCategories.includes(lensCategory);
}

/**
 * Check if a DOF setting conflicts with a shot type.
 */
export function isDOFBlockedByShot(
  dof: DOFValue,
  shotLabel: string
): boolean {
  const blockedDOF = shotDOFConflicts[shotLabel] || [];
  return blockedDOF.includes(dof);
}

/**
 * Check if a DOF setting conflicts with a lens category.
 */
export function isDOFBlockedByLens(
  dof: DOFValue,
  lensCategory: LensCategory
): boolean {
  const blockedDOF = lensDOFConflicts[lensCategory] || [];
  return blockedDOF.includes(dof);
}

/**
 * Get recommended shots for a lens category.
 */
export function getRecommendedShots(lensCategory: LensCategory): string[] {
  return lensRecommendedShots[lensCategory] || [];
}

/**
 * Get all blocked lenses for a given shot.
 * Returns lens labels, not categories.
 */
export function getBlockedLensesForShot(shotLabel: string): LensCategory[] {
  return shotLensConflicts[shotLabel] || [];
}
