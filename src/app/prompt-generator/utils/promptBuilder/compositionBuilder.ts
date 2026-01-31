/**
 * Composition Builder
 *
 * Resolves composition engine state into prompt components.
 *
 * @module utils/promptBuilder/compositionBuilder
 */

import type { CompositionEngineState } from '../../config/types/compositionEngine';
import {
  compositionPresets,
  getPlacementKeywords,
  getFrameOccupancyKeywords,
  getVanishingPointKeywords,
  getRuleOfThirdsKeywords,
  getFrameBalanceKeywords,
  getNegativeSpaceDescription,
} from '../../config/compositionEngine';

/**
 * Resolved composition components
 */
export interface ResolvedComposition {
  prose: string | null;
  tags: string[];
  machine: string | null;
}

/**
 * Resolve composition engine state to prompt components
 */
export function resolveComposition(state: CompositionEngineState): ResolvedComposition {
  if (!state.enabled) {
    return { prose: null, tags: [], machine: null };
  }

  const tags: string[] = [];
  const proseSegments: string[] = [];

  // If using a preset, add its keywords
  if (state.preset && compositionPresets[state.preset]) {
    const presetConfig = compositionPresets[state.preset];
    tags.push(...presetConfig.keywords);
    proseSegments.push(presetConfig.description);
  }

  // Placement keywords
  const placementKeywords = getPlacementKeywords(state.subjectPlacement);
  tags.push(...placementKeywords);

  // Frame occupancy
  const occupancyKeywords = getFrameOccupancyKeywords(state.frameOccupancy);
  tags.push(...occupancyKeywords);

  if (state.frameOccupancy < 30) {
    proseSegments.push(`subject occupies ${state.frameOccupancy}% of frame with abundant negative space`);
  } else if (state.frameOccupancy > 70) {
    proseSegments.push(`subject fills ${state.frameOccupancy}% of the frame`);
  }

  // Rule of thirds
  if (state.ruleOfThirds) {
    const thirdsKeywords = getRuleOfThirdsKeywords(state.ruleOfThirds);
    tags.push(...thirdsKeywords);
    if (!state.preset) {
      proseSegments.push(`subject placed at ${state.ruleOfThirds} thirds intersection`);
    }
  }

  // Vanishing point
  if (state.vanishingPoint) {
    const vpKeywords = getVanishingPointKeywords(state.vanishingPoint);
    tags.push(...vpKeywords);

    if (state.vanishingPoint === 'central') {
      proseSegments.push('central vanishing point creating depth');
    } else if (state.vanishingPoint === 'multiple') {
      proseSegments.push('complex multi-point perspective');
    }
  }

  // Frame balance
  const balanceKeywords = getFrameBalanceKeywords(state.frameBalance);
  tags.push(...balanceKeywords);

  if (state.frameBalance !== 'centered') {
    proseSegments.push(`${state.frameBalance.replace('-', ' ')} composition`);
  }

  // Negative space
  const negativeSpaceKeywords = getNegativeSpaceDescription(state.negativeSpace);
  tags.push(...negativeSpaceKeywords);

  // Build prose
  const prose = proseSegments.length > 0
    ? `Composed with ${proseSegments.join(', ')}.`
    : null;

  // Build machine format
  const machine = `[COMPOSITION] ` +
    `placement: x=${state.subjectPlacement.x.toFixed(2)}, y=${state.subjectPlacement.y.toFixed(2)}; ` +
    `occupancy: ${state.frameOccupancy}%; ` +
    `balance: ${state.frameBalance}` +
    (state.ruleOfThirds ? `; thirds: ${state.ruleOfThirds}` : '') +
    (state.vanishingPoint ? `; vanishing: ${state.vanishingPoint}` : '');

  return {
    prose,
    tags: [...new Set(tags)], // Dedupe
    machine,
  };
}
