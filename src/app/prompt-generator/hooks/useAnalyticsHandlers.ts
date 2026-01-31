/**
 * Analytics Handlers Hook
 * Wraps state handlers with analytics tracking to reduce boilerplate in components
 *
 * @module hooks/useAnalyticsHandlers
 */

'use client';

import { useCallback } from 'react';
import { analytics } from '../services';
import type { AIModel, Atmosphere, LockedSections } from '../config/types';

interface StateHandlers {
  // Model
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;

  // Content
  setGazeDirection: (gaze: string) => void;
  setPoseAction: (pose: string) => void;
  setCharacterPosition: (position: string) => void;
  setLocation: (location: string) => void;

  // Visual
  setSelectedAtmosphere: (atm: Atmosphere | null) => void;
  setSelectedVisualPreset: (preset: string | null) => void;
  setSelectedColorPalette: (palette: string | null) => void;
  setSelectedLighting: (lighting: string | null) => void;

  // Camera
  handleCameraChange: (camera: string) => void;
  setSelectedLens: (lens: string) => void;
  setCustomLens: (lens: string) => void;
  setSelectedShot: (shot: string) => void;
  setCustomShot: (shot: string) => void;
  setAspectRatio: (ratio: string) => void;
  setDepthOfField: (dof: string) => void;

  // Director
  handleDirectorChange: (director: string) => void;

  // Advanced
  creativeControlsEnabled: boolean;
  setCreativeControlsEnabled: (enabled: boolean) => void;
}

interface AnalyticsHandlersReturn {
  handleModelSelect: (model: AIModel) => void;
  handleDirectorChange: (director: string) => void;
  handleAtmosphereSelect: (atm: Atmosphere | null) => void;
  handleVisualPresetSelect: (preset: string | null) => void;
  handleColorPaletteSelect: (palette: string | null) => void;
  handleLightingSelect: (lighting: string | null) => void;
  handleLensChange: (lens: string) => void;
  handleShotChange: (shot: string) => void;
  handleAspectRatioChange: (ratio: string) => void;
  handleDepthOfFieldChange: (dof: string) => void;
  handleCameraChange: (camera: string) => void;
  handleCreativeControlsToggle: () => void;
  handleGazeChange: (gaze: string) => void;
  handlePoseChange: (pose: string) => void;
  handlePositionChange: (position: string) => void;
  handleLocationChange: (location: string) => void;
}

/**
 * Creates analytics-wrapped handlers for all state setters
 * Automatically tracks user interactions without cluttering components
 */
export function useAnalyticsHandlers(
  state: StateHandlers,
  lockedSections: LockedSections
): AnalyticsHandlersReturn {
  const handleModelSelect = useCallback(
    (model: AIModel) => {
      if (!lockedSections.model) {
        analytics.trackModelSelect(state.selectedModel, model);
        state.setSelectedModel(model);
      }
    },
    [lockedSections.model, state]
  );

  const handleDirectorChange = useCallback(
    (director: string) => {
      analytics.trackDirectorSelect(director);
      state.handleDirectorChange(director);
    },
    [state]
  );

  const handleAtmosphereSelect = useCallback(
    (atm: Atmosphere | null) => {
      if (!lockedSections.atmosphere) {
        analytics.trackAtmosphereSelect(atm || '');
        state.setSelectedAtmosphere(atm);
      }
    },
    [lockedSections.atmosphere, state]
  );

  const handleVisualPresetSelect = useCallback(
    (preset: string | null) => {
      if (!lockedSections.visual) {
        analytics.trackVisualPresetSelect(preset || '');
        state.setSelectedVisualPreset(preset);
      }
    },
    [lockedSections.visual, state]
  );

  const handleColorPaletteSelect = useCallback(
    (palette: string | null) => {
      if (!lockedSections.color) {
        analytics.trackColorPaletteSelect(palette || '');
        state.setSelectedColorPalette(palette);
      }
    },
    [lockedSections.color, state]
  );

  const handleLightingSelect = useCallback(
    (lighting: string | null) => {
      if (!lockedSections.lighting) {
        analytics.trackLightingSelect(lighting || '');
        state.setSelectedLighting(lighting);
      }
    },
    [lockedSections.lighting, state]
  );

  const handleLensChange = useCallback(
    (lens: string) => {
      if (!lockedSections.camera) {
        analytics.trackLensSelect(lens);
        state.setSelectedLens(lens);
        state.setCustomLens('');
      }
    },
    [lockedSections.camera, state]
  );

  const handleShotChange = useCallback(
    (shot: string) => {
      if (!lockedSections.camera) {
        analytics.trackShotSelect(shot);
        state.setSelectedShot(shot);
        state.setCustomShot('');
      }
    },
    [lockedSections.camera, state]
  );

  const handleAspectRatioChange = useCallback(
    (ratio: string) => {
      if (!lockedSections.camera) {
        analytics.trackAspectRatioSelect(ratio);
        state.setAspectRatio(ratio);
      }
    },
    [lockedSections.camera, state]
  );

  const handleDepthOfFieldChange = useCallback(
    (dof: string) => {
      if (!lockedSections.advanced) {
        analytics.trackDOFSelect(dof);
        state.setDepthOfField(dof);
      }
    },
    [lockedSections.advanced, state]
  );

  const handleCameraChange = useCallback(
    (camera: string) => {
      analytics.trackCameraSelect(camera);
      state.handleCameraChange(camera);
    },
    [state]
  );

  const handleCreativeControlsToggle = useCallback(() => {
    if (!lockedSections.advanced) {
      analytics.trackCreativeControlsToggle(!state.creativeControlsEnabled);
      state.setCreativeControlsEnabled(!state.creativeControlsEnabled);
    }
  }, [lockedSections.advanced, state]);

  const handleGazeChange = useCallback(
    (gaze: string) => {
      if (!lockedSections.gaze) {
        analytics.trackGazeSelect(gaze);
        state.setGazeDirection(gaze);
      }
    },
    [lockedSections.gaze, state]
  );

  const handlePoseChange = useCallback(
    (pose: string) => {
      if (!lockedSections.pose) {
        analytics.trackPoseSelect(pose);
        state.setPoseAction(pose);
      }
    },
    [lockedSections.pose, state]
  );

  const handlePositionChange = useCallback(
    (position: string) => {
      if (!lockedSections.position) {
        analytics.trackPositionSelect(position);
        state.setCharacterPosition(position);
      }
    },
    [lockedSections.position, state]
  );

  const handleLocationChange = useCallback(
    (location: string) => {
      if (!lockedSections.location) {
        analytics.trackLocationSelect(location);
        state.setLocation(location);
      }
    },
    [lockedSections.location, state]
  );

  return {
    handleModelSelect,
    handleDirectorChange,
    handleAtmosphereSelect,
    handleVisualPresetSelect,
    handleColorPaletteSelect,
    handleLightingSelect,
    handleLensChange,
    handleShotChange,
    handleAspectRatioChange,
    handleDepthOfFieldChange,
    handleCameraChange,
    handleCreativeControlsToggle,
    handleGazeChange,
    handlePoseChange,
    handlePositionChange,
    handleLocationChange,
  };
}
