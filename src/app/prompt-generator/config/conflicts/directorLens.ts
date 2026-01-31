/**
 * Director-Lens Conflict Detection
 *
 * Prevents lens logic contradictions where director keywords
 * imply specific lens types that conflict with selected lens.
 *
 * Example: Kurosawa's "telephoto lens compression" conflicts with Fisheye
 * Example: Kubrick's "wide angle distortion" conflicts with telephoto lenses
 *
 * @module conflicts/directorLens
 */

import type { LensCategory } from '../cameraOptions';

/**
 * Maps director names to lens categories they work well with (implied by their style keywords).
 * These are the lens types the director's aesthetic is built around.
 */
export const directorPreferredLens: Record<string, LensCategory[]> = {
  // Kubrick: "wide angle distortion" - uses wide lenses for one-point perspective
  'Stanley Kubrick': ['ultra-wide', 'wide'],

  // Kurosawa: "telephoto lens compression" - famous for telephoto shots
  'Akira Kurosawa': ['telephoto', 'super-telephoto', 'portrait'],

  // Villeneuve: vast landscapes need wide lenses
  'Denis Villeneuve': ['ultra-wide', 'wide', 'standard'],

  // Nolan: IMAX scale uses wide to standard
  'Christopher Nolan': ['ultra-wide', 'wide', 'standard'],

  // Wong Kar-wai: uses a variety but often close/intimate shots
  'Wong Kar-wai': ['standard', 'portrait', 'wide'],

  // Malick: natural/ethereal often uses standard to wide
  'Terrence Malick': ['wide', 'standard', 'portrait'],

  // Fincher: precise framing, often standard focal lengths
  'David Fincher': ['standard', 'portrait', 'wide'],
};

/**
 * Maps director names to lens categories that contradict their style.
 * These lens types actively conflict with the director's keywords.
 */
export const directorBlockedLens: Record<string, LensCategory[]> = {
  // Kubrick uses wide angle - telephoto contradicts "wide angle distortion"
  'Stanley Kubrick': ['telephoto', 'super-telephoto'],

  // Kurosawa uses telephoto - wide/fisheye contradicts "telephoto compression"
  'Akira Kurosawa': ['ultra-wide', 'special'], // special includes Fisheye

  // Villeneuve: vast landscapes don't work with super-telephoto compression
  'Denis Villeneuve': ['super-telephoto'],
};

/**
 * Check if a lens category is blocked by a director's style.
 *
 * @param director - The director name
 * @param lensCategory - The lens category to check
 * @returns true if the lens category conflicts with the director's style
 */
export function isLensBlockedByDirector(director: string, lensCategory: LensCategory): boolean {
  const blockedCategories = directorBlockedLens[director];
  return blockedCategories ? blockedCategories.includes(lensCategory) : false;
}

/**
 * Get lens categories that are compatible with a director's style.
 *
 * @param director - The director name
 * @returns Array of compatible lens categories, or null if no restrictions
 */
export function getDirectorCompatibleLenses(director: string): LensCategory[] | null {
  return directorPreferredLens[director] || null;
}

/**
 * Get lens categories blocked by a director's style.
 *
 * @param director - The director name
 * @returns Array of blocked lens categories, or empty array if no restrictions
 */
export function getDirectorBlockedLenses(director: string): LensCategory[] {
  return directorBlockedLens[director] || [];
}
