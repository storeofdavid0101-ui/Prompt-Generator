/**
 * Location Conflict Configuration
 *
 * Prevents incompatible location combinations:
 * - Multiple physical spaces (interior + exterior)
 * - Era mismatches (steampunk + cyberpunk)
 * - Scale conflicts (intimate + vast)
 *
 * @module conflicts/location
 */

import type { Atmosphere, LightingKey } from '../types';

/**
 * Location category type.
 * Matches locationPresets.ts categories.
 */
export type LocationCategory = 'urban' | 'nature' | 'interior' | 'fantasy' | 'industrial';

/**
 * Location meta-categories for conflict detection.
 * Groups locations by physical characteristics.
 */
export type LocationMetaCategory = 'indoor' | 'outdoor' | 'either';

/**
 * Location scale for shot type compatibility.
 */
export type LocationScale = 'intimate' | 'medium' | 'vast';

/**
 * Location era for temporal consistency.
 */
export type LocationEra = 'any' | 'historical' | 'modern' | 'futuristic';

/**
 * Location metadata for conflict detection.
 */
export interface LocationMeta {
  readonly metaCategory: LocationMetaCategory;
  readonly scale: LocationScale;
  readonly era: LocationEra;
  /** Atmospheres that naturally fit this location */
  readonly preferredAtmospheres?: readonly Atmosphere[];
  /** Atmospheres that conflict with this location */
  readonly blockedAtmospheres?: readonly Atmosphere[];
  /** Lighting that naturally fits this location */
  readonly preferredLighting?: readonly LightingKey[];
}

/**
 * Location metadata lookup by label.
 * Provides physical characteristics for conflict detection.
 */
export const locationMeta: Record<string, LocationMeta> = {
  // Urban - outdoor/modern
  'City Street': { metaCategory: 'outdoor', scale: 'medium', era: 'modern' },
  'Neon-lit Alley': { metaCategory: 'outdoor', scale: 'intimate', era: 'modern', preferredAtmospheres: ['cyberpunk', 'moody'], preferredLighting: ['neon', 'practical'] },
  'Rooftop': { metaCategory: 'outdoor', scale: 'vast', era: 'modern' },
  'Subway Station': { metaCategory: 'indoor', scale: 'medium', era: 'modern' },
  'Parking Lot': { metaCategory: 'outdoor', scale: 'medium', era: 'modern' },

  // Nature - outdoor/any
  'Forest': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredLighting: ['goldenhour', 'godrays'] },
  'Desert': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredLighting: ['goldenhour'] },
  'Beach': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredLighting: ['goldenhour', 'bluehour'] },
  'Mountain Peak': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredAtmospheres: ['epic'] },
  'Cornfield': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredLighting: ['goldenhour'] },
  'Waterfall': { metaCategory: 'outdoor', scale: 'medium', era: 'any' },
  'Snowy Tundra': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredLighting: ['bluehour'] },

  // Interior - indoor
  'Abandoned Warehouse': { metaCategory: 'indoor', scale: 'vast', era: 'modern', preferredAtmospheres: ['moody'], preferredLighting: ['godrays', 'practical'] },
  'Luxury Penthouse': { metaCategory: 'indoor', scale: 'medium', era: 'modern', preferredLighting: ['softbox', 'practical'] },
  'Old Library': { metaCategory: 'indoor', scale: 'medium', era: 'historical', preferredAtmospheres: ['vintage'], preferredLighting: ['practical', 'goldenhour'] },
  'Neon Bar': { metaCategory: 'indoor', scale: 'intimate', era: 'modern', preferredAtmospheres: ['cyberpunk', 'moody'], preferredLighting: ['neon', 'practical'] },
  'Cathedral': { metaCategory: 'indoor', scale: 'vast', era: 'historical', preferredAtmospheres: ['epic'], preferredLighting: ['godrays'] },
  'Office': { metaCategory: 'indoor', scale: 'medium', era: 'modern', preferredLighting: ['softbox', 'highkey'] },

  // Fantasy - either/any
  'Enchanted Forest': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredAtmospheres: ['dreamy', 'romantic'], preferredLighting: ['godrays', 'moonlit'] },
  'Floating Islands': { metaCategory: 'outdoor', scale: 'vast', era: 'any', preferredAtmospheres: ['epic', 'dreamy'] },
  'Ancient Ruins': { metaCategory: 'either', scale: 'vast', era: 'historical', preferredAtmospheres: ['moody', 'epic'] },
  'Crystal Cave': { metaCategory: 'indoor', scale: 'medium', era: 'any', preferredAtmospheres: ['dreamy'] },

  // Industrial - indoor/futuristic
  'Factory Floor': { metaCategory: 'indoor', scale: 'vast', era: 'modern', preferredLighting: ['practical'] },
  'Cyberpunk City': { metaCategory: 'outdoor', scale: 'vast', era: 'futuristic', preferredAtmospheres: ['cyberpunk'], preferredLighting: ['neon'], blockedAtmospheres: ['vintage'] },
  'Space Station': { metaCategory: 'indoor', scale: 'medium', era: 'futuristic', preferredAtmospheres: ['cinematic'] },
  'Underground Bunker': { metaCategory: 'indoor', scale: 'intimate', era: 'modern', preferredAtmospheres: ['moody'], preferredLighting: ['practical', 'lowkey'] },
};

