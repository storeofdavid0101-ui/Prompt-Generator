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
  CharacterType,
  FaceFeatures,
  FaceFeatureKey,
} from '../../../config/types';
import type { OutputMode } from '../../../config/types/outputFormat';
import type { SliderValue, Setter, AsyncAction, ResetAction } from './common.types';
import type { ColorGradingStateReturn } from './colorGrading.types';
import type { FilmStockStateReturn } from './filmStock.types';
import type { GrainEngineStateReturn } from './grainEngine.types';
import type { LensPhysicsStateReturn } from './lensPhysics.types';
import type { AdvancedLightingStateReturn } from './advancedLighting.types';
import type { CompositionEngineStateReturn } from './compositionEngine.types';

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

/** Character Creator state in the combined return */
interface CharacterCreatorStateReturn {
  readonly characterType: CharacterType;
  readonly setCharacterType: Setter<CharacterType>;
  readonly customSpecies: string;
  readonly setCustomSpecies: Setter<string>;
  readonly faceFeatures: FaceFeatures;
  readonly setFaceFeature: (feature: FaceFeatureKey, value: number) => void;
  readonly clothing: string;
  readonly setClothing: Setter<string>;
  readonly resetCharacterCreator: ResetAction;
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

/** Color grading state in the combined return */
interface ColorGradingReturn {
  readonly colorGrading: ColorGradingStateReturn;
}

/** Output format state in the combined return */
interface OutputFormatReturn {
  readonly outputMode: OutputMode;
  readonly setOutputMode: Setter<OutputMode>;
}

/** Film stock state in the combined return */
interface FilmStockReturn {
  readonly filmStock: FilmStockStateReturn;
}

/** Grain engine state in the combined return */
interface GrainEngineReturn {
  readonly grainEngine: GrainEngineStateReturn;
}

/** Lens physics state in the combined return */
interface LensPhysicsReturn {
  readonly lensPhysics: LensPhysicsStateReturn;
}

/** Advanced lighting state in the combined return */
interface AdvancedLightingReturn {
  readonly advancedLighting: AdvancedLightingStateReturn;
}

/** Composition engine state in the combined return */
interface CompositionEngineReturn {
  readonly compositionEngine: CompositionEngineStateReturn;
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
    CharacterCreatorStateReturn,
    VisualStateReturn,
    CameraStateReturn,
    DirectorStateReturn,
    AdvancedStateReturn,
    UIStateReturn,
    ColorGradingReturn,
    OutputFormatReturn,
    FilmStockReturn,
    GrainEngineReturn,
    LensPhysicsReturn,
    AdvancedLightingReturn,
    CompositionEngineReturn,
    ActionsReturn {}
