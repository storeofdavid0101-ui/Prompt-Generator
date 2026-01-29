/**
 * Prompt generation utility
 * Builds AI-optimized prompts from user selections
 */

import type { AIModel, CharacterItem } from '../config/types';
import {
  modelConfigs,
  atmosphereConfigs,
  visualPresets,
  lightingOptions,
  colorPalettes,
  cameraOptions,
  shotOptions,
  dofOptions,
  aspectRatioOptions,
  cameraCategories,
  categoryConflicts,
  cameraFixedLens,
  cameraZoomRange,
  directorStyles,
} from '../config';

interface PromptBuilderParams {
  subject: string;
  characterItems: CharacterItem[];
  currentCharacter: string;
  location: string;
  selectedVisualPreset: string | null;
  selectedColorPalette: string | null;
  customColors: string[];
  selectedAtmosphere: string | null;
  selectedLighting: string | null;
  selectedDirector: string;
  selectedCamera: string;
  customCamera: string;
  selectedLens: string;
  customLens: string;
  selectedShot: string;
  customShot: string;
  depthOfField: string;
  aspectRatio: string;
  selectedModel: AIModel;
  negativePrompt: string;
  creativeControlsEnabled: boolean;
  creativity: number;
  variation: number;
  uniqueness: number;
}

interface SliderParams {
  creativity: string;
  variation: string;
  quality: string;
}

/**
 * Translates universal slider values to model-specific parameters
 */
function translateSliders(
  selectedModel: AIModel,
  creativity: number,
  variation: number,
  uniqueness: number
): SliderParams {
  const config = modelConfigs[selectedModel];

  switch (selectedModel) {
    case 'midjourney':
      return {
        creativity: `${config.creativityParam} ${Math.round(creativity * 10)}`,
        variation: `--chaos ${Math.round(variation)}`,
        quality: creativity > 70 ? '--q 2' : '',
      };
    case 'flux':
      return {
        creativity: `${config.creativityParam} ${(creativity / 5).toFixed(1)}`,
        variation: `${config.variationParam} ${variation}`,
        quality: '',
      };
    case 'stable-diffusion':
      return {
        creativity: `${config.creativityParam} ${((creativity / 100) * 30).toFixed(1)}`,
        variation: `${config.variationParam} ${variation}%`,
        quality: uniqueness > 50 ? 'Steps: 50' : 'Steps: 30',
      };
    case 'dalle3':
      return {
        creativity: creativity > 70 ? 'style: vivid' : 'style: natural',
        variation: uniqueness > 50 ? 'quality: hd' : 'quality: standard',
        quality: '',
      };
    case 'chatgpt':
      return {
        creativity: '',
        variation: '',
        quality: '',
      };
    case 'imagen':
      return {
        creativity: creativity > 70 ? 'high creativity' : 'balanced creativity',
        variation: `seed variation: ${variation}`,
        quality: uniqueness > 50 ? 'high quality' : 'standard quality',
      };
    case 'ideogram':
      return {
        creativity: `--style ${creativity > 70 ? 'artistic' : 'realistic'}`,
        variation: `--variation ${variation}`,
        quality: '',
      };
    case 'leonardo':
      return {
        creativity: `guidance_scale: ${((creativity / 100) * 20).toFixed(1)}`,
        variation: variation > 50 ? 'preset_style: dynamic' : 'preset_style: cinematic',
        quality: uniqueness > 50 ? 'high_resolution: true' : '',
      };
    case 'firefly':
      return {
        creativity: creativity > 70 ? 'style_strength: high' : 'style_strength: medium',
        variation: '',
        quality: uniqueness > 50 ? 'quality: high' : 'quality: standard',
      };
    default:
      return { creativity: '', variation: '', quality: '' };
  }
}

/**
 * Validates hex color code format
 */
function isValidHexColor(color: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(color.trim());
}

/**
 * Formats hex color code with # prefix
 */
function formatHexColor(color: string): string {
  return color.startsWith('#') ? color : `#${color}`;
}