/**
 * Atmosphere + Location era conflicts.
 * Prevents temporal inconsistencies.
 */
export const atmosphereEraConflicts: Partial<Record<Atmosphere, LocationEra[]>> = {
  vintage: ['futuristic'],  // Vintage atmosphere doesn't fit futuristic locations
  cyberpunk: ['historical'], // Cyberpunk doesn't fit historical locations
};

/**
 * Location category + atmosphere conflicts.
 * Prevents atmosphere/setting mismatches.
 */
export const locationCategoryAtmosphereConflicts: Record<LocationCategory, Atmosphere[]> = {
  urban: [],
  nature: [],
  interior: [],
  fantasy: [],
  industrial: [],
};

/**
 * Lighting + Location meta conflicts.
 * Prevents physically impossible combinations.
 */
export const lightingLocationConflicts: Partial<Record<LightingKey, LocationMetaCategory[]>> = {
  goldenhour: ['indoor'],  // Golden hour is outdoor sunlight (unless near windows)
  bluehour: ['indoor'],    // Blue hour is outdoor twilight
  moonlit: ['indoor'],     // Moonlight is outdoor (unless near windows)
  softbox: ['outdoor'],    // Studio softbox is typically indoor
};

/**
 * Shot scale + Location scale conflicts.
 * Prevents scale mismatches.
 */
export const shotScaleConflicts: Record<string, LocationScale[]> = {
  'Extreme Wide Shot (XWS)': ['intimate'], // XWS needs vast space
  'Extreme Close-Up (ECU)': [],  // ECU works anywhere
};

/**
 * Get location metadata by label.
 * Returns default values if location not found.
 */
export function getLocationMeta(locationLabel: string): LocationMeta {
  return locationMeta[locationLabel] || {
    metaCategory: 'either',
    scale: 'medium',
    era: 'any',
  };
}

/**
 * Check if an atmosphere is blocked by a location.
 */
export function isAtmosphereBlockedByLocation(
  atmosphere: Atmosphere,
  locationLabel: string
): boolean {
  const meta = getLocationMeta(locationLabel);

  // Check direct blocks
  if (meta.blockedAtmospheres?.includes(atmosphere)) {
    return true;
  }

  // Check era conflicts
  const eraConflicts = atmosphereEraConflicts[atmosphere];
  if (eraConflicts && eraConflicts.includes(meta.era)) {
    return true;
  }

  return false;
}

/**
 * Check if a lighting type is blocked by a location.
 */
export function isLightingBlockedByLocation(
  lighting: LightingKey,
  locationLabel: string
): boolean {
  const meta = getLocationMeta(locationLabel);
  const blockedMetas = lightingLocationConflicts[lighting];

  // If location is 'either', no conflict
  if (meta.metaCategory === 'either') {
    return false;
  }

  return blockedMetas?.includes(meta.metaCategory) || false;
}
