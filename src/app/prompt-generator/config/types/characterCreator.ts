/**
 * Character Creator Type Definitions
 * Types for the face builder and character customization system
 */

import type { HelpDescription } from './core';

/** Character type selection */
export type CharacterType = 'human' | 'other';

/** Face feature slider values (0-100 scale) */
export interface FaceFeatures {
  /** Eye size: 0 = Small, 100 = Large */
  eyeSize: number;
  /** Eye shape: 0 = Round, 100 = Almond */
  eyeShape: number;
  /** Nose length: 0 = Short, 100 = Long */
  noseLength: number;
  /** Nose width: 0 = Narrow, 100 = Wide */
  noseWidth: number;
  /** Lip fullness: 0 = Thin, 100 = Plump */
  lipFullness: number;
  /** Face width: 0 = Narrow, 100 = Wide */
  faceWidth: number;
  /** Eyebrow thickness: 0 = Thin, 100 = Thick */
  eyebrowThickness: number;
  /** Eyebrow arch: 0 = Flat, 100 = High */
  eyebrowArch: number;
}

/** Keys of face features for iteration */
export type FaceFeatureKey = keyof FaceFeatures;

/** Threshold range for converting numeric values to descriptive text */
export interface FeatureThreshold {
  min: number;
  max: number;
  description: string;
}

/** Feature configuration with label, thresholds, and SVG transform data */
export interface FeatureConfig {
  label: string;
  minLabel: string;
  maxLabel: string;
  thresholds: FeatureThreshold[];
}

/** Feature configs mapped by feature key */
export type FaceFeatureConfigs = Record<FaceFeatureKey, FeatureConfig>;

/** Character creator help descriptions */
export interface CharacterCreatorHelp {
  faceBuilder: HelpDescription;
  clothing: HelpDescription;
  species: HelpDescription;
}
