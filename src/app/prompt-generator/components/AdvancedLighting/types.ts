/**
 * AdvancedLighting Component Types
 *
 * @module components/AdvancedLighting/types
 */

import type { ThemeColors } from '../../config/types';
import type { AdvancedLightingStateReturn } from '../../hooks/state/types/advancedLighting.types';

/**
 * Props for the AdvancedLighting component.
 */
export interface AdvancedLightingProps {
  /** Advanced lighting state from hook */
  state: AdvancedLightingStateReturn;

  /** Whether the section is expanded */
  isExpanded: boolean;

  /** Whether the section is locked */
  isLocked: boolean;

  /** Toggle lock callback */
  onToggleLock: () => void;

  /** Toggle section expand/collapse */
  onToggleSection: (key: string) => void;

  /** Theme colors */
  themeColors: ThemeColors;

  /** Optional randomize callback */
  onRandomize?: () => void;
}
