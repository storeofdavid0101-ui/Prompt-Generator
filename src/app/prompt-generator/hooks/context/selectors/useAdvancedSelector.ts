/**
 * Advanced Settings Selector Hook
 *
 * Provides access to advanced settings and creative controls.
 * Use this for components managing advanced options.
 *
 * @module hooks/context/selectors/useAdvancedSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';

/**
 * Advanced selector return type
 */
export interface AdvancedSelectorReturn {
  /** Negative prompt text */
  readonly negativePrompt: string;
  /** Update negative prompt */
  readonly setNegativePrompt: (value: string) => void;
  /** Whether advanced section is visible */
  readonly showAdvanced: boolean;
  /** Toggle advanced section visibility */
  readonly setShowAdvanced: (value: boolean) => void;
  /** Whether creative controls are enabled */
  readonly creativeControlsEnabled: boolean;
  /** Toggle creative controls */
  readonly setCreativeControlsEnabled: (value: boolean) => void;
  /** Creativity slider value */
  readonly creativity: number;
  /** Update creativity */
  readonly setCreativity: (value: number) => void;
  /** Variation slider value */
  readonly variation: number;
  /** Update variation */
  readonly setVariation: (value: number) => void;
  /** Uniqueness slider value */
  readonly uniqueness: number;
  /** Update uniqueness */
  readonly setUniqueness: (value: number) => void;
}

/**
 * Hook to access advanced settings and creative controls
 *
 * @returns Advanced state and handlers
 *
 * @example
 * ```tsx
 * function AdvancedPanel() {
 *   const { showAdvanced, setShowAdvanced, negativePrompt } = useAdvancedSelector();
 *   return showAdvanced ? <textarea value={negativePrompt} /> : null;
 * }
 * ```
 */
export function useAdvancedSelector(): AdvancedSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      negativePrompt: context.negativePrompt,
      setNegativePrompt: context.setNegativePrompt,
      showAdvanced: context.showAdvanced,
      setShowAdvanced: context.setShowAdvanced,
      creativeControlsEnabled: context.creativeControlsEnabled,
      setCreativeControlsEnabled: context.setCreativeControlsEnabled,
      creativity: context.creativity,
      setCreativity: context.setCreativity,
      variation: context.variation,
      setVariation: context.setVariation,
      uniqueness: context.uniqueness,
      setUniqueness: context.setUniqueness,
    }),
    [
      context.negativePrompt,
      context.setNegativePrompt,
      context.showAdvanced,
      context.setShowAdvanced,
      context.creativeControlsEnabled,
      context.setCreativeControlsEnabled,
      context.creativity,
      context.setCreativity,
      context.variation,
      context.setVariation,
      context.uniqueness,
      context.setUniqueness,
    ]
  );
}
