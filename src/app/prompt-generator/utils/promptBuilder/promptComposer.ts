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
 * @returns Natural language prompt string
 */
export function composeNaturalPrompt(components: ResolvedComponents): string {
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
 * Builds the main subject/character/location sentence.
 * Integrates character descriptions clearly with the subject.
 */
function buildMainSentence(components: ResolvedComponents): string {
  let sentence = '';

  // Build subject with character descriptions integrated
  if (components.subject && components.characters.length > 0) {
    // Combine subject with character descriptions
    const characterDescriptions = components.characters.join('; ');
    sentence = `${components.subject}. The character: ${characterDescriptions}`;
  } else if (components.subject) {
    sentence = components.subject;
  } else if (components.characters.length > 0) {
    // Only characters, no subject
    const characterDescriptions = components.characters.join('; ');
    sentence = `Character description: ${characterDescriptions}`;
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
    elements.push(`shot on ${components.camera}`);
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
