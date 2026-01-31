/**
 * Character Creator Configuration
 * Maps slider values to descriptive prompt text and provides feature configs
 */

import type {
  FaceFeatures,
  FaceFeatureConfigs,
  CharacterCreatorHelp,
} from './types/characterCreator';

/** Default face feature values (neutral) */
export const DEFAULT_FACE_FEATURES: FaceFeatures = {
  eyeSize: 50,
  eyeShape: 50,
  noseLength: 50,
  noseWidth: 50,
  lipFullness: 50,
  faceWidth: 50,
  eyebrowThickness: 50,
  eyebrowArch: 50,
};

/**
 * Face feature configurations
 * Maps each feature to labels, thresholds, and descriptive text
 * Neutral values (40-60) produce empty descriptions to avoid verbose prompts
 */
export const faceFeatureConfigs: FaceFeatureConfigs = {
  eyeSize: {
    label: 'Eye Size',
    minLabel: 'Small',
    maxLabel: 'Large',
    thresholds: [
      { min: 0, max: 20, description: 'small narrow eyes' },
      { min: 21, max: 40, description: 'slightly small eyes' },
      { min: 41, max: 60, description: '' }, // neutral - omit
      { min: 61, max: 80, description: 'large expressive eyes' },
      { min: 81, max: 100, description: 'very large prominent eyes' },
    ],
  },
  eyeShape: {
    label: 'Eye Shape',
    minLabel: 'Round',
    maxLabel: 'Almond',
    thresholds: [
      { min: 0, max: 20, description: 'round doe eyes' },
      { min: 21, max: 40, description: 'slightly rounded eyes' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'almond-shaped eyes' },
      { min: 81, max: 100, description: 'sharp almond-shaped eyes' },
    ],
  },
  noseLength: {
    label: 'Nose Length',
    minLabel: 'Short',
    maxLabel: 'Long',
    thresholds: [
      { min: 0, max: 20, description: 'small button nose' },
      { min: 21, max: 40, description: 'petite nose' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'prominent nose' },
      { min: 81, max: 100, description: 'long prominent nose' },
    ],
  },
  noseWidth: {
    label: 'Nose Width',
    minLabel: 'Narrow',
    maxLabel: 'Wide',
    thresholds: [
      { min: 0, max: 20, description: 'narrow delicate nose' },
      { min: 21, max: 40, description: 'slim nose' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'broad nose' },
      { min: 81, max: 100, description: 'wide prominent nose' },
    ],
  },
  lipFullness: {
    label: 'Lip Fullness',
    minLabel: 'Thin',
    maxLabel: 'Plump',
    thresholds: [
      { min: 0, max: 20, description: 'thin lips' },
      { min: 21, max: 40, description: 'slim lips' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'full lips' },
      { min: 81, max: 100, description: 'thick prominent lips' },
    ],
  },
  faceWidth: {
    label: 'Face Shape',
    minLabel: 'Narrow',
    maxLabel: 'Wide',
    thresholds: [
      { min: 0, max: 20, description: 'narrow angular face' },
      { min: 21, max: 40, description: 'slender face' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'round face' },
      { min: 81, max: 100, description: 'wide round face' },
    ],
  },
  eyebrowThickness: {
    label: 'Eyebrow Thickness',
    minLabel: 'Thin',
    maxLabel: 'Thick',
    thresholds: [
      { min: 0, max: 20, description: 'thin delicate eyebrows' },
      { min: 21, max: 40, description: 'light eyebrows' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'thick eyebrows' },
      { min: 81, max: 100, description: 'bold bushy eyebrows' },
    ],
  },
  eyebrowArch: {
    label: 'Eyebrow Arch',
    minLabel: 'Flat',
    maxLabel: 'High',
    thresholds: [
      { min: 0, max: 20, description: 'flat straight eyebrows' },
      { min: 21, max: 40, description: 'slightly arched eyebrows' },
      { min: 41, max: 60, description: '' }, // neutral
      { min: 61, max: 80, description: 'arched eyebrows' },
      { min: 81, max: 100, description: 'highly arched dramatic eyebrows' },
    ],
  },
};

/** Help descriptions for Character Creator UI */
export const characterCreatorHelp: CharacterCreatorHelp = {
  faceBuilder: {
    title: 'Face Builder',
    description:
      'Customize facial features using sliders. Move sliders to extreme values for more pronounced descriptions in your prompt.',
    tip: 'Neutral values (around 50) will omit that feature from the prompt for a more natural description.',
  },
  clothing: {
    title: 'Attire / Clothing',
    description:
      'Describe what the character is wearing. Be specific about style, material, and details.',
    tip: 'Examples: "Tactical techwear vest", "Victorian silk dress", "Weathered leather jacket"',
  },
  species: {
    title: 'Species / Type',
    description: 'For non-human characters, specify the species or type.',
    tip: 'Examples: "Elf", "Robot", "Dragon", "Cyborg", "Alien"',
  },
};

/** Feature groups for organized slider display */
export const featureGroups = [
  {
    name: 'Eyes',
    features: ['eyeSize', 'eyeShape'] as const,
  },
  {
    name: 'Eyebrows',
    features: ['eyebrowThickness', 'eyebrowArch'] as const,
  },
  {
    name: 'Nose',
    features: ['noseLength', 'noseWidth'] as const,
  },
  {
    name: 'Lips',
    features: ['lipFullness'] as const,
  },
  {
    name: 'Face',
    features: ['faceWidth'] as const,
  },
];
