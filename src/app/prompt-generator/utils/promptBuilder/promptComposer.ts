/**
 * @fileoverview Prompt composition strategies.
 * Provides functions for building prompts in natural language or tag-based formats.
 */

import type { ResolvedComponents } from './types';

/**
 * Deduplicates keywords across multiple comma-separated keyword strings.
 * Removes exact duplicates and near-duplicates (e.g., "golden hour" vs "golden hour lighting").
 *
 * @param keywordStrings - Array of comma-separated keyword strings
 * @returns Deduplicated comma-separated keyword string
 */
function deduplicateKeywords(keywordStrings: (string | null | undefined)[]): string {
  const seen = new Map<string, string>(); // normalized -> original

  for (const str of keywordStrings) {
    if (!str) continue;

    const keywords = str.split(',').map((k) => k.trim()).filter(Boolean);

    for (const keyword of keywords) {
      const normalized = keyword.toLowerCase().replace(/\s+/g, ' ');

      // Check if this keyword or a similar one already exists
      let shouldAdd = true;
      let keyToRemove: string | null = null;

      for (const [existingNorm, _existingOrig] of seen.entries()) {
        if (existingNorm === normalized) {
          // Exact duplicate - skip
          shouldAdd = false;
          break;
        }
        // Check if one contains the other
        if (existingNorm.includes(normalized)) {
          // Existing is more specific - skip new one
          shouldAdd = false;
          break;
        }
        if (normalized.includes(existingNorm)) {
          // New one is more specific - remove old, add new
          keyToRemove = existingNorm;
          break;
        }
      }

      if (keyToRemove) {
        seen.delete(keyToRemove);
      }

      if (shouldAdd) {
        seen.set(normalized, keyword);
      }
    }
  }

  return Array.from(seen.values()).join(', ');
}

/**
 * Builds a natural language prompt from resolved components.
 * Creates flowing, descriptive sentences suitable for models like
 * ChatGPT, DALL-E 3, Flux, and others that prefer prose.
 *
 * @param components - Resolved prompt components
 * @param useSafeMode - Whether to use safe mode for strict content policy models (ChatGPT, DALL-E)
 * @returns Natural language prompt string
 */
export function composeNaturalPrompt(components: ResolvedComponents, useSafeMode: boolean = false): string {
  // For safe mode (ChatGPT/DALL-E), use simplified structure to avoid trigger phrases
  if (useSafeMode) {
    return composeSafePrompt(components);
  }

  const sentences: string[] = [];

  const mainSentence = buildMainSentence(components);
  if (mainSentence) {
    sentences.push(mainSentence);
  }

  const styleSentence = buildStyleSentence(components);
  if (styleSentence) {
    sentences.push(styleSentence);
  }

  if (components.lighting) {
    sentences.push(`Lit with ${components.lighting}.`);
  }

  if (components.colorPalette) {
    sentences.push(`Using a color palette of ${components.colorPalette}.`);
  }

  const technicalSentence = buildTechnicalSentence(components);
  if (technicalSentence) {
    sentences.push(technicalSentence);
  }

  if (components.director) {
    sentences.push(`In the style of ${components.director}.`);
  }

  return sentences.join(' ');
}

/**
 * Builds a safe prompt for models with strict content policies (ChatGPT, DALL-E).
 * Avoids "In the style of" phrasing and uses simpler structure.
 * Keywords are integrated naturally without attribution patterns.
 *
 * @param components - Resolved prompt components
 * @returns Safe natural language prompt string
 */
function composeSafePrompt(components: ResolvedComponents): string {
  const parts: string[] = [];

  // Subject first
  if (components.subject) {
    parts.push(stripTrailingPunctuation(components.subject));
  }

  // Character descriptions integrated
  if (components.characters.length > 0) {
    parts.push(components.characters.join(', '));
  }

  // Gaze and pose - simpler integration
  if (components.gaze) {
    parts.push(components.gaze);
  }

  if (components.pose) {
    parts.push(components.pose);
  }

  if (components.position) {
    parts.push(components.position);
  }

  // Location
  if (components.location) {
    parts.push(`set ${components.location}`);
  }

  // Visual style - deduplicate and combine naturally
  const styleKeywords = deduplicateKeywords([
    components.atmosphere,
    components.visualPreset,
    components.director, // Director keywords without "In the style of"
  ]);
  if (styleKeywords) {
    parts.push(styleKeywords);
  }

  // Lighting - simpler phrasing
  if (components.lighting) {
    parts.push(components.lighting);
  }

  // Color palette
  if (components.colorPalette) {
    parts.push(`Color palette: ${components.colorPalette}`);
  }

  // Camera/technical
  if (components.camera) {
    parts.push(components.camera);
  }

  if (components.lens) {
    parts.push(`${components.lens} lens`);
  }

  if (components.shot) {
    parts.push(components.shot);
  }

  if (components.dof) {
    parts.push(components.dof);
  }

  return parts.filter(Boolean).join('. ');
}

