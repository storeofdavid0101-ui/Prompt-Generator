/**
 * Output Format Configuration
 *
 * Defines the available output format modes and their configurations.
 *
 * @module config/outputFormat
 */

import type { OutputMode, OutputModeConfig } from './types/outputFormat';

/**
 * Default output mode (Hybrid combines best of both worlds).
 */
export const DEFAULT_OUTPUT_MODE: OutputMode = 'hybrid';

/**
 * Output mode configurations.
 */
export const outputModeConfigs: Record<OutputMode, OutputModeConfig> = {
  prose: {
    id: 'prose',
    label: 'Prose',
    description: 'Natural language descriptions',
    example: 'A mysterious figure in a dark alley. Shot with 35mm lens...',
  },
  machine: {
    id: 'machine',
    label: 'Machine',
    description: 'Structured technical format',
    example: '[COMPOSITION] x=0.68, y=0.52\n[LENS] 35mm, f/2.8',
  },
  hybrid: {
    id: 'hybrid',
    label: 'Hybrid',
    description: 'Prose with technical metadata',
    example: 'A mysterious figure... \n\n[TECHNICAL_DATA]\ncomposition: x=0.68...',
  },
};

/**
 * Array of output modes in display order.
 */
export const outputModeOptions: OutputMode[] = ['prose', 'machine', 'hybrid'];
