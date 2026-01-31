/**
 * @fileoverview Prompt composition strategies.
 * Provides functions for building prompts in natural language or tag-based formats.
 * Supports three output modes: prose, machine, and hybrid.
 */

import type { ResolvedComponents } from './types';
import type { OutputMode } from '../../config/types/outputFormat';

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

  if (components.colorGrading) {
    sentences.push(`Color grading: ${components.colorGrading}.`);
  }

  if (components.filmStock) {
    sentences.push(`Shot on ${components.filmStock}.`);
  }

  if (components.grainEngine) {
    sentences.push(`Film grain: ${components.grainEngine}.`);
  }

  if (components.lensPhysics) {
    sentences.push(`Lens: ${components.lensPhysics}.`);
  }

  if (components.advancedLighting) {
    sentences.push(`Lighting: ${components.advancedLighting}.`);
  }

  if (components.compositionEngine) {
    sentences.push(`Composition: ${components.compositionEngine}.`);
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

  // Character creator (face features, species, clothing)
  if (components.characterCreator) {
    parts.push(components.characterCreator);
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

  // Color grading
  if (components.colorGrading) {
    parts.push(components.colorGrading);
  }

  // Film stock
  if (components.filmStock) {
    parts.push(components.filmStock);
  }

  // Grain engine
  if (components.grainEngine) {
    parts.push(components.grainEngine);
  }

  // Lens physics
  if (components.lensPhysics) {
    parts.push(components.lensPhysics);
  }

  // Advanced lighting
  if (components.advancedLighting) {
    parts.push(components.advancedLighting);
  }

  // Composition engine
  if (components.compositionEngine) {
    parts.push(components.compositionEngine);
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

  // Add character creator description (face features, species, clothing)
  if (components.characterCreator) {
    sentence = sentence
      ? `${sentence}, ${components.characterCreator}`
      : components.characterCreator;
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

  // Character creator (face features, species, clothing)
  if (components.characterCreator) {
    parts.push(components.characterCreator);
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

  // Color grading - add after color palette
  if (components.colorGrading) {
    parts.push(components.colorGrading);
  }

  // Film stock
  if (components.filmStock) {
    parts.push(components.filmStock);
  }

  // Grain engine
  if (components.grainEngine) {
    parts.push(components.grainEngine);
  }

  // Lens physics
  if (components.lensPhysics) {
    parts.push(components.lensPhysics);
  }

  // Advanced lighting
  if (components.advancedLighting) {
    parts.push(components.advancedLighting);
  }

  // Composition engine
  if (components.compositionEngine) {
    parts.push(components.compositionEngine);
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

/**
 * Builds a machine-readable prompt from resolved components.
 * Creates structured sections with labels for parsing by AI models.
 * Format inspired by professional "machine-to-machine" prompts.
 *
 * @param components - Resolved prompt components
 * @returns Machine-readable structured prompt string
 */
export function composeMachinePrompt(components: ResolvedComponents): string {
  const sections: string[] = [];

  // Subject section
  if (components.subject || components.characters.length > 0) {
    const subjectParts: string[] = [];
    if (components.subject) {
      subjectParts.push(`subject: ${stripTrailingPunctuation(components.subject)}`);
    }
    if (components.characters.length > 0) {
      subjectParts.push(`characters: ${components.characters.join('; ')}`);
    }
    if (components.characterCreator) {
      subjectParts.push(`character_details: ${components.characterCreator}`);
    }
    if (components.gaze) {
      subjectParts.push(`gaze: ${components.gaze}`);
    }
    if (components.pose) {
      subjectParts.push(`pose: ${components.pose}`);
    }
    if (components.position) {
      subjectParts.push(`position: ${components.position}`);
    }
    if (components.location) {
      subjectParts.push(`location: ${components.location}`);
    }
    sections.push(`[SUBJECT_DATA]\n${subjectParts.join('\n')}`);
  }

  // Visual style section
  const styleParts: string[] = [];
  if (components.atmosphere) {
    styleParts.push(`atmosphere: ${components.atmosphere}`);
  }
  if (components.visualPreset) {
    styleParts.push(`visual_preset: ${components.visualPreset}`);
  }
  if (components.director) {
    styleParts.push(`director_style: ${components.director}`);
  }
  if (styleParts.length > 0) {
    sections.push(`[STYLE_DATA]\n${styleParts.join('\n')}`);
  }

  // Lighting section
  if (components.lighting) {
    sections.push(`[LIGHTING]\nlighting: ${components.lighting}`);
  }

  // Color section
  const colorParts: string[] = [];
  if (components.colorPalette) {
    colorParts.push(`palette: ${components.colorPalette}`);
  }
  if (components.colorGrading) {
    colorParts.push(`grading: ${components.colorGrading}`);
  }
  if (colorParts.length > 0) {
    sections.push(`[COLOR_DATA]\n${colorParts.join('\n')}`);
  }

  // Film stock section
  if (components.filmStock) {
    sections.push(`[FILM_STOCK]\nstock: ${components.filmStock}`);
  }

  // Grain engine section
  if (components.grainEngine) {
    sections.push(`[GRAIN]\ngrain: ${components.grainEngine}`);
  }

  // Lens physics section
  if (components.lensPhysics) {
    sections.push(`[LENS]\nlens_physics: ${components.lensPhysics}`);
  }

  // Advanced lighting section
  if (components.advancedLighting) {
    sections.push(`[ADVANCED_LIGHTING]\nlighting: ${components.advancedLighting}`);
  }

  // Composition section
  if (components.compositionEngine) {
    sections.push(`[COMPOSITION]\ncomposition: ${components.compositionEngine}`);
  }

  // Technical/camera section
  const techParts: string[] = [];
  if (components.camera) {
    techParts.push(`camera: ${components.camera}`);
  }
  if (components.lens) {
    techParts.push(`lens: ${components.lens}`);
  }
  if (components.shot) {
    techParts.push(`shot: ${components.shot}`);
  }
  if (components.dof) {
    techParts.push(`dof: ${components.dof}`);
  }
  if (techParts.length > 0) {
    sections.push(`[TECHNICAL_DATA]\n${techParts.join('\n')}`);
  }

  return sections.join('\n\n');
}

/**
 * Builds a hybrid prompt combining natural language and machine-readable sections.
 * Best of both worlds: flowing prose for creative interpretation,
 * structured data for precise technical control.
 *
 * @param components - Resolved prompt components
 * @param useSafeMode - Whether to use safe mode for strict content policy models
 * @returns Hybrid prompt with prose and technical sections
 */
export function composeHybridPrompt(components: ResolvedComponents, useSafeMode: boolean = false): string {
  // First, compose the prose part
  const prose = useSafeMode
    ? composeSafePrompt(components)
    : composeNaturalPrompt(components, false);

  // Then build technical metadata section
  const techParts: string[] = [];

  // Only include non-empty technical data
  if (components.camera) {
    techParts.push(`camera: ${components.camera}`);
  }
  if (components.lens) {
    techParts.push(`lens: ${components.lens}`);
  }
  if (components.shot) {
    techParts.push(`shot: ${components.shot}`);
  }
  if (components.dof) {
    techParts.push(`dof: ${components.dof}`);
  }
  if (components.lighting) {
    techParts.push(`lighting: ${components.lighting}`);
  }
  if (components.colorGrading) {
    techParts.push(`color_grading: ${components.colorGrading}`);
  }
  if (components.filmStock) {
    techParts.push(`film_stock: ${components.filmStock}`);
  }
  if (components.grainEngine) {
    techParts.push(`grain: ${components.grainEngine}`);
  }
  if (components.lensPhysics) {
    techParts.push(`lens_physics: ${components.lensPhysics}`);
  }
  if (components.advancedLighting) {
    techParts.push(`advanced_lighting: ${components.advancedLighting}`);
  }
  if (components.compositionEngine) {
    techParts.push(`composition: ${components.compositionEngine}`);
  }

  // If no technical data, just return prose
  if (techParts.length === 0) {
    return prose;
  }

  // Combine prose with technical section
  return `${prose}\n\n[TECHNICAL_DATA]\n${techParts.join('\n')}`;
}

/**
 * Main composition function that routes to the appropriate composer based on output mode.
 *
 * @param components - Resolved prompt components
 * @param mode - Output mode (prose, machine, or hybrid)
 * @param useSafeMode - Whether to use safe mode for strict content policy models
 * @returns Composed prompt string in the specified format
 */
export function composePrompt(
  components: ResolvedComponents,
  mode: OutputMode,
  useSafeMode: boolean = false
): string {
  switch (mode) {
    case 'machine':
      return composeMachinePrompt(components);
    case 'hybrid':
      return composeHybridPrompt(components, useSafeMode);
    case 'prose':
    default:
      return composeNaturalPrompt(components, useSafeMode);
  }
}
