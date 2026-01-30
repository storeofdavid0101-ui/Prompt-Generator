/**
 * CameraSettings Module Exports
 *
 * Barrel export file for the CameraSettings feature module.
 * Re-exports the main component and types for external consumption.
 *
 * @module CameraSettings
 */

// Main component
export { CameraSettings } from './CameraSettings';

// Types (for consumers who need to work with props)
export type { CameraSettingsProps } from './types';

// Sub-components (exported for potential reuse or testing)
export { CameraTypeSelector } from './CameraTypeSelector';
export { LensSelector } from './LensSelector';
export { ShotTypeSelector } from './ShotTypeSelector';
export { AspectRatioSelector } from './AspectRatioSelector';

// Reusable components (exported for use in other camera-related features)
export {
  StyledSelect,
  StyledInput,
  InfoBanner,
  SelectWithCustomInput,
} from './components';
