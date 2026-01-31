/**
 * LensPhysics Component Types
 *
 * @module components/LensPhysics/types
 */

import type { ThemeColors } from '../../config/types';
import type { LensPhysicsStateReturn } from '../../hooks/state/types/lensPhysics.types';

/**
 * Props for LensPhysics component.
 */
export interface LensPhysicsProps {
  /** Lens physics state from hook */
  state: LensPhysicsStateReturn;

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
