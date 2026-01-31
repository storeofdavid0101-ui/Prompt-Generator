/**
 * Character Description Builder
 *
 * Converts face feature values and clothing to descriptive text for prompts.
 * Maps slider values (0-100) to human-readable descriptions using thresholds.
 *
 * @module utils/promptBuilder/characterDescriptionBuilder
 */

import type {
  FaceFeatures,
  FaceFeatureKey,
  CharacterType,
} from '../../config/types';
import { faceFeatureConfigs } from '../../config';

/**
 * Parameters for building a character description
 */
export interface BuildCharacterParams {
  characterType: CharacterType;
  customSpecies: string;
  faceFeatures: FaceFeatures;
  clothing: string;
}

/**
 * Get description text for a feature value based on threshold ranges
 *
 * @param feature - The face feature key
 * @param value - The slider value (0-100)
 * @returns The descriptive text, or empty string for neutral values
 */
function getFeatureDescription(feature: FaceFeatureKey, value: number): string {
  const config = faceFeatureConfigs[feature];
  if (!config) return '';

  const threshold = config.thresholds.find(
    (t) => value >= t.min && value <= t.max
  );

  return threshold?.description || '';
}

/**
 * Combines feature descriptions intelligently to avoid repetition.
 * Groups related features (e.g., "large almond-shaped eyes" instead of
 * "large eyes, almond-shaped eyes")
 *
 * @param descriptions - Array of raw feature descriptions
 * @returns Combined, natural-sounding description
 */
function combineFeatureDescriptions(descriptions: string[]): string {
  // Group by body part
  const eyeDescriptions = descriptions.filter((d) => d.includes('eyes'));
  const browDescriptions = descriptions.filter((d) => d.includes('eyebrow'));
  const noseDescriptions = descriptions.filter((d) => d.includes('nose'));
  const lipDescriptions = descriptions.filter((d) => d.includes('lips'));
  const faceDescriptions = descriptions.filter((d) => d.includes('face'));

  const result: string[] = [];

  // Combine eye descriptions: "large almond-shaped eyes"
  if (eyeDescriptions.length > 0) {
    const eyeAdj = eyeDescriptions
      .map((d) => d.replace(/\s*eyes?\s*/gi, ' ').trim())
      .filter(Boolean)
      .join(' ');
    if (eyeAdj) result.push(`${eyeAdj} eyes`);
  }

  // Combine eyebrow descriptions
  if (browDescriptions.length > 0) {
    const browAdj = browDescriptions
      .map((d) => d.replace(/\s*eyebrows?\s*/gi, ' ').trim())
      .filter(Boolean)
      .join(' ');
    if (browAdj) result.push(`${browAdj} eyebrows`);
  }

  // Combine nose descriptions
  if (noseDescriptions.length > 0) {
    const noseAdj = noseDescriptions
      .map((d) => d.replace(/\s*nose\s*/gi, ' ').trim())
      .filter(Boolean)
      .join(' ');
    if (noseAdj) result.push(`${noseAdj} nose`);
  }

  // Lips - usually just one description
  if (lipDescriptions.length > 0) {
    result.push(lipDescriptions[0]);
  }

  // Face shape
  if (faceDescriptions.length > 0) {
    result.push(faceDescriptions[0]);
  }

  return result.join(', ');
}

/**
 * Build a character description from face features and settings
 *
 * @param params - Character parameters including type, species, features, and clothing
 * @returns A natural language description for use in prompts
 *
 * @example
 * ```ts
 * const description = buildCharacterDescription({
 *   characterType: 'human',
 *   customSpecies: '',
 *   faceFeatures: { eyeSize: 85, eyeShape: 90, lipFullness: 80, ... },
 *   clothing: 'Victorian silk dress',
 * });
 * // Returns: "with large almond-shaped eyes, full lips, wearing Victorian silk dress"
 * ```
 */
export function buildCharacterDescription({
  characterType,
  customSpecies,
  faceFeatures,
  clothing,
}: BuildCharacterParams): string {
  const parts: string[] = [];

  // Handle character type
  if (characterType === 'other' && customSpecies.trim()) {
    parts.push(customSpecies.trim());
  } else if (characterType === 'human') {
    // Collect non-empty feature descriptions
    const featureDescriptions: string[] = [];

    // Process features in logical grouping order
    const featureOrder: FaceFeatureKey[] = [
      'eyeSize',
      'eyeShape',
      'eyebrowThickness',
      'eyebrowArch',
      'noseLength',
      'noseWidth',
      'lipFullness',
      'faceWidth',
    ];

    for (const feature of featureOrder) {
      const desc = getFeatureDescription(feature, faceFeatures[feature]);
      if (desc) {
        featureDescriptions.push(desc);
      }
    }

    if (featureDescriptions.length > 0) {
      const combined = combineFeatureDescriptions(featureDescriptions);
      parts.push(`with ${combined}`);
    }
  }

  // Add clothing if specified
  if (clothing.trim()) {
    parts.push(`wearing ${clothing.trim()}`);
  }

  return parts.join(', ');
}

/**
 * Resolve character creator state into a prompt-ready description.
 * Returns null if no meaningful description can be generated.
 *
 * @param characterType - Human or other
 * @param customSpecies - Custom species for non-human characters
 * @param faceFeatures - Face feature slider values
 * @param clothing - Clothing/attire description
 * @returns Description string or null
 */
export function resolveCharacterCreator(
  characterType: CharacterType,
  customSpecies: string,
  faceFeatures: FaceFeatures,
  clothing: string
): string | null {
  const description = buildCharacterDescription({
    characterType,
    customSpecies,
    faceFeatures,
    clothing,
  });

  return description || null;
}
