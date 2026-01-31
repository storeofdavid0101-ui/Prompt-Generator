/**
 * Composition Engine State Types
 *
 * Type definitions for the composition engine state hook.
 *
 * @module hooks/state/types/compositionEngine
 */

import type {
  CompositionEngineState,
  CompositionPreset,
  SubjectPlacement,
  VanishingPointType,
  RuleOfThirdsPosition,
  FrameBalance,
} from '../../../config/types/compositionEngine';

/**
 * Composition engine state hook return type
 */
export interface CompositionEngineStateReturn extends CompositionEngineState {
  // Enable/disable
  setEnabled: (enabled: boolean) => void;

  // Preset selection
  setPreset: (preset: CompositionPreset) => void;
  applyPreset: (preset: NonNullable<CompositionPreset>) => void;

  // Subject placement
  setSubjectPlacement: (placement: SubjectPlacement) => void;
  setSubjectX: (x: number) => void;
  setSubjectY: (y: number) => void;

  // Frame occupancy
  setFrameOccupancy: (occupancy: number) => void;

  // Negative space
  setNegativeSpaceLeft: (value: number) => void;
  setNegativeSpaceRight: (value: number) => void;
  setNegativeSpaceTop: (value: number) => void;
  setNegativeSpaceBottom: (value: number) => void;

  // Composition rules
  setVanishingPoint: (point: VanishingPointType) => void;
  setRuleOfThirds: (position: RuleOfThirdsPosition) => void;
  setFrameBalance: (balance: FrameBalance) => void;

  // Reset
  reset: () => void;
}
