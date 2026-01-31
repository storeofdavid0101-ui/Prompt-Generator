/**
 * Composed State Type Definitions
 *
 * Types for the unified state returned by usePromptGeneratorState.
 * Uses interface composition for maintainability.
 *
 * @module hooks/state/types/composed
 */

import type {
  AIModel,
  Atmosphere,
  CharacterItem,
  ThemeColors,
  ConflictResult,
  ExpandedSections,
  LockedSections,
} from '../../../config/types';
import type { SliderValue, Setter, AsyncAction, ResetAction } from './common.types';

// ============================================================================
// Domain State Return Interfaces
// ============================================================================

/** Theme-related state in the combined return */
interface ThemeStateReturn {
  readonly darkMode: boolean;
  readonly setDarkMode: Setter<boolean>;
  readonly copied: boolean;
  readonly themeColors: ThemeColors;
}

/** Model-related state in the combined return */
interface ModelStateReturn {
  readonly selectedModel: AIModel;
  readonly setSelectedModel: Setter<AIModel>;
}

/** Creative controls state in the combined return */
interface CreativeControlsReturn {
  readonly creativity: SliderValue;
  readonly setCreativity: Setter<SliderValue>;
  readonly variation: SliderValue;
  readonly setVariation: Setter<SliderValue>;
  readonly uniqueness: SliderValue;
  readonly setUniqueness: Setter<SliderValue>;
  readonly creativeControlsEnabled: boolean;
  readonly setCreativeControlsEnabled: Setter<boolean>;
}

/** Content state in the combined return */
interface ContentStateReturn {
  readonly subject: string;
  readonly setSubject: Setter<string>;
  readonly characterItems: CharacterItem[];
  readonly currentCharacter: string;
  readonly setCurrentCharacter: Setter<string>;
  readonly gazeDirection: string;
  readonly setGazeDirection: Setter<string>;
  readonly poseAction: string;
  readonly setPoseAction: Setter<string>;
  readonly characterPosition: string;
  readonly setCharacterPosition: Setter<string>;
  readonly location: string;
  readonly setLocation: Setter<string>;
  readonly addCharacter: ResetAction;
  readonly removeCharacter: (id: string) => void;
}

/** Visual state in the combined return */
interface VisualStateReturn {
  readonly selectedAtmosphere: Atmosphere | null;
  readonly setSelectedAtmosphere: Setter<Atmosphere | null>;
  readonly selectedVisualPreset: string | null;
  readonly setSelectedVisualPreset: Setter<string | null>;
  readonly selectedLighting: string | null;
  readonly setSelectedLighting: Setter<string | null>;
  readonly selectedColorPalette: string | null;
  readonly setSelectedColorPalette: Setter<string | null>;
  readonly customColors: string[];
  readonly setCustomColors: Setter<string[]>;
}

/** Camera state in the combined return */
interface CameraStateReturn {
  readonly selectedCamera: string;
  readonly customCamera: string;
  readonly setCustomCamera: Setter<string>;
  readonly selectedLens: string;
  readonly setSelectedLens: Setter<string>;
  readonly customLens: string;
  readonly setCustomLens: Setter<string>;
  readonly selectedShot: string;
  readonly setSelectedShot: Setter<string>;
  readonly customShot: string;
  readonly setCustomShot: Setter<string>;
  readonly depthOfField: string;
  readonly setDepthOfField: Setter<string>;
  readonly aspectRatio: string;
  readonly setAspectRatio: Setter<string>;
  readonly handleCameraChange: Setter<string>;
}

/** Director state in the combined return */
interface DirectorStateReturn {
  readonly selectedDirector: string;
  readonly handleDirectorChange: Setter<string>;
}

/** Advanced settings in the combined return */
interface AdvancedStateReturn {
  readonly negativePrompt: string;
  readonly setNegativePrompt: Setter<string>;
  readonly showAdvanced: boolean;
  readonly setShowAdvanced: Setter<boolean>;
}

/** UI state in the combined return */
interface UIStateReturn {
  readonly lockedSections: LockedSections;
  readonly toggleLock: (key: keyof LockedSections) => void;
  readonly expandedSections: ExpandedSections;
  readonly toggleSection: (key: string) => void;
  readonly conflicts: ConflictResult;
}

/** Actions in the combined return */
interface ActionsReturn {
  readonly prompt: string;
  readonly copyToClipboard: AsyncAction;
  readonly resetAll: ResetAction;
}

// ============================================================================
// Main Combined State Interface
// ============================================================================

/**
 * Combined state returned by usePromptGeneratorState
 *
 * Composed from domain-specific state interfaces for maintainability.
 * Each interface represents a logical grouping of related state.
 *
 * For performance-critical components, consider using
 * domain-specific selector hooks instead of this full interface.
 */
export interface PromptGeneratorStateReturn
  extends ThemeStateReturn,
    ModelStateReturn,
    CreativeControlsReturn,
    ContentStateReturn,
    VisualStateReturn,
    CameraStateReturn,
    DirectorStateReturn,
    AdvancedStateReturn,
    UIStateReturn,
    ActionsReturn {}
