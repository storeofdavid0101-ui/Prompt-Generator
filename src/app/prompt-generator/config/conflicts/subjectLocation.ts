/**
 * Subject-Location Compatibility Rules
 *
 * Prevents physics-defying combinations where subjects can't realistically
 * exist in certain locations.
 *
 * Example: "Formula 1 car at racing speed" can't be in "Crystal Cave interior"
 * Example: "Cliff diver" needs water/nature, not office interior
 *
 * @module conflicts/subjectLocation
 */

import type { SubjectTheme } from '../magicSubjects';

/** Location categories from locationPresets.ts */
export type LocationCategory = 'urban' | 'nature' | 'interior' | 'fantasy' | 'industrial';

/**
 * Keywords in subject text that indicate specific space requirements.
 * Maps keywords to location categories they are incompatible with.
 */
export const subjectKeywordBlockedLocations: Record<string, LocationCategory[]> = {
  // High-speed vehicles need open spaces - block interiors and enclosed areas
  'formula 1': ['interior', 'fantasy'],
  'f1 car': ['interior', 'fantasy'],
  'racing speed': ['interior', 'fantasy'],
  '200mph': ['interior', 'fantasy'],
  'motorcycle racer': ['interior', 'fantasy'],
  'racing': ['interior'],

  // Underwater subjects need water environments
  'underwater': ['urban', 'industrial'],
  'coral reef': ['urban', 'industrial', 'interior'],

  // Aviation subjects need open sky
  'drone footage': ['interior'],
  'aerial': ['interior'],
  'flying': ['interior'],

  // Cliff/mountain/water activities need nature with open sky/water
  'cliff diver': ['interior', 'industrial', 'fantasy'], // needs open water, not caves
  'cliff dive': ['interior', 'industrial', 'fantasy'],
  'turquoise waters': ['interior', 'industrial', 'fantasy'], // open water scene
  'mountain climber': ['interior', 'urban'],
  'snowboarder': ['interior', 'urban'],
  'surfer': ['interior', 'industrial', 'fantasy'],
  'ocean waves': ['interior', 'industrial'],

  // Certain subjects imply specific settings
  'space station': ['nature', 'urban'],
  'spacecraft': ['nature', 'urban'],
};

/**
 * Theme-based location compatibility rules.
 * Maps subject themes to their preferred and blocked location categories.
 */
export const themeLocationPreferences: Record<SubjectTheme, {
  preferred: LocationCategory[];
  blocked: LocationCategory[];
}> = {
  scifi: { preferred: ['industrial', 'interior', 'fantasy'], blocked: [] },
  fantasy: { preferred: ['fantasy', 'nature'], blocked: [] },
  western: { preferred: ['nature'], blocked: ['industrial'] },
  asian: { preferred: ['urban', 'nature', 'interior'], blocked: [] },
  cyberpunk: { preferred: ['urban', 'industrial'], blocked: ['nature'] },
  historical: { preferred: ['interior', 'nature'], blocked: ['industrial'] },
  modern: { preferred: ['urban', 'interior', 'industrial'], blocked: [] },
  nature: { preferred: ['nature'], blocked: ['industrial'] },
  urban: { preferred: ['urban', 'industrial'], blocked: [] },
  military: { preferred: ['nature', 'industrial', 'urban'], blocked: [] },
  gothic: { preferred: ['interior', 'fantasy'], blocked: [] },
  steampunk: { preferred: ['industrial', 'interior'], blocked: [] },
  noir: { preferred: ['urban', 'interior'], blocked: ['nature', 'fantasy'] },
  vintage: { preferred: ['urban', 'interior', 'nature'], blocked: ['industrial'] },
  action: { preferred: ['urban', 'nature', 'industrial'], blocked: [] },
  elegant: { preferred: ['interior', 'urban'], blocked: ['industrial'] },
};

/**
 * Location labels that represent enclosed/constrained spaces.
 * High-speed action subjects should avoid these.
 */
export const enclosedLocations = new Set([
  'Crystal Cave',
  'Old Library',
  'Cathedral',
  'Neon Bar',
  'Office',
  'Luxury Penthouse',
  'Abandoned Warehouse',
  'Underground Bunker',
  'Space Station', // interior of space station
]);

/**
 * Location labels that represent open/expansive spaces.
 * Preferred for action subjects requiring movement.
 */