/**
 * Strips trailing punctuation from a string.
 */
function stripTrailingPunctuation(str: string): string {
  return str.replace(/[.!?,;:]+$/, '').trim();
}

/**
 * Builds the main subject/character/location sentence.
 * Integrates character descriptions and gaze direction clearly with the subject.
 */
function buildMainSentence(components: ResolvedComponents): string {
  let sentence = '';

  // Build subject with character descriptions integrated
  if (components.subject && components.characters.length > 0) {
    // Combine subject with character descriptions (strip trailing punctuation to avoid doubles)
    const cleanSubject = stripTrailingPunctuation(components.subject);
    const characterDescriptions = components.characters.join('; ');
    sentence = `${cleanSubject}. The character: ${characterDescriptions}`;
  } else if (components.subject) {
    sentence = stripTrailingPunctuation(components.subject);
  } else if (components.characters.length > 0) {
    // Only characters, no subject
    const characterDescriptions = components.characters.join('; ');
    sentence = `Character description: ${characterDescriptions}`;
  }

  // Add gaze direction if specified
  if (components.gaze) {
    sentence = sentence
      ? `${sentence}, ${components.gaze}`
      : components.gaze;
  }

  // Add pose/action if specified
  if (components.pose) {
    sentence = sentence
      ? `${sentence}, ${components.pose}`
      : components.pose;
  }

  // Add position in frame if specified
  if (components.position) {
    sentence = sentence
      ? `${sentence}, ${components.position}`
      : components.position;
  }

  if (components.location) {
    sentence = sentence
      ? `${sentence}, set ${components.location}`
      : `Set ${components.location}`;
  }

  return sentence ? `${sentence}.` : '';
}

/**
 * Builds the visual style sentence combining atmosphere and preset.
 */
function buildStyleSentence(components: ResolvedComponents): string {
  const elements: string[] = [];

  if (components.atmosphere) {
    elements.push(components.atmosphere);
  }

  if (components.visualPreset) {
    elements.push(components.visualPreset);
  }

  if (elements.length === 0) {
    return '';
  }

  return `The scene has ${elements.join(' with ')}.`;
}

/**
 * Builds the technical camera/lens/shot sentence.
 */
function buildTechnicalSentence(components: ResolvedComponents): string {
  const elements: string[] = [];

  if (components.camera) {
    // Avoid duplicate "shot on" - some camera keywords already include it
    const cameraLower = components.camera.toLowerCase();
    if (cameraLower.startsWith('shot on ') || cameraLower.startsWith('recorded on ')) {
      elements.push(components.camera);
    } else {
      elements.push(`shot on ${components.camera}`);
    }
  }

  if (components.lens) {
    elements.push(`with a ${components.lens} lens`);
  }

  if (components.shot) {
    elements.push(`framed as a ${components.shot}`);
  }

  if (components.dof) {
    elements.push(`with ${components.dof}`);
  }

  if (elements.length === 0) {
    return '';
  }

  return `${elements.join(', ')}.`;
}

/**
 * Builds a tag-based prompt from resolved components.
 * Creates comma-separated keywords suitable for models like
 * Midjourney, Stable Diffusion, and Ideogram.
 * Deduplicates overlapping keywords between director, lighting, and atmosphere.
 *
 * @param components - Resolved prompt components
 * @returns Tag-based prompt string
 */
export function composeTagPrompt(components: ResolvedComponents): string {
  const parts: string[] = [];

  // Subject and character descriptions - integrate clearly
  if (components.subject && components.characters.length > 0) {
    // Subject with explicit character description
    parts.push(components.subject);
    parts.push(`[character: ${components.characters.join(', ')}]`);
  } else if (components.subject) {
    parts.push(components.subject);
  } else if (components.characters.length > 0) {
    // Only characters
    parts.push(`[character: ${components.characters.join(', ')}]`);
  }

  // Add gaze direction if specified
  if (components.gaze) {
    parts.push(components.gaze);
  }

  // Add pose/action if specified
  if (components.pose) {
    parts.push(components.pose);
  }

  // Add position in frame if specified
  if (components.position) {
    parts.push(components.position);
  }

  if (components.location) {
    parts.push(components.location);
  }

  // Keyword-based parts - deduplicate across all of them
  const keywordParts = deduplicateKeywords([
    components.visualPreset,
    components.atmosphere,
    components.lighting,
    components.director,
  ]);

  if (keywordParts) {
    parts.push(keywordParts);
  }

  if (components.colorPalette) {
    parts.push(`color palette: ${components.colorPalette}`);
  }

  // Technical parts - add as-is
  if (components.camera) {
    parts.push(components.camera);
  }

  if (components.lens) {
    parts.push(`${components.lens} lens`);
  }

  if (components.shot) {
    parts.push(components.shot);
  }

  if (components.dof) {
    parts.push(components.dof);
  }

  return parts.filter(Boolean).join(', ');
}
