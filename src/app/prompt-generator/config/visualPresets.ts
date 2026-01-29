/**
 * Visual style preset configurations
 * Photography and cinema-focused visual styling options
 */

import type { PresetConfig } from './types';

export const visualPresets: Record<string, PresetConfig> = {
  raw: {
    name: 'Raw',
    keywords: 'natural photograph, unedited, authentic, true to life colors',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  },
  highcontrast: {
    name: 'High Contrast',
    keywords: 'high contrast photography, deep blacks, bright highlights, punchy colors',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  desaturated: {
    name: 'Desaturated',
    keywords: 'desaturated colors, muted tones, subtle palette, understated',
    gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  },
  vivid: {
    name: 'Vivid',
    keywords: 'vivid colors, saturated, vibrant, color-graded, punchy',
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  },
  filmlook: {
    name: 'Film Look',
    keywords: 'film color grade, lifted blacks, crushed highlights, cinematic color',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)',
  },
  bleachbypass: {
    name: 'Bleach Bypass',
    keywords: 'bleach bypass look, desaturated, high contrast, silver retention, gritty',
    gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
  },
};
