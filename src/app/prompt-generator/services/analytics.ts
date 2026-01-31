/**
 * Analytics Service
 * Tracks prompt generation metrics using Google Analytics 4
 * View data in your GA4 dashboard under Events
 *
 * @module services/analytics
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Event data for prompt copy tracking
 */
export interface PromptCopyEventData {
  model: string;
  promptLength: number;
  hasDirector: boolean;
  director?: string;
  hasAtmosphere: boolean;
  aspectRatio?: string;
  creativeControlsEnabled: boolean;
}

/**
 * Send event to Google Analytics
 */
function sendGAEvent(eventName: string, params: Record<string, string | number | boolean>): void {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', eventName, params);
      console.log('[Analytics] Event sent:', eventName, params);
    } else {
      console.warn('[Analytics] gtag not available - GA script may not be loaded');
    }
  }
}

/**
 * Analytics tracking service using Google Analytics 4
 */
export const analytics = {
  /**
   * Track when a user copies a prompt
   * View in GA4: Reports > Engagement > Events > prompt_copied
   */
  trackPromptCopy(data: PromptCopyEventData): void {
    sendGAEvent('prompt_copied', {
      model: data.model,
      prompt_length: data.promptLength,
      has_director: data.hasDirector,
      director: data.director || 'none',
      has_atmosphere: data.hasAtmosphere,
      aspect_ratio: data.aspectRatio || 'default',
      creative_controls: data.creativeControlsEnabled,
    });
  },

  /**
   * Track reset action
   * View in GA4: Reports > Engagement > Events > prompt_reset
   */
  trackReset(): void {
    sendGAEvent('prompt_reset', {});
  },

  /**
   * Track model selection
   * View in GA4: Reports > Engagement > Events > model_selected
   */
  trackModelSelect(previousModel: string | undefined, newModel: string): void {
    sendGAEvent('model_selected', {
      previous_model: previousModel || 'none',
      new_model: newModel,
    });
  },

  /**
   * Track director selection
   * View in GA4: Reports > Engagement > Events > director_selected
   */
  trackDirectorSelect(director: string): void {
    sendGAEvent('director_selected', {
      director: director || 'none',
    });
  },

  /**
   * Track camera selection
   * View in GA4: Reports > Engagement > Events > camera_selected
   */
  trackCameraSelect(camera: string): void {
    sendGAEvent('camera_selected', {
      camera: camera || 'none',
    });
  },

  /**
   * Track lens selection
   * View in GA4: Reports > Engagement > Events > lens_selected
   */
  trackLensSelect(lens: string): void {
    sendGAEvent('lens_selected', {
      lens: lens || 'none',
    });
  },

  /**
   * Track shot type selection
   * View in GA4: Reports > Engagement > Events > shot_selected
   */
  trackShotSelect(shot: string): void {
    sendGAEvent('shot_selected', {
      shot: shot || 'none',
    });
  },

  /**
   * Track aspect ratio selection
   * View in GA4: Reports > Engagement > Events > aspect_ratio_selected
   */
  trackAspectRatioSelect(aspectRatio: string): void {
    sendGAEvent('aspect_ratio_selected', {
      aspect_ratio: aspectRatio || 'default',
    });
  },

  /**
   * Track atmosphere selection
   * View in GA4: Reports > Engagement > Events > atmosphere_selected
   */
  trackAtmosphereSelect(atmosphere: string): void {
    sendGAEvent('atmosphere_selected', {
      atmosphere: atmosphere || 'none',
    });
  },

  /**
   * Track visual preset selection
   * View in GA4: Reports > Engagement > Events > visual_preset_selected
   */
  trackVisualPresetSelect(preset: string): void {
    sendGAEvent('visual_preset_selected', {
      preset: preset || 'none',
    });
  },

  /**
   * Track lighting selection
   * View in GA4: Reports > Engagement > Events > lighting_selected
   */
  trackLightingSelect(lighting: string): void {
    sendGAEvent('lighting_selected', {
      lighting: lighting || 'none',
    });
  },

  /**
   * Track color palette selection
   * View in GA4: Reports > Engagement > Events > color_palette_selected
   */
  trackColorPaletteSelect(palette: string): void {
    sendGAEvent('color_palette_selected', {
      palette: palette || 'none',
    });
  },

  /**
   * Track theme toggle (dark/light mode)
   * View in GA4: Reports > Engagement > Events > theme_toggled
   */
  trackThemeToggle(darkMode: boolean): void {
    sendGAEvent('theme_toggled', {
      theme: darkMode ? 'dark' : 'light',
    });
  },

  /**
   * Track creative controls toggle
   * View in GA4: Reports > Engagement > Events > creative_controls_toggled
   */
  trackCreativeControlsToggle(enabled: boolean): void {
    sendGAEvent('creative_controls_toggled', {
      enabled,
    });
  },

  /**
   * Track depth of field selection
   * View in GA4: Reports > Engagement > Events > dof_selected
   */
  trackDOFSelect(dof: string): void {
    sendGAEvent('dof_selected', {
      depth_of_field: dof || 'none',
    });
  },

  /**
   * Track location preset selection
   * View in GA4: Reports > Engagement > Events > location_selected
   */
  trackLocationSelect(location: string): void {
    sendGAEvent('location_selected', {
      location: location || 'none',
    });
  },
};

export default analytics;
