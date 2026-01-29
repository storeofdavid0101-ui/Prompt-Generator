/**
 * Prompt Generator state management hook
 * Centralizes all state and handlers for the prompt generator
 */

import { useState, useCallback, useMemo } from 'react';
import { useTheme } from './useTheme';
import { useConflicts } from './useConflicts';
import { generatePrompt } from '../utils';
import {
  cameraCategories,
  categoryConflicts,
  cameraAspectRatios,
  directorStyles,
} from '../config';
import type {
  AIModel,
  Atmosphere,
  CharacterItem,
  ExpandedSections,
} from '../config/types';

const DEFAULT_EXPANDED_SECTIONS: ExpandedSections = {
  model: true,
  sliders: true,
  atmosphere: true,
  visual: false,
  color: false,
  camera: false,
  lighting: false,
};

export function usePromptGeneratorState() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const themeColors = useTheme(darkMode);

  // Model Selection
  const [selectedModel, setSelectedModel] = useState<AIModel>('midjourney');

  // Creative Controls
  const [creativity, setCreativity] = useState(50);
  const [variation, setVariation] = useState(50);
  const [uniqueness, setUniqueness] = useState(50);

  // Core Content
  const [subject, setSubject] = useState('');
  const [characterItems, setCharacterItems] = useState<CharacterItem[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [location, setLocation] = useState('');

  // Visual Presets
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<Atmosphere | null>(null);
  const [selectedVisualPreset, setSelectedVisualPreset] = useState<string | null>(null);
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [selectedColorPalette, setSelectedColorPalette] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState<string[]>(['', '', '', '', '', '']);

  // Camera Settings
  const [selectedCamera, setSelectedCamera] = useState('');
  const [customCamera, setCustomCamera] = useState('');
  const [selectedLens, setSelectedLens] = useState('50mm');
  const [customLens, setCustomLens] = useState('');
  const [selectedShot, setSelectedShot] = useState('Medium Shot (MS)');
  const [customShot, setCustomShot] = useState('');
  const [depthOfField, setDepthOfField] = useState('normal');
  const [aspectRatio, setAspectRatio] = useState('none');

  // Advanced
  const [negativePrompt, setNegativePrompt] = useState('');
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [creativeControlsEnabled, setCreativeControlsEnabled] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState('');

  // UI State
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    DEFAULT_EXPANDED_SECTIONS
  );

  // Conflict Detection
  const conflicts = useConflicts({
    selectedCamera,
    selectedAtmosphere,
    selectedVisualPreset,
    depthOfField,
    selectedDirector,
  });

  // Section Toggle
  const toggleSection = useCallback((key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key as keyof ExpandedSections],
    }));
  }, []);

  // Camera change handler with auto-clear
  const handleCameraChange = useCallback(
    (newCamera: string) => {
      if (settingsLocked) return;

      setSelectedCamera(newCamera);
      setCustomCamera('');

      const category = cameraCategories[newCamera] || 'none';
      const rules = categoryConflicts[category];

      if (selectedAtmosphere && rules.blockedAtmospheres.includes(selectedAtmosphere)) {
        setSelectedAtmosphere(null);
      }
      if (selectedVisualPreset && rules.blockedPresets.includes(selectedVisualPreset)) {
        setSelectedVisualPreset(null);
      }
      if (rules.blockedDOF.includes(depthOfField)) {
        setDepthOfField('normal');
      }
      const allowedRatios = cameraAspectRatios[newCamera];
      if (allowedRatios && aspectRatio !== 'none' && !allowedRatios.includes(aspectRatio)) {
        setAspectRatio('none');
      }
    },
    [settingsLocked, selectedAtmosphere, selectedVisualPreset, depthOfField, aspectRatio]
  );

  // Director change handler with auto-clear
  const handleDirectorChange = useCallback(
    (newDirector: string) => {
      if (settingsLocked) return;

      setSelectedDirector(newDirector);

      const directorConfig = directorStyles.find((d) => d.name === newDirector);
      if (directorConfig) {
        if (selectedAtmosphere && directorConfig.blockedAtmospheres.includes(selectedAtmosphere)) {
          setSelectedAtmosphere(null);
        }
        if (selectedVisualPreset && directorConfig.blockedPresets.includes(selectedVisualPreset)) {
          setSelectedVisualPreset(null);
        }
      }
    },
    [settingsLocked, selectedAtmosphere, selectedVisualPreset]
  );

  // Character Management
  const addCharacter = useCallback(() => {
    if (currentCharacter.trim() && !settingsLocked) {
      setCharacterItems((prev) => [
        ...prev,
        { id: crypto.randomUUID().slice(0, 9), content: currentCharacter.trim() },
      ]);
      setCurrentCharacter('');
    }
  }, [currentCharacter, settingsLocked]);

  const removeCharacter = useCallback(
    (id: string) => {
      if (!settingsLocked) {
        setCharacterItems((prev) => prev.filter((item) => item.id !== id));
      }
    },
    [settingsLocked]
  );

  // Generate Prompt
  const prompt = useMemo(
    () =>
      generatePrompt({
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
      }),
    [
      subject, characterItems, currentCharacter, location, selectedVisualPreset,
      selectedColorPalette, customColors, selectedAtmosphere, selectedLighting,
      selectedDirector, selectedCamera, customCamera, selectedLens, customLens,
      selectedShot, customShot, depthOfField, aspectRatio, selectedModel,
      negativePrompt, creativeControlsEnabled, creativity, variation, uniqueness,
    ]
  );

  // Copy to Clipboard
  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  // Reset All
  const resetAll = useCallback(() => {
    if (settingsLocked) return;
    setSubject('');
    setCharacterItems([]);
    setCurrentCharacter('');
    setLocation('');
    setSelectedAtmosphere(null);
    setSelectedVisualPreset(null);
    setSelectedLighting(null);
    setSelectedColorPalette(null);
    setCustomColors(['', '', '', '', '', '']);
    setSelectedCamera('');
    setCustomCamera('');
    setSelectedLens('50mm');
    setCustomLens('');
    setSelectedShot('Medium Shot (MS)');
    setCustomShot('');
    setDepthOfField('normal');
    setAspectRatio('none');
    setNegativePrompt('');
    setSelectedDirector('');
    setCreativity(50);
    setVariation(50);
    setUniqueness(50);
  }, [settingsLocked]);

  return {
    // Theme
    darkMode,
    setDarkMode,
    copied,
    themeColors,

    // Model
    selectedModel,
    setSelectedModel,

    // Creative Controls
    creativity,
    setCreativity,
    variation,
    setVariation,
    uniqueness,
    setUniqueness,
    creativeControlsEnabled,
    setCreativeControlsEnabled,

    // Content
    subject,
    setSubject,
    characterItems,
    currentCharacter,
    setCurrentCharacter,
    location,
    setLocation,
    addCharacter,
    removeCharacter,

    // Visual
    selectedAtmosphere,
    setSelectedAtmosphere,
    selectedVisualPreset,
    setSelectedVisualPreset,
    selectedLighting,
    setSelectedLighting,
    selectedColorPalette,
    setSelectedColorPalette,
    customColors,
    setCustomColors,

    // Camera
    selectedCamera,
    customCamera,
    setCustomCamera,
    selectedLens,
    setSelectedLens,
    customLens,
    setCustomLens,
    selectedShot,
    setSelectedShot,
    customShot,
    setCustomShot,
    depthOfField,
    setDepthOfField,
    aspectRatio,
    setAspectRatio,
    handleCameraChange,

    // Director
    selectedDirector,
    handleDirectorChange,

    // Advanced
    negativePrompt,
    setNegativePrompt,
    showAdvanced,
    setShowAdvanced,

    // UI
    settingsLocked,
    setSettingsLocked,
    expandedSections,
    toggleSection,
    conflicts,

    // Actions
    prompt,
    copyToClipboard,
    resetAll,
  };
}
