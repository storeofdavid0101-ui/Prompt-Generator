/**
 * Composition Engine Configuration
 *
 * Presets and keyword mappings for precise composition control.
 *
 * @module config/compositionEngine
 */

import type {
  CompositionEngineState,
  CompositionPreset,
  CompositionPresetConfig,
  SubjectPlacement,
  VanishingPointType,
  RuleOfThirdsPosition,
  FrameBalance,
} from './types/compositionEngine';

/**
 * Default composition engine state
 */
export const DEFAULT_COMPOSITION_ENGINE_STATE: CompositionEngineState = {
  enabled: false,
  preset: null,
  subjectPlacement: { x: 0.5, y: 0.5 },
  frameOccupancy: 40,
  negativeSpace: { left: 30, right: 30, top: 30, bottom: 30 },
  vanishingPoint: null,
  ruleOfThirds: null,
  frameBalance: 'centered',
};

/**
 * Composition preset configurations
 */
export const compositionPresets: Record<NonNullable<CompositionPreset>, CompositionPresetConfig> = {
  'centered': {
    id: 'centered',
    name: 'Centered',
    description: 'Subject perfectly centered in frame',
    placement: { x: 0.5, y: 0.5 },
    frameOccupancy: 50,
    ruleOfThirds: null,
    vanishingPoint: 'central',
    keywords: ['centered composition', 'symmetrical framing', 'balanced frame'],
  },
  'rule-of-thirds-left': {
    id: 'rule-of-thirds-left',
    name: 'Thirds Left',
    description: 'Subject on left third intersection',
    placement: { x: 0.33, y: 0.33 },
    frameOccupancy: 35,
    ruleOfThirds: 'top-left',
    vanishingPoint: 'off-center-right',
    keywords: ['rule of thirds', 'off-center subject', 'looking room right'],
  },
  'rule-of-thirds-right': {
    id: 'rule-of-thirds-right',
    name: 'Thirds Right',
    description: 'Subject on right third intersection',
    placement: { x: 0.67, y: 0.33 },
    frameOccupancy: 35,
    ruleOfThirds: 'top-right',
    vanishingPoint: 'off-center-left',
    keywords: ['rule of thirds', 'off-center subject', 'looking room left'],
  },
  'golden-ratio': {
    id: 'golden-ratio',
    name: 'Golden Ratio',
    description: 'Fibonacci spiral composition',
    placement: { x: 0.618, y: 0.382 },
    frameOccupancy: 38,
    ruleOfThirds: null,
    vanishingPoint: null,
    keywords: ['golden ratio composition', 'fibonacci spiral', 'divine proportion'],
  },
  'diagonal': {
    id: 'diagonal',
    name: 'Diagonal',
    description: 'Dynamic diagonal leading lines',
    placement: { x: 0.25, y: 0.75 },
    frameOccupancy: 30,
    ruleOfThirds: 'bottom-left',
    vanishingPoint: 'off-center-right',
    keywords: ['diagonal composition', 'dynamic tension', 'leading lines'],
  },
  'symmetrical': {
    id: 'symmetrical',
    name: 'Symmetrical',
    description: 'Perfect left-right symmetry',
    placement: { x: 0.5, y: 0.4 },
    frameOccupancy: 60,
    ruleOfThirds: null,
    vanishingPoint: 'central',
    keywords: ['symmetrical composition', 'perfect symmetry', 'mirror balance'],
  },
  'asymmetrical': {
    id: 'asymmetrical',
    name: 'Asymmetrical',
    description: 'Intentional visual imbalance',
    placement: { x: 0.75, y: 0.6 },
    frameOccupancy: 25,
    ruleOfThirds: 'bottom-right',
    vanishingPoint: 'off-center-left',
    keywords: ['asymmetrical balance', 'visual tension', 'counterweight composition'],
  },
};

/**
 * Get placement description keywords
 */
