/**
 * GrainEngine Component Types
 *
 * @module components/GrainEngine/types
 */

import type { ThemeColors } from '../../config/types';
import type { GrainEngineStateReturn } from '../../hooks/state/types/grainEngine.types';

/**
 * Props for GrainEngine component.
 */
export interface GrainEngineProps {
  /** Grain engine state from hook */
  state: GrainEngineStateReturn;

  /** Whether the section is expanded */
  isExpanded: boolean;

  /** Whether the section is locked */
  isLocked: boolean;

  /** Handler to toggle lock state */
  onToggleLock: () => void;

  /** Handler to toggle section expansion */
  onToggleSection: (key: string) => void;

  /** Theme colors */
  themeColors: ThemeColors;

  /** Optional randomize handler */
  onRandomize?: () => void;
}
