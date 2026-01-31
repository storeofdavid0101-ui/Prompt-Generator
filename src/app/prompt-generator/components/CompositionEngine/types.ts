/**
 * CompositionEngine Component Types
 *
 * @module components/CompositionEngine/types
 */

import type { ThemeColors } from '../../config/types';
import type { CompositionEngineStateReturn } from '../../hooks/state/types/compositionEngine.types';

/**
 * Props for the CompositionEngine component.
 */
export interface CompositionEngineProps {
  /** Composition engine state from hook */
  state: CompositionEngineStateReturn;

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
