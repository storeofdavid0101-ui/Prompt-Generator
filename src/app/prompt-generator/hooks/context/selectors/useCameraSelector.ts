/**
 * Camera Selector Hook
 *
 * Provides access to camera-related state.
 * Use this for components managing camera settings.
 *
 * @module hooks/context/selectors/useCameraSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';

/**
 * Camera selector return type
 */
export interface CameraSelectorReturn {
  /** Selected camera type */
  readonly selectedCamera: string;
  /** Handle camera change with conflict clearing */
  readonly handleCameraChange: (camera: string) => void;
  /** Custom camera override */
  readonly customCamera: string;
  /** Update custom camera */
  readonly setCustomCamera: (value: string) => void;
  /** Selected lens focal length */
  readonly selectedLens: string;
  /** Update lens selection */
  readonly setSelectedLens: (value: string) => void;
  /** Custom lens override */
  readonly customLens: string;
  /** Update custom lens */
  readonly setCustomLens: (value: string) => void;
  /** Selected shot type */
  readonly selectedShot: string;
  /** Update shot type */
  readonly setSelectedShot: (value: string) => void;
  /** Custom shot override */
  readonly customShot: string;
  /** Update custom shot */
  readonly setCustomShot: (value: string) => void;
  /** Depth of field setting */
  readonly depthOfField: string;
  /** Update depth of field */
  readonly setDepthOfField: (value: string) => void;
  /** Aspect ratio setting */
  readonly aspectRatio: string;
  /** Update aspect ratio */
  readonly setAspectRatio: (value: string) => void;
}

/**
 * Hook to access only camera-related state
 *
 * @returns Camera state and handlers
 *
 * @example
 * ```tsx
 * function CameraSelect() {
 *   const { selectedCamera, handleCameraChange } = useCameraSelector();
 *   return <select value={selectedCamera} onChange={e => handleCameraChange(e.target.value)} />;
 * }
 * ```
 */
export function useCameraSelector(): CameraSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      selectedCamera: context.selectedCamera,
      handleCameraChange: context.handleCameraChange,
      customCamera: context.customCamera,
      setCustomCamera: context.setCustomCamera,
      selectedLens: context.selectedLens,
      setSelectedLens: context.setSelectedLens,
      customLens: context.customLens,
      setCustomLens: context.setCustomLens,
      selectedShot: context.selectedShot,
      setSelectedShot: context.setSelectedShot,
      customShot: context.customShot,
      setCustomShot: context.setCustomShot,
      depthOfField: context.depthOfField,
      setDepthOfField: context.setDepthOfField,
      aspectRatio: context.aspectRatio,
      setAspectRatio: context.setAspectRatio,
    }),
    [
      context.selectedCamera,
      context.handleCameraChange,
      context.customCamera,
      context.setCustomCamera,
      context.selectedLens,
      context.setSelectedLens,
      context.customLens,
      context.setCustomLens,
      context.selectedShot,
      context.setSelectedShot,
      context.customShot,
      context.setCustomShot,
      context.depthOfField,
      context.setDepthOfField,
      context.aspectRatio,
      context.setAspectRatio,
    ]
  );
}
