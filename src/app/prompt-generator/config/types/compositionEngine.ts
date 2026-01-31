/**
 * Composition Engine Type Definitions
 *
 * Types for precise composition control including subject placement,
 * frame occupancy, negative space, and vanishing points.
 *
 * @module config/types/compositionEngine
 */

/**
 * Rule of thirds intersection points
 */
export type RuleOfThirdsPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | null;

/**
 * Vanishing point location
 */
export type VanishingPointType =
  | 'central'
  | 'off-center-left'
  | 'off-center-right'
  | 'multiple'
  | null;

/**
 * Frame balance direction
 */
export type FrameBalance =
  | 'centered'
  | 'left-heavy'
  | 'right-heavy'
  | 'top-heavy'
  | 'bottom-heavy';

/**
 * Subject position within frame
 */
export interface SubjectPlacement {
  x: number; // 0.0 to 1.0, left to right
  y: number; // 0.0 to 1.0, top to bottom
}

/**
 * Negative space distribution
 */
export interface NegativeSpace {
  left: number;   // 0-100%
  right: number;  // 0-100%
  top: number;    // 0-100%
  bottom: number; // 0-100%
}

/**
 * Composition presets for quick setup
 */
export type CompositionPreset =
  | 'centered'
  | 'rule-of-thirds-left'
  | 'rule-of-thirds-right'
  | 'golden-ratio'
  | 'diagonal'
  | 'symmetrical'
  | 'asymmetrical'
  | null;

/**
 * Composition preset configuration
 */
export interface CompositionPresetConfig {
  id: CompositionPreset;
  name: string;
  description: string;
  placement: SubjectPlacement;
  frameOccupancy: number;
  ruleOfThirds: RuleOfThirdsPosition;
  vanishingPoint: VanishingPointType;
  keywords: string[];
}

/**
 * Full composition engine state
 */
export interface CompositionEngineState {
  enabled: boolean;
  preset: CompositionPreset;
  subjectPlacement: SubjectPlacement;
  frameOccupancy: number;       // 0-100%
  negativeSpace: NegativeSpace;
  vanishingPoint: VanishingPointType;
  ruleOfThirds: RuleOfThirdsPosition;
  frameBalance: FrameBalance;
}
