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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
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
};

export default analytics;