/**
 * Builds a natural language prompt from components
 * Used for models that prefer descriptive sentences over comma-separated tags
 */
function buildNaturalPrompt(components: {
  subject: string;
  characters: string[];
  location: string;
  visualPreset: string | null;
  colorPalette: string | null;
  atmosphere: string | null;
  lighting: string | null;
  director: string | null;
  camera: string | null;
  lens: string | null;
  shot: string | null;
  dof: string | null;
}): string {
  const sentences: string[] = [];

  // Main subject sentence
  let mainSentence = '';
  if (components.subject) {
    mainSentence = components.subject;
  }

  // Add characters
  if (components.characters.length > 0) {
    if (mainSentence) {
      mainSentence += ` featuring ${components.characters.join(' and ')}`;
    } else {
      mainSentence = `A scene featuring ${components.characters.join(' and ')}`;
    }
  }

  // Add location
  if (components.location) {
    mainSentence += mainSentence ? `, set ${components.location}` : `Set ${components.location}`;
  }

  if (mainSentence) {
    sentences.push(mainSentence + '.');
  }

  // Visual style sentence
  const styleElements: string[] = [];
  if (components.atmosphere) {
    styleElements.push(components.atmosphere);
  }
  if (components.visualPreset) {
    styleElements.push(components.visualPreset);
  }
  if (styleElements.length > 0) {
    sentences.push(`The scene has ${styleElements.join(' with ')}.`);
  }

  // Lighting sentence
  if (components.lighting) {
    sentences.push(`Lit with ${components.lighting}.`);
  }

  // Color palette
  if (components.colorPalette) {
    sentences.push(`Using a color palette of ${components.colorPalette}.`);
  }

  // Camera and technical details sentence
  const techElements: string[] = [];
  if (components.camera) {
    techElements.push(`shot on ${components.camera}`);
  }
  if (components.lens) {
    techElements.push(`with a ${components.lens} lens`);
  }
  if (components.shot) {
    techElements.push(`framed as a ${components.shot}`);
  }
  if (components.dof) {
    techElements.push(`with ${components.dof}`);
  }
  if (techElements.length > 0) {
    sentences.push(techElements.join(', ') + '.');
  }

  // Director style
  if (components.director) {
    sentences.push(`In the style of ${components.director}.`);
  }

  return sentences.join(' ');
}

/**
 * Generates the final prompt from all user selections
 */
