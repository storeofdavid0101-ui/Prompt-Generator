/**
 * @fileoverview Prompt composition strategies.
 * Provides functions for building prompts in natural language or tag-based formats.
 */

import type { ResolvedComponents } from './types';

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
 */
function buildMainSentence(components: ResolvedComponents): string {
  let sentence = '';

  if (components.subject) {
    sentence = components.subject;
  }

  if (components.characters.length > 0) {
    const characterList = components.characters.join(' and ');
    sentence = sentence
      ? `${sentence} featuring ${characterList}`
      : `A scene featuring ${characterList}`;
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
 *
 * @param components - Resolved prompt components
 * @returns Tag-based prompt string
 */
export function composeTagPrompt(components: ResolvedComponents): string {
  const parts: string[] = [];

  if (components.subject) {
    parts.push(components.subject);
  }

  if (components.characters.length > 0) {
    parts.push(components.characters.join(', '));
  }

  if (components.location) {
    parts.push(components.location);
  }

  if (components.visualPreset) {
    parts.push(components.visualPreset);
  }

  if (components.colorPalette) {
    parts.push(`color palette: ${components.colorPalette}`);
  }

  if (components.atmosphere) {
    parts.push(components.atmosphere);
  }

  if (components.lighting) {
    parts.push(components.lighting);
  }

  if (components.director) {
    parts.push(components.director);
  }

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
