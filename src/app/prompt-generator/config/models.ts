/**
 * AI Model configurations
 * Defines parameters and settings for each supported AI image generation model
 */

import type { AIModel, ModelConfig } from './types';

export const modelConfigs: Record<AIModel, ModelConfig> = {
  midjourney: {
    name: 'Midjourney',
    icon: '🎨',
    maxCreativity: 1000,
    creativityParam: '--stylize',
    variationParam: '--chaos',
    negativeParam: '--no',
    aspectParam: '--ar',
  },
  flux: {
    name: 'Flux',
    icon: '⚡',
    maxCreativity: 20,
    creativityParam: 'guidance_scale:',
    variationParam: 'variation:',
    negativeParam: 'negative:',
    aspectParam: 'aspect:',
  },
  'stable-diffusion': {
    name: 'Stable Diffusion',
    icon: '🔮',
    maxCreativity: 30,
    creativityParam: 'CFG Scale:',
    variationParam: 'Variation:',
    negativeParam: 'Negative prompt:',
    aspectParam: 'Size:',
  },
  dalle3: {
    name: 'DALL-E 3',
    icon: '🌟',
    maxCreativity: 100,
    creativityParam: 'style:',
    variationParam: 'quality:',
    negativeParam: 'avoid:',
    aspectParam: 'size:',
  },
  chatgpt: {
    name: 'ChatGPT',
    icon: '💬',
    maxCreativity: 100,
    creativityParam: '',
    variationParam: '',
    negativeParam: 'without',
    aspectParam: '',
  },
};
