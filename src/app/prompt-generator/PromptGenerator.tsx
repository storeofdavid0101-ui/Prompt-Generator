/**
 * Main Prompt Generator component
 * Orchestrates all sub-components using centralized state management
 *
 * Refactored to use:
 * - ThemeContext for theme prop elimination
 * - useAnalyticsHandlers for analytics wrapper consolidation
 * - ScrollHint extracted component
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Header,
  ConflictBanner,
  ModelSelector,
  SubjectInputs,
  DirectorSelector,
  AtmosphereSelector,
  VisualStyleSelector,
  ColorPaletteSelector,
  CameraSettings,
  LightingSelector,
  AdvancedTools,
  OutputBar,
  RandomizeAllButton,
  MagicGlow,
  ScrollHint,
} from './components';
import { ThemeProvider, useThemeContext } from './context';
import { usePromptGeneratorState, useMagicRandomize, useAnalyticsHandlers } from './hooks';

/**
 * Main exported component - wraps with ThemeProvider
 */
export function PromptGenerator() {
  return (
    <ThemeProvider>
      <PromptGeneratorInner />
    </ThemeProvider>
  );
}

/**
 * Inner component that consumes theme context
 */
function PromptGeneratorInner() {
  const { darkMode, toggleDarkMode, themeColors } = useThemeContext();
  const state = usePromptGeneratorState();
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Analytics-wrapped handlers
  const handlers = useAnalyticsHandlers(
    {
      selectedModel: state.selectedModel,
      setSelectedModel: state.setSelectedModel,
      setGazeDirection: state.setGazeDirection,
      setPoseAction: state.setPoseAction,
      setCharacterPosition: state.setCharacterPosition,
      setLocation: state.setLocation,
      setSelectedAtmosphere: state.setSelectedAtmosphere,
      setSelectedVisualPreset: state.setSelectedVisualPreset,
      setSelectedColorPalette: state.setSelectedColorPalette,
      setSelectedLighting: state.setSelectedLighting,
      handleCameraChange: state.handleCameraChange,
      setSelectedLens: state.setSelectedLens,
      setCustomLens: state.setCustomLens,
      setSelectedShot: state.setSelectedShot,
      setCustomShot: state.setCustomShot,
      setAspectRatio: state.setAspectRatio,
      setDepthOfField: state.setDepthOfField,
      handleDirectorChange: state.handleDirectorChange,
      creativeControlsEnabled: state.creativeControlsEnabled,
      setCreativeControlsEnabled: state.setCreativeControlsEnabled,
    },
    state.lockedSections
  );

  // Magic randomize functionality - conflict-aware, smart matching, and model-safe
  const magic = useMagicRandomize({
    lockedSections: state.lockedSections,
    currentSubject: state.subject,
    conflicts: state.conflicts,
    selectedModel: state.selectedModel,
    setSubject: state.setSubject,
    setCurrentCharacter: state.setCurrentCharacter,
    addCharacter: state.addCharacter,
    setGazeDirection: state.setGazeDirection,
    setPoseAction: state.setPoseAction,
    setCharacterPosition: state.setCharacterPosition,
    setLocation: state.setLocation,
    handleDirectorChange: state.handleDirectorChange,
    setSelectedAtmosphere: state.setSelectedAtmosphere,
    setSelectedVisualPreset: state.setSelectedVisualPreset,
    setSelectedColorPalette: state.setSelectedColorPalette,
    handleCameraChange: state.handleCameraChange,
    setSelectedLens: state.setSelectedLens,
    setSelectedShot: state.setSelectedShot,
    setDepthOfField: state.setDepthOfField,
    setAspectRatio: state.setAspectRatio,
    setSelectedLighting: state.setSelectedLighting,
  });

  // Scroll hint visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      setShowScrollHint(!scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen pb-48 transition-colors duration-300"
      style={{ backgroundColor: themeColors.background }}
    >
      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          themeColors={themeColors}
        />

        <ScrollHint visible={showScrollHint} />

        <ConflictBanner conflicts={state.conflicts} themeColors={themeColors} />

        <RandomizeAllButton onClick={magic.randomizeAll} themeColors={themeColors} />

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border backdrop-blur-xl relative z-10"
          style={{
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.borderColor,
            boxShadow: darkMode
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="p-5 space-y-1">
            <ModelSelector
              selectedModel={state.selectedModel}
              isLocked={state.lockedSections.model}
              onToggleLock={() => state.toggleLock('model')}
              onSelectModel={handlers.handleModelSelect}
              themeColors={themeColors}
            />

            <Divider color={themeColors.borderColor} />

            <SubjectInputs
              subject={state.subject}
              characterItems={state.characterItems}
              currentCharacter={state.currentCharacter}
              gazeDirection={state.gazeDirection}
              poseAction={state.poseAction}
              characterPosition={state.characterPosition}
              location={state.location}
              isSubjectLocked={state.lockedSections.subject}
              isCharacterLocked={state.lockedSections.character}
              isGazeLocked={state.lockedSections.gaze}
              isPoseLocked={state.lockedSections.pose}
              isPositionLocked={state.lockedSections.position}
              isLocationLocked={state.lockedSections.location}
              onToggleSubjectLock={() => state.toggleLock('subject')}
              onToggleCharacterLock={() => state.toggleLock('character')}
              onToggleGazeLock={() => state.toggleLock('gaze')}
              onTogglePoseLock={() => state.toggleLock('pose')}
              onTogglePositionLock={() => state.toggleLock('position')}
              onToggleLocationLock={() => state.toggleLock('location')}
              onSubjectChange={state.setSubject}
              onCurrentCharacterChange={state.setCurrentCharacter}
              onAddCharacter={state.addCharacter}
              onRemoveCharacter={state.removeCharacter}
              onGazeChange={handlers.handleGazeChange}
              onPoseChange={handlers.handlePoseChange}
              onPositionChange={handlers.handlePositionChange}
              onLocationChange={handlers.handleLocationChange}
              themeColors={themeColors}
              magicState={{
                subject: magic.magicState.subject,
                character: magic.magicState.character,
                gaze: magic.magicState.gaze,
                pose: magic.magicState.pose,
                position: magic.magicState.position,
                location: magic.magicState.location,
              }}
              magicHandlers={{
                randomizeSubject: magic.randomizeSubject,
                randomizeCharacter: magic.randomizeCharacter,
                randomizeGaze: magic.randomizeGaze,
                randomizePose: magic.randomizePose,
                randomizePosition: magic.randomizePosition,
                randomizeLocation: magic.randomizeLocation,
                randomizeContent: magic.randomizeContent,
              }}
            />

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.director} themeColors={themeColors}>
              <DirectorSelector
                selectedDirector={state.selectedDirector}
                isLocked={state.lockedSections.director}
                onToggleLock={() => state.toggleLock('director')}
                onDirectorChange={handlers.handleDirectorChange}
                themeColors={themeColors}
                onRandomize={magic.randomizeDirector}
              />
            </MagicGlow>

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.atmosphere} themeColors={themeColors}>
              <AtmosphereSelector
                selectedAtmosphere={state.selectedAtmosphere}
                isLocked={state.lockedSections.atmosphere}
                onToggleLock={() => state.toggleLock('atmosphere')}
                conflicts={state.conflicts}
                onSelectAtmosphere={handlers.handleAtmosphereSelect}
                themeColors={themeColors}
                onRandomize={magic.randomizeAtmosphere}
              />
            </MagicGlow>

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.visual} themeColors={themeColors}>
              <VisualStyleSelector
                selectedVisualPreset={state.selectedVisualPreset}
                isExpanded={state.expandedSections.visual}
                isLocked={state.lockedSections.visual}
                onToggleLock={() => state.toggleLock('visual')}
                conflicts={state.conflicts}
                onSelectPreset={handlers.handleVisualPresetSelect}
                onToggleSection={state.toggleSection}
                themeColors={themeColors}
                onRandomize={magic.randomizeVisual}
              />
            </MagicGlow>

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.color} themeColors={themeColors}>
              <ColorPaletteSelector
                selectedColorPalette={state.selectedColorPalette}
                customColors={state.customColors}
                isExpanded={state.expandedSections.color}
                isLocked={state.lockedSections.color}
                onToggleLock={() => state.toggleLock('color')}
                onSelectPalette={handlers.handleColorPaletteSelect}
                onCustomColorsChange={(colors) =>
                  !state.lockedSections.color && state.setCustomColors(colors)
                }
                onToggleSection={state.toggleSection}
                themeColors={themeColors}
                onRandomize={magic.randomizeColor}
              />
            </MagicGlow>

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.camera} themeColors={themeColors}>
              <CameraSettings
                selectedCamera={state.selectedCamera}
                customCamera={state.customCamera}
                selectedLens={state.selectedLens}
                customLens={state.customLens}
                selectedShot={state.selectedShot}
                customShot={state.customShot}
                aspectRatio={state.aspectRatio}
                isExpanded={state.expandedSections.camera}
                isLocked={state.lockedSections.camera}
                onToggleLock={() => state.toggleLock('camera')}
                conflicts={state.conflicts}
                onCameraChange={handlers.handleCameraChange}
                onCustomCameraChange={(v) =>
                  !state.lockedSections.camera && state.setCustomCamera(v)
                }
                onLensChange={handlers.handleLensChange}
                onCustomLensChange={(v) =>
                  !state.lockedSections.camera && state.setCustomLens(v)
                }
                onShotChange={handlers.handleShotChange}
                onCustomShotChange={(v) =>
                  !state.lockedSections.camera && state.setCustomShot(v)
                }
                onAspectRatioChange={handlers.handleAspectRatioChange}
                onToggleSection={state.toggleSection}
                themeColors={themeColors}
                onRandomize={magic.randomizeCameraAll}
              />
            </MagicGlow>

            <Divider color={themeColors.borderColor} />

            <MagicGlow isActive={magic.magicState.lighting} themeColors={themeColors}>
              <LightingSelector
                selectedLighting={state.selectedLighting}
                isExpanded={state.expandedSections.lighting}
                isLocked={state.lockedSections.lighting}
                onToggleLock={() => state.toggleLock('lighting')}
                onSelectLighting={handlers.handleLightingSelect}
                onToggleSection={state.toggleSection}
                themeColors={themeColors}
                onRandomize={magic.randomizeLighting}
              />
            </MagicGlow>
          </div>
        </motion.div>

        <AdvancedTools
          negativePrompt={state.negativePrompt}
          creativeControlsEnabled={state.creativeControlsEnabled}
          creativity={state.creativity}
          variation={state.variation}
          uniqueness={state.uniqueness}
          depthOfField={state.depthOfField}
          selectedModel={state.selectedModel}
          showAdvanced={state.showAdvanced}
          isLocked={state.lockedSections.advanced}
          onToggleLock={() => state.toggleLock('advanced')}
          conflicts={state.conflicts}
          onNegativePromptChange={(v) =>
            !state.lockedSections.advanced && state.setNegativePrompt(v)
          }
          onCreativeControlsToggle={handlers.handleCreativeControlsToggle}
          onCreativityChange={(v) =>
            !state.lockedSections.advanced && state.setCreativity(v)
          }
          onVariationChange={(v) =>
            !state.lockedSections.advanced && state.setVariation(v)
          }
          onUniquenessChange={(v) =>
            !state.lockedSections.advanced && state.setUniqueness(v)
          }
          onDepthOfFieldChange={handlers.handleDepthOfFieldChange}
          onToggleAdvanced={() => state.setShowAdvanced(!state.showAdvanced)}
          themeColors={themeColors}
        />
      </div>

      <OutputBar
        prompt={state.prompt}
        copied={state.copied}
        onReset={state.resetAll}
        onCopy={state.copyToClipboard}
        themeColors={themeColors}
      />
    </div>
  );
}

/** Simple divider component */
function Divider({ color }: { color: string }) {
  return <div className="h-px" style={{ backgroundColor: color }} />;
}
