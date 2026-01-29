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

  const parts: string[] = [];
  const config = modelConfigs[selectedModel];
  const sliderParams = translateSliders(selectedModel, creativity, variation, uniqueness);

  // [Subject] - Always first
  if (subject.trim()) {
    parts.push(subject.trim());
  }

  // Characters (include both saved items and current input)
  const allCharacters = [
    ...characterItems.map((c) => c.content),
    ...(currentCharacter.trim() ? [currentCharacter.trim()] : []),
  ];
  if (allCharacters.length > 0) {
    parts.push(allCharacters.join(', '));
  }

  // Location
  if (location.trim()) {
    parts.push(`in ${location.trim()}`);
  }

  // Visual Presets
  if (selectedVisualPreset && visualPresets[selectedVisualPreset]) {
    parts.push(visualPresets[selectedVisualPreset].keywords);
  }

  // Color Palette
  const validCustomColors = customColors.filter((c) => isValidHexColor(c));
  if (selectedColorPalette === 'custom' && validCustomColors.length > 0) {
    const formattedColors = validCustomColors.map(formatHexColor).join(', ');
    parts.push(`color palette: ${formattedColors}`);
  } else if (
    selectedColorPalette &&
    selectedColorPalette !== 'custom' &&
    colorPalettes[selectedColorPalette]
  ) {
    const palette = colorPalettes[selectedColorPalette].colors;
    parts.push(`color palette: ${palette.join(', ')}`);
  }

  // Atmosphere
  if (selectedAtmosphere && atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs]) {
    parts.push(atmosphereConfigs[selectedAtmosphere as keyof typeof atmosphereConfigs].keywords);
  }

  // Lighting
  if (selectedLighting && lightingOptions[selectedLighting]) {
    parts.push(lightingOptions[selectedLighting].keywords);
  }

  // Director Style
  const directorConfig = directorStyles.find((d) => d.name === selectedDirector);
  if (directorConfig) {
    parts.push(directorConfig.keywords);
  }

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

  if (finalCamera) {
    parts.push(finalCamera);
  }
  if (finalLens) {
    parts.push(`${finalLens} lens`);
  }
  if (finalShot) {
    parts.push(finalShot);
  }

  // Skip DOF for cameras that don't support it
  const categoryRules = categoryConflicts[cameraCategory];
  if (dofConfig && dofConfig.keywords && !categoryRules.blockedDOF.includes(depthOfField)) {
    parts.push(dofConfig.keywords);
  }

  // Build main prompt
  let prompt = parts.filter(Boolean).join(', ');

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
    if (creativeControlsEnabled) {
      prompt += `\n\n[${sliderParams.creativity}, ${sliderParams.variation}]`;
    }
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `\n[aspect_ratio: ${selectedRatio.ratio}]`;
    }
    if (negativePrompt.trim()) {
      prompt += `\n${config.negativeParam} ${negativePrompt.trim()}`;
    }
  } else if (selectedModel === 'dalle3') {
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, ${selectedRatio.ratio} aspect ratio`;
    }
    if (negativePrompt.trim()) {
      prompt += `, avoiding ${negativePrompt.trim()}`;
    }
  } else if (selectedModel === 'chatgpt') {
    if (aspectRatio !== 'none' && selectedRatio) {
      prompt += `, in ${selectedRatio.ratio} aspect ratio`;
    }
    if (negativePrompt.trim()) {
      prompt += `, without ${negativePrompt.trim()}`;
    }
  }

  return prompt || 'Start by adding a subject...';
}