export function generatePrompt(params: PromptBuilderParams): string {
  const {
    subject,
    characterItems,
    currentCharacter,
    location,
    selectedVisualPreset,
    selectedColorPalette,
    customColors,
    selectedAtmosphere,
    selectedLighting,
    selectedDirector,
    selectedCamera,
    customCamera,
    selectedLens,
    customLens,
    selectedShot,
    customShot,
    depthOfField,
    aspectRatio,
    selectedModel,
    negativePrompt,
    creativeControlsEnabled,
    creativity,
    variation,
    uniqueness,
  } = params;

  const config = modelConfigs[selectedModel];
  const sliderParams = translateSliders(selectedModel, creativity, variation, uniqueness);

  // Gather all the component values
  const allCharacters = [
    ...characterItems.map((c) => c.content),
    ...(currentCharacter.trim() ? [currentCharacter.trim()] : []),
  ];

  // Get visual preset keywords
  const visualPresetKeywords =
    selectedVisualPreset && visualPresets[selectedVisualPreset]
      ? visualPresets[selectedVisualPreset].keywords
      : null;

  // Get color palette
  const validCustomColors = customColors.filter((c) => isValidHexColor(c));
  let colorPaletteValue: string | null = null;
  if (selectedColorPalette === 'custom' && validCustomColors.length > 0) {
    colorPaletteValue = validCustomColors.map(formatHexColor).join(', ');
  } else if (
    selectedColorPalette &&
    selectedColorPalette !== 'custom' &&
    colorPalettes[selectedColorPalette]
  ) {
    colorPaletteValue = colorPalettes[selectedColorPalette].colors.join(', ');
  }

  // Get atmosphere keywords
  const atmosphereKeywords =
    selectedAtmosphere && atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs]
      ? atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs].keywords
      : null;

  // Get lighting keywords
  const lightingKeywords =
    selectedLighting && lightingOptions[selectedLighting]
      ? lightingOptions[selectedLighting].keywords
      : null;

  // Get director style
  const directorConfig = directorStyles.find((d) => d.name === selectedDirector);
  const directorKeywords = directorConfig ? directorConfig.keywords : null;

  // Camera
  const cameraConfig = cameraOptions.find((c) => c.label === selectedCamera);
  const finalCamera = customCamera.trim() || (cameraConfig ? cameraConfig.keywords : '');

  // Check camera lens configuration
  const cameraCategory = selectedCamera ? cameraCategories[selectedCamera] || 'none' : 'none';
  const hasZoomRange = selectedCamera ? cameraZoomRange[selectedCamera] : null;
  const hasFixedLens =
    selectedCamera && !hasZoomRange
      ? cameraFixedLens[selectedCamera] || categoryConflicts[cameraCategory].fixedLens
      : null;

  // Include lens for zoom range cameras and interchangeable lens cameras
  const finalLens = hasFixedLens ? null : customLens.trim() || selectedLens;
  const shotConfig = shotOptions.find((s) => s.label === selectedShot);
  const finalShot = customShot.trim() || (shotConfig ? shotConfig.keywords : selectedShot);
  const dofConfig = dofOptions.find((d) => d.value === depthOfField);

  // Skip DOF for cameras that don't support it
  const categoryRules = categoryConflicts[cameraCategory];
  const finalDof =
    dofConfig && dofConfig.keywords && !categoryRules.blockedDOF.includes(depthOfField)
      ? dofConfig.keywords
      : null;

  // Build main prompt based on model's prompt style
  let prompt: string;

  if (config.promptStyle === 'natural') {
    // Natural language style for models like ChatGPT, DALL-E 3, Flux, etc.
    prompt = buildNaturalPrompt({
      subject: subject.trim(),
      characters: allCharacters,
      location: location.trim() ? `in ${location.trim()}` : '',
      visualPreset: visualPresetKeywords,
      colorPalette: colorPaletteValue,
      atmosphere: atmosphereKeywords,
      lighting: lightingKeywords,
      director: directorKeywords,
      camera: finalCamera || null,
      lens: finalLens || null,
      shot: finalShot || null,
      dof: finalDof,
    });
  } else {
    // Tags style (comma-separated) for Midjourney, Stable Diffusion, Ideogram
    const parts: string[] = [];

    // [Subject] - Always first
    if (subject.trim()) {
      parts.push(subject.trim());
    }

    // Characters
    if (allCharacters.length > 0) {
      parts.push(allCharacters.join(', '));
    }

    // Location
    if (location.trim()) {
      parts.push(`in ${location.trim()}`);
    }

    // Visual Presets
    if (visualPresetKeywords) {
      parts.push(visualPresetKeywords);
    }

    // Color Palette
    if (colorPaletteValue) {
      parts.push(`color palette: ${colorPaletteValue}`);
    }

    // Atmosphere
    if (atmosphereKeywords) {
      parts.push(atmosphereKeywords);
    }

    // Lighting
    if (lightingKeywords) {
      parts.push(lightingKeywords);
    }

    // Director Style
    if (directorKeywords) {
      parts.push(directorKeywords);
    }

    // Camera
    if (finalCamera) {
      parts.push(finalCamera);
    }
    if (finalLens) {
      parts.push(`${finalLens} lens`);
    }
    if (finalShot) {
      parts.push(finalShot);
    }

    // DOF
    if (finalDof) {
      parts.push(finalDof);
    }

    prompt = parts.filter(Boolean).join(', ');
  }

  // Add model-specific parameters
  const selectedRatio = aspectRatioOptions.find((r) => r.value === aspectRatio);

  if (selectedModel === 'midjourney') {
    const mjParams = [];
    if (aspectRatio !== 'none' && selectedRatio) {
      mjParams.push(`--ar ${selectedRatio.ratio}`);
    }
    if (creativeControlsEnabled) {
      if (sliderParams.creativity) mjParams.push(sliderParams.creativity);
      if (sliderParams.variation) mjParams.push(sliderParams.variation);
      if (sliderParams.quality) mjParams.push(sliderParams.quality);
    }
    if (negativePrompt.trim()) {
      mjParams.push(`${config.negativeParam} ${negativePrompt.trim()}`);
    }
    if (mjParams.length > 0) {
      prompt += ' ' + mjParams.join(' ');
    }
  } else if (selectedModel === 'stable-diffusion') {
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, ${selectedRatio.ratio} aspect ratio`;
    }
    if (negativePrompt.trim()) {
      prompt += `\n\n${config.negativeParam} ${negativePrompt.trim()}`;
    }
    if (creativeControlsEnabled) {
      prompt += `\n\n${sliderParams.creativity}, ${sliderParams.quality}`;
    }
  } else if (selectedModel === 'flux') {
    // Flux - natural language only, no negative prompts supported
    if (creativeControlsEnabled) {
      prompt += `\n\n[${sliderParams.creativity}, ${sliderParams.variation}]`;
    }
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `\n[aspect_ratio: ${selectedRatio.ratio}]`;
    }
    // Note: Flux does not support negative prompts - they are ignored
  } else if (selectedModel === 'dalle3') {
    // DALL-E 3 - natural language, negative prompts are counterproductive
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, ${selectedRatio.ratio} aspect ratio`;
    }
    // Note: DALL-E 3 tends to include what you exclude, so we skip negative prompts
  } else if (selectedModel === 'chatgpt') {
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, in ${selectedRatio.ratio} aspect ratio`;
    }
    if (negativePrompt.trim() && config.supportsNegativePrompt) {
      prompt += `, without ${negativePrompt.trim()}`;
    }
  } else if (selectedModel === 'imagen') {
    // Google Imagen 3 - natural language style
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `\n\n[aspect_ratio: ${selectedRatio.ratio}]`;
    }
    if (negativePrompt.trim() && config.supportsNegativePrompt) {
      prompt += `\n[negative_prompt: ${negativePrompt.trim()}]`;
    }
    if (creativeControlsEnabled) {
      prompt += `\n[${sliderParams.creativity}, ${sliderParams.quality}]`;
    }
  } else if (selectedModel === 'ideogram') {
    // Ideogram - tag-based style with parameters
    const ideoParams = [];
    if (aspectRatio !== 'none' && selectedRatio) {
      ideoParams.push(`--aspect ${selectedRatio.ratio}`);
    }
    if (negativePrompt.trim() && config.supportsNegativePrompt) {
      ideoParams.push(`--negative ${negativePrompt.trim()}`);
    }
    if (creativeControlsEnabled) {
      if (sliderParams.creativity) ideoParams.push(sliderParams.creativity);
      if (sliderParams.variation) ideoParams.push(sliderParams.variation);
    }
    if (ideoParams.length > 0) {
      prompt += ' ' + ideoParams.join(' ');
    }
  } else if (selectedModel === 'leonardo') {
    // Leonardo.ai - natural language with structured parameters
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `\n\n[dimensions: ${selectedRatio.ratio}]`;
    }
    if (negativePrompt.trim() && config.supportsNegativePrompt) {
      prompt += `\n[negative_prompt: ${negativePrompt.trim()}]`;
    }
    if (creativeControlsEnabled) {
      prompt += `\n[${sliderParams.creativity}, ${sliderParams.variation}]`;
    }
  } else if (selectedModel === 'firefly') {
    // Adobe Firefly - natural language, no negative prompts
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, ${selectedRatio.ratio} aspect ratio`;
    }
    if (creativeControlsEnabled) {
      prompt += `\n\n[${sliderParams.creativity}, ${sliderParams.quality}]`;
    }
  }

  return prompt || 'Start by adding a subject...';
}
