/**
 * Lens Physics Configuration
 *
 * Presets and options for advanced lens control.
 *
 * @module config/lensPhysics
 */

import type {
  LensPhysicsState,
  Aperture,
  AperturePreset,
  FocalLengthPreset,
  DistortionType,
  DistortionPreset,
  DOFControl,
  DOFControlPreset,
  BokehShape,
  BokehShapePreset,
} from './types/lensPhysics';

/**
 * Default lens physics state.
 */
export const DEFAULT_LENS_PHYSICS_STATE: LensPhysicsState = {
  enabled: false,
  focalLength: 50,
  aperture: 'f/2.8',
  distortion: 'none',
  dofControl: 'moderate',
  bokehShape: 'circular',
};

/**
 * Aperture presets with keywords.
 */
export const aperturePresets: AperturePreset[] = [
  {
    value: 'f/1.4',
    label: 'f/1.4',
    description: 'Maximum light, extreme bokeh',
    keywords: 'f/1.4 aperture, wide open, maximum bokeh, razor-thin focus plane',
  },
  {
    value: 'f/1.8',
    label: 'f/1.8',
    description: 'Very wide, beautiful bokeh',
    keywords: 'f/1.8 aperture, wide aperture, creamy bokeh, shallow depth of field',
  },
  {
    value: 'f/2',
    label: 'f/2',
    description: 'Wide aperture, soft background',
    keywords: 'f/2 aperture, soft background blur, portrait aperture',
  },
  {
    value: 'f/2.8',
    label: 'f/2.8',
    description: 'Professional standard',
    keywords: 'f/2.8 aperture, professional lens, balanced sharpness and bokeh',
  },
  {
    value: 'f/4',
    label: 'f/4',
    description: 'Balanced sharpness',
    keywords: 'f/4 aperture, balanced depth of field, sharp across frame',
  },
  {
    value: 'f/5.6',
    label: 'f/5.6',
    description: 'Sharp with some blur',
    keywords: 'f/5.6 aperture, moderate depth of field, landscape starting point',
  },
  {
    value: 'f/8',
    label: 'f/8',
    description: 'Maximum sharpness zone',
    keywords: 'f/8 aperture, sweet spot sharpness, optimal clarity',
  },
  {
    value: 'f/11',
    label: 'f/11',
    description: 'Deep focus',
    keywords: 'f/11 aperture, deep focus, landscape aperture',
  },
  {
    value: 'f/16',
    label: 'f/16',
    description: 'Everything in focus',
    keywords: 'f/16 aperture, extended depth of field, architectural photography',
  },
  {
    value: 'f/22',
    label: 'f/22',
    description: 'Maximum depth, diffraction',
    keywords: 'f/22 aperture, infinite focus, sun star effects',
  },
];

/**
 * Common focal length presets.
 */
export const focalLengthPresets: FocalLengthPreset[] = [
  { value: 14, label: '14mm', type: 'ultra-wide', keywords: '14mm ultra-wide angle, dramatic perspective, extreme distortion' },
  { value: 24, label: '24mm', type: 'wide', keywords: '24mm wide angle, environmental context, slight perspective distortion' },
  { value: 35, label: '35mm', type: 'wide', keywords: '35mm wide angle, documentary style, natural perspective' },
  { value: 50, label: '50mm', type: 'standard', keywords: '50mm standard lens, natural field of view, classic perspective' },
  { value: 85, label: '85mm', type: 'portrait', keywords: '85mm portrait lens, flattering compression, subject isolation' },
  { value: 105, label: '105mm', type: 'portrait', keywords: '105mm portrait lens, intimate details, strong compression' },
  { value: 135, label: '135mm', type: 'telephoto', keywords: '135mm telephoto, compressed perspective, background compression' },
  { value: 200, label: '200mm', type: 'telephoto', keywords: '200mm telephoto, extreme compression, distant subject isolation' },
];

/**
 * Distortion presets.
 */
export const distortionPresets: Record<DistortionType, DistortionPreset> = {
  none: {
    id: 'none',
    name: 'None',
    description: 'No distortion, rectilinear projection',
    keywords: '',
  },
  barrel: {
    id: 'barrel',
    name: 'Barrel',
    description: 'Lines curve outward at edges',
    keywords: 'barrel distortion, wide angle lens distortion, curved edges',
  },
  pincushion: {
    id: 'pincushion',
    name: 'Pincushion',
    description: 'Lines curve inward at edges',
    keywords: 'pincushion distortion, telephoto lens distortion, inward curving lines',
  },
};

/**
 * DOF control presets.
 */
export const dofControlPresets: Record<DOFControl, DOFControlPreset> = {
  shallow: {
    id: 'shallow',
    name: 'Shallow',
    description: 'Subject isolated, blurred background',
    keywords: 'shallow depth of field, extreme bokeh, subject isolation, blurred background',
  },
  moderate: {
    id: 'moderate',
    name: 'Moderate',
    description: 'Balanced focus with soft edges',
    keywords: 'moderate depth of field, balanced focus, soft background transition',
  },
  deep: {
    id: 'deep',
    name: 'Deep',
    description: 'Most of scene in focus',
    keywords: 'deep depth of field, extended focus, sharp foreground to background',
  },
  infinite: {
    id: 'infinite',
    name: 'Infinite',
    description: 'Everything sharp, hyperfocal',
    keywords: 'infinite depth of field, hyperfocal distance, everything in focus, pan focus',
  },
};

/**
 * Bokeh shape presets.
 */
export const bokehShapePresets: Record<BokehShape, BokehShapePreset> = {
  circular: {
    id: 'circular',
    name: 'Circular',
    description: 'Round, smooth bokeh balls',
    keywords: 'circular bokeh, round out-of-focus highlights, smooth bokeh balls',
  },
  hexagonal: {
    id: 'hexagonal',
    name: 'Hexagonal',
    description: 'Six-sided vintage look',
    keywords: 'hexagonal bokeh, six-blade aperture, vintage lens character',
  },
  'anamorphic-oval': {
    id: 'anamorphic-oval',
    name: 'Anamorphic Oval',
    description: 'Horizontal stretched bokeh',
    keywords: 'anamorphic bokeh, oval bokeh, horizontal lens flares, cinematic anamorphic',
  },
};

/**
 * Get focal length type description.
 */
export function getFocalLengthType(focalLength: number): string {
  if (focalLength < 20) return 'ultra-wide angle';
  if (focalLength < 35) return 'wide angle';
  if (focalLength < 70) return 'standard';
  if (focalLength < 135) return 'portrait telephoto';
  return 'telephoto';
}

/**
 * Get focal length keywords for a given value.
 */
export function getFocalLengthKeywords(focalLength: number): string {
  const type = getFocalLengthType(focalLength);
  const preset = focalLengthPresets.find(p => p.value === focalLength);
  if (preset) {
    return preset.keywords;
  }
  return `${focalLength}mm ${type} lens`;
}
