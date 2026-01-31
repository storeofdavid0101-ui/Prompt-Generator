/**
 * SubjectInputs module exports
 * Barrel file for cleaner imports
 */

export { SubjectInputs } from './SubjectInputs';
export { LocationDropdown } from './LocationDropdown';
export { LocationPresetList } from './LocationPresetList';
export { CharacterInput } from './CharacterInput';
export { CharacterTag } from './CharacterTag';
export { GazeDirection } from './GazeDirection';
export { PoseAction } from './PoseAction';
export { CharacterPosition } from './CharacterPosition';

// Re-export types for external use
export type {
  SubjectInputsProps,
  LocationDropdownProps,
  CharacterInputProps,
  CharacterTagProps,
  MagicFieldState,
  MagicHandlers,
} from './types';
