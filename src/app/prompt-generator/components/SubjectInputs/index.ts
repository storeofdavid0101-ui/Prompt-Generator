/**
 * SubjectInputs module exports
 * Barrel file for cleaner imports
 */

export { SubjectInputs } from './SubjectInputs';
export { LocationDropdown } from './LocationDropdown';
export { LocationPresetList } from './LocationPresetList';
export { CharacterInput } from './CharacterInput';
export { CharacterTag } from './CharacterTag';

// Re-export types for external use
export type {
  SubjectInputsProps,
  LocationDropdownProps,
  CharacterInputProps,
  CharacterTagProps,
} from './types';
