/**
 * Color palette configurations
 * Predefined color palettes with hex values for prompt generation
 */

import type { ColorPaletteConfig } from './types';

export const colorPalettes: Record<string, ColorPaletteConfig> = {
  'teal-orange': {
    name: 'Teal & Orange',
    colors: ['#1A535C', '#4ECDC4', '#FF6B6B', '#FFE66D', '#2E4057', '#F4A261'],
  },
  noir: {
    name: 'Noir / B&W',
    colors: ['#0D0D0D', '#2C2C2C', '#4A4A4A', '#FFFFFF', '#1A1A2E', '#B8B8B8'],
  },
  'neon-cyberpunk': {
    name: 'Neon Cyberpunk',
    colors: ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#06D6A0', '#7B2CBF'],
  },
  'warm-sunset': {
    name: 'Warm Sunset',
    colors: ['#F39C12', '#E74C3C', '#D35400', '#C0392B', '#F5B041', '#EB984E'],
  },
  'cool-ocean': {
    name: 'Cool Ocean',
    colors: ['#1ABC9C', '#3498DB', '#2980B9', '#16A085', '#5DADE2', '#48C9B0'],
  },
  'pastel-dream': {
    name: 'Pastel Dream',
    colors: ['#FFB5E8', '#B28DFF', '#AFF8DB', '#BFFCC6', '#FFC9DE', '#C4FAF8'],
  },
  'earthy-natural': {
    name: 'Earthy Natural',
    colors: ['#8B7355', '#556B2F', '#A0522D', '#6B8E23', '#DEB887', '#D2691E'],
  },
  'vintage-sepia': {
    name: 'Vintage Sepia',
    colors: ['#D4A574', '#C9A86C', '#8B7355', '#704214', '#A67B5B', '#E3C4A8'],
  },
  'forest-moss': {
    name: 'Forest Moss',
    colors: ['#2D5A27', '#4A7C23', '#8FBC8F', '#556B2F', '#6B8E23', '#228B22'],
  },
};