export function getPlacementKeywords(placement: SubjectPlacement): string[] {
  const keywords: string[] = [];

  // Horizontal position
  if (placement.x < 0.35) {
    keywords.push('subject positioned left of frame');
  } else if (placement.x > 0.65) {
    keywords.push('subject positioned right of frame');
  } else {
    keywords.push('subject centered horizontally');
  }

  // Vertical position
  if (placement.y < 0.35) {
    keywords.push('subject in upper portion of frame');
  } else if (placement.y > 0.65) {
    keywords.push('subject in lower portion of frame');
  }

  return keywords;
}

/**
 * Get frame occupancy description
 */
export function getFrameOccupancyKeywords(occupancy: number): string[] {
  if (occupancy < 20) {
    return ['distant subject', 'negative space dominant', 'environmental framing'];
  } else if (occupancy < 40) {
    return ['medium shot framing', 'balanced negative space'];
  } else if (occupancy < 60) {
    return ['subject fills frame moderately', 'standard framing'];
  } else if (occupancy < 80) {
    return ['tight framing', 'subject dominant in frame'];
  } else {
    return ['extreme close framing', 'subject fills frame', 'minimal negative space'];
  }
}

/**
 * Get vanishing point keywords
 */
export function getVanishingPointKeywords(vanishingPoint: VanishingPointType): string[] {
  switch (vanishingPoint) {
    case 'central':
      return ['central vanishing point', 'one-point perspective', 'direct depth'];
    case 'off-center-left':
      return ['vanishing point left of center', 'asymmetric perspective'];
    case 'off-center-right':
      return ['vanishing point right of center', 'asymmetric perspective'];
    case 'multiple':
      return ['multiple vanishing points', 'complex perspective', 'two-point perspective'];
    default:
      return [];
  }
}

/**
 * Get rule of thirds keywords
 */
export function getRuleOfThirdsKeywords(position: RuleOfThirdsPosition): string[] {
  switch (position) {
    case 'top-left':
      return ['subject at top-left thirds intersection', 'rule of thirds upper left'];
    case 'top-right':
      return ['subject at top-right thirds intersection', 'rule of thirds upper right'];
    case 'bottom-left':
      return ['subject at bottom-left thirds intersection', 'rule of thirds lower left'];
    case 'bottom-right':
      return ['subject at bottom-right thirds intersection', 'rule of thirds lower right'];
    default:
      return [];
  }
}

/**
 * Get frame balance keywords
 */
export function getFrameBalanceKeywords(balance: FrameBalance): string[] {
  switch (balance) {
    case 'centered':
      return ['balanced composition', 'centered visual weight'];
    case 'left-heavy':
      return ['visual weight on left', 'left-biased composition'];
    case 'right-heavy':
      return ['visual weight on right', 'right-biased composition'];
    case 'top-heavy':
      return ['visual weight at top', 'top-heavy framing'];
    case 'bottom-heavy':
      return ['visual weight at bottom', 'grounded composition'];
  }
}

/**
 * Get negative space description
 */
export function getNegativeSpaceDescription(
  negativeSpace: { left: number; right: number; top: number; bottom: number }
): string[] {
  const keywords: string[] = [];
  const avgSpace = (negativeSpace.left + negativeSpace.right + negativeSpace.top + negativeSpace.bottom) / 4;

  if (avgSpace > 60) {
    keywords.push('abundant negative space');
    keywords.push('minimalist framing');
  } else if (avgSpace > 40) {
    keywords.push('balanced negative space');
  } else if (avgSpace < 20) {
    keywords.push('tight framing');
    keywords.push('minimal breathing room');
  }

  // Directional space
  if (negativeSpace.left > 50 && negativeSpace.right < 30) {
    keywords.push('looking room on left');
  } else if (negativeSpace.right > 50 && negativeSpace.left < 30) {
    keywords.push('looking room on right');
  }

  if (negativeSpace.top > 50) {
    keywords.push('headroom');
  }

  return keywords;
}