export const openLocations = new Set([
  'City Street',
  'Rooftop',
  'Parking Lot',
  'Desert',
  'Beach',
  'Mountain Peak',
  'Cornfield',
  'Forest',
  'Snowy Tundra',
  'Cyberpunk City',
]);

/**
 * Check if a location is compatible with a subject based on text analysis.
 *
 * @param subjectText - The subject description text
 * @param locationLabel - The location label to check
 * @param locationCategory - The location's category
 * @returns true if compatible, false if there's a physics conflict
 */
export function isLocationCompatibleWithSubject(
  subjectText: string,
  locationLabel: string,
  locationCategory: LocationCategory
): boolean {
  const lowerSubject = subjectText.toLowerCase();

  // Check each blocking keyword
  for (const [keyword, blockedCategories] of Object.entries(subjectKeywordBlockedLocations)) {
    if (lowerSubject.includes(keyword)) {
      if (blockedCategories.includes(locationCategory)) {
        return false;
      }
    }
  }

  // Additional check for high-speed action in enclosed spaces
  const isHighSpeedAction =
    lowerSubject.includes('speed') ||
    lowerSubject.includes('racing') ||
    lowerSubject.includes('mph') ||
    lowerSubject.includes('exploding through');

  if (isHighSpeedAction && enclosedLocations.has(locationLabel)) {
    return false;
  }

  return true;
}

/**
 * Get location categories that are blocked for a subject.
 *
 * @param subjectText - The subject description text
 * @returns Set of blocked location categories
 */
export function getBlockedLocationCategories(subjectText: string): Set<LocationCategory> {
  const blocked = new Set<LocationCategory>();
  const lowerSubject = subjectText.toLowerCase();

  for (const [keyword, blockedCategories] of Object.entries(subjectKeywordBlockedLocations)) {
    if (lowerSubject.includes(keyword)) {
      blockedCategories.forEach((cat) => blocked.add(cat));
    }
  }

  return blocked;
}

/**
 * Get preferred location categories based on subject themes.
 *
 * @param themes - Array of subject themes
 * @returns Array of preferred location categories (intersection of all theme preferences)
 */
export function getPreferredLocationCategories(themes: SubjectTheme[]): LocationCategory[] {
  if (themes.length === 0) {
    return ['urban', 'nature', 'interior', 'fantasy', 'industrial'];
  }

  // Start with all categories
  let preferred = new Set<LocationCategory>(['urban', 'nature', 'interior', 'fantasy', 'industrial']);

  // Find categories that work with at least one theme
  const allPreferred = new Set<LocationCategory>();
  for (const theme of themes) {
    const prefs = themeLocationPreferences[theme];
    if (prefs) {
      prefs.preferred.forEach((cat) => allPreferred.add(cat));
    }
  }

  // If we have preferred categories from themes, use those
  if (allPreferred.size > 0) {
    preferred = allPreferred;
  }

  // Remove blocked categories from any theme
  for (const theme of themes) {
    const prefs = themeLocationPreferences[theme];
    if (prefs) {
      prefs.blocked.forEach((cat) => preferred.delete(cat));
    }
  }

  return Array.from(preferred);
}

/**
 * Filter locations to only those compatible with a subject.
 *
 * @param locations - Array of location objects with label and category
 * @param subjectText - The subject description text
 * @param subjectThemes - Optional array of subject themes
 * @returns Filtered array of compatible locations
 */
export function filterCompatibleLocations<T extends { label: string; category: LocationCategory }>(
  locations: T[],
  subjectText: string,
  subjectThemes?: SubjectTheme[]
): T[] {
  const blockedCategories = getBlockedLocationCategories(subjectText);
  const lowerSubject = subjectText.toLowerCase();

  // Check for high-speed action
  const isHighSpeedAction =
    lowerSubject.includes('speed') ||
    lowerSubject.includes('racing') ||
    lowerSubject.includes('mph') ||
    lowerSubject.includes('exploding through');

  return locations.filter((loc) => {
    // Block by category
    if (blockedCategories.has(loc.category)) {
      return false;
    }

    // Block enclosed locations for high-speed action
    if (isHighSpeedAction && enclosedLocations.has(loc.label)) {
      return false;
    }

    return true;
  });
}
