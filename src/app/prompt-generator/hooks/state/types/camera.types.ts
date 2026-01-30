/**
 * Camera State Type Definitions
 *
 * Types for camera settings: camera type, lens, shot, DOF, aspect ratio.
 *
 * @module hooks/state/types/camera
 */

import type { Setter, ResetAction, ConflictHandlerParams } from './common.types';

/**
 * Camera state interface
 *
 * Manages all camera-related settings including camera type,
 * lens, shot type, depth of field, and aspect ratio.
 */
export interface CameraState {
  /** Selected camera type (empty string = none) */
  readonly selectedCamera: string;

  /** Custom camera override text */
  readonly customCamera: string;

  /** Selected lens focal length */
  readonly selectedLens: string;

  /** Custom lens override text */
  readonly customLens: string;

  /** Selected shot type (e.g., "Medium Shot") */
  readonly selectedShot: string;

  /** Custom shot type override text */
  readonly customShot: string;

  /** Depth of field setting */
  readonly depthOfField: string;

  /** Aspect ratio setting */
  readonly aspectRatio: string;

  /** Update camera with automatic conflict clearing */
  readonly setCamera: Setter<string>;

  /** Update custom camera text */
  readonly setCustomCamera: Setter<string>;

  /** Update lens selection */
  readonly setSelectedLens: Setter<string>;

  /** Update custom lens text */
  readonly setCustomLens: Setter<string>;

  /** Update shot type selection */
  readonly setSelectedShot: Setter<string>;

  /** Update custom shot text */
  readonly setCustomShot: Setter<string>;

  /** Update depth of field setting */
  readonly setDepthOfField: Setter<string>;

  /** Update aspect ratio setting */
  readonly setAspectRatio: Setter<string>;

  /** Reset all camera settings to defaults */
  readonly reset: ResetAction;
}

/**
 * Parameters for camera state hook initialization
 *
 * Extends ConflictHandlerParams for consistency with director hook.
 */
export interface UseCameraStateParams extends ConflictHandlerParams {}
