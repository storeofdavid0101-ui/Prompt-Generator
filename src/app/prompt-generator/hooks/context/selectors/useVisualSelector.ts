/**
 * Visual Selector Hook
 *
 * Provides access to visual styling state (atmosphere, presets, lighting, colors).
 * Use this for components managing visual settings.
 *
 * @module hooks/context/selectors/useVisualSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';
import type { Atmosphere } from '../../../config/types';

/**
 * Visual selector return type
 */
export interface VisualSelectorReturn {
  /** Selected atmosphere preset */
  readonly selectedAtmosphere: Atmosphere | null;
  /** Update atmosphere selection */
  readonly setSelectedAtmosphere: (value: Atmosphere | null) => void;
  /** Selected visual style preset */
  readonly selectedVisualPreset: string | null;
  /** Update visual preset selection */
  readonly setSelectedVisualPreset: (value: string | null) => void;
  /** Selected lighting option */
  readonly selectedLighting: string | null;
  /** Update lighting selection */
  readonly setSelectedLighting: (value: string | null) => void;
  /** Selected color palette */
  readonly selectedColorPalette: string | null;
  /** Update color palette selection */
  readonly setSelectedColorPalette: (value: string | null) => void;
  /** Custom color values */
  readonly customColors: readonly string[];
  /** Update custom colors */
  readonly setCustomColors: (colors: string[]) => void;
}

/**
 * Hook to access only visual styling state
 *
 * @returns Visual state and handlers
 *
 * @example
 * ```tsx
 * function AtmosphereSelector() {
 *   const { selectedAtmosphere, setSelectedAtmosphere } = useVisualSelector();
 *   return <select value={selectedAtmosphere ?? ''} onChange={...} />;
 * }
 * ```
 */
export function useVisualSelector(): VisualSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      selectedAtmosphere: context.selectedAtmosphere,
      setSelectedAtmosphere: context.setSelectedAtmosphere,
      selectedVisualPreset: context.selectedVisualPreset,
      setSelectedVisualPreset: context.setSelectedVisualPreset,
      selectedLighting: context.selectedLighting,
      setSelectedLighting: context.setSelectedLighting,
      selectedColorPalette: context.selectedColorPalette,
      setSelectedColorPalette: context.setSelectedColorPalette,
      customColors: context.customColors,
      setCustomColors: context.setCustomColors,
    }),
    [
      context.selectedAtmosphere,
      context.setSelectedAtmosphere,
      context.selectedVisualPreset,
      context.setSelectedVisualPreset,
      context.selectedLighting,
      context.setSelectedLighting,
      context.selectedColorPalette,
      context.setSelectedColorPalette,
      context.customColors,
      context.setCustomColors,
    ]
  );
}
