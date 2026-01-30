/**
 * Main Prompt Generator component
 * Orchestrates all sub-components using centralized state management
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
  SectionLock,
} from './components';
import { usePromptGeneratorState } from './hooks';

export function PromptGenerator() {
  const state = usePromptGeneratorState();
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide hint when user reaches near the bottom of the page
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      setShowScrollHint(!scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen pb-80 transition-colors duration-300"
      style={{ backgroundColor: state.themeColors.background }}
    >
      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        <Header
          darkMode={state.darkMode}
          onToggleDarkMode={() => state.setDarkMode(!state.darkMode)}
          themeColors={state.themeColors}
        />

        {/* Scroll Indicator - Fixed position */}
        {showScrollHint && (
          <div
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 px-2 py-3 rounded-full backdrop-blur-sm animate-pulse"
            style={{
              backgroundColor: `${state.themeColors.cardBackground}cc`,
              border: `1px solid ${state.themeColors.borderColor}`,
            }}
          >
            <ChevronDown
              className="w-4 h-4"
              style={{ color: state.themeColors.accent }}
            />
            <span
              className="text-[10px] font-medium"
              style={{
                color: state.themeColors.textTertiary,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              More
            </span>
            <ChevronDown
              className="w-4 h-4"
              style={{ color: state.themeColors.accent }}
            />
          </div>
        )}

        <ConflictBanner conflicts={state.conflicts} themeColors={state.themeColors} />

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            backgroundColor: state.themeColors.cardBackground,
            borderColor: state.themeColors.borderColor,
            boxShadow: state.darkMode
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="p-5 space-y-1">
            <ModelSelector
              selectedModel={state.selectedModel}
              isLocked={state.lockedSections.model}
              onToggleLock={() => state.toggleLock('model')}
              onSelectModel={(model) => !state.lockedSections.model && state.setSelectedModel(model)}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <SubjectInputs
              subject={state.subject}
              characterItems={state.characterItems}
              currentCharacter={state.currentCharacter}
              location={state.location}
              isLocked={state.lockedSections.subject}
              onToggleLock={() => state.toggleLock('subject')}
              onSubjectChange={state.setSubject}
              onCurrentCharacterChange={state.setCurrentCharacter}
              onAddCharacter={state.addCharacter}
              onRemoveCharacter={state.removeCharacter}
              onLocationChange={state.setLocation}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <DirectorSelector
              selectedDirector={state.selectedDirector}
              isLocked={state.lockedSections.director}
              onToggleLock={() => state.toggleLock('director')}
              onDirectorChange={state.handleDirectorChange}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <AtmosphereSelector
              selectedAtmosphere={state.selectedAtmosphere}
              isLocked={state.lockedSections.atmosphere}
              onToggleLock={() => state.toggleLock('atmosphere')}
              conflicts={state.conflicts}
              onSelectAtmosphere={(atm) => !state.lockedSections.atmosphere && state.setSelectedAtmosphere(atm)}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <VisualStyleSelector
              selectedVisualPreset={state.selectedVisualPreset}
              isExpanded={state.expandedSections.visual}
              isLocked={state.lockedSections.visual}
              onToggleLock={() => state.toggleLock('visual')}
              conflicts={state.conflicts}
              onSelectPreset={(preset) => !state.lockedSections.visual && state.setSelectedVisualPreset(preset)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <ColorPaletteSelector
              selectedColorPalette={state.selectedColorPalette}
              customColors={state.customColors}
              isExpanded={state.expandedSections.color}
              isLocked={state.lockedSections.color}
              onToggleLock={() => state.toggleLock('color')}
              onSelectPalette={(palette) => !state.lockedSections.color && state.setSelectedColorPalette(palette)}
              onCustomColorsChange={(colors) => !state.lockedSections.color && state.setCustomColors(colors)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

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
              onCameraChange={state.handleCameraChange}
              onCustomCameraChange={(v) => !state.lockedSections.camera && state.setCustomCamera(v)}
              onLensChange={(v) => {
                if (!state.lockedSections.camera) {
                  state.setSelectedLens(v);
                  state.setCustomLens('');
                }
              }}
              onCustomLensChange={(v) => !state.lockedSections.camera && state.setCustomLens(v)}
              onShotChange={(v) => {
                if (!state.lockedSections.camera) {
                  state.setSelectedShot(v);
                  state.setCustomShot('');
                }
              }}
              onCustomShotChange={(v) => !state.lockedSections.camera && state.setCustomShot(v)}
              onAspectRatioChange={(v) => !state.lockedSections.camera && state.setAspectRatio(v)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <LightingSelector
              selectedLighting={state.selectedLighting}
              isExpanded={state.expandedSections.lighting}
              isLocked={state.lockedSections.lighting}
              onToggleLock={() => state.toggleLock('lighting')}
              onSelectLighting={(lighting) => !state.lockedSections.lighting && state.setSelectedLighting(lighting)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />
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
          onNegativePromptChange={(v) => !state.lockedSections.advanced && state.setNegativePrompt(v)}
          onCreativeControlsToggle={() =>
            !state.lockedSections.advanced && state.setCreativeControlsEnabled(!state.creativeControlsEnabled)
          }
          onCreativityChange={(v) => !state.lockedSections.advanced && state.setCreativity(v)}
          onVariationChange={(v) => !state.lockedSections.advanced && state.setVariation(v)}
          onUniquenessChange={(v) => !state.lockedSections.advanced && state.setUniqueness(v)}
          onDepthOfFieldChange={(v) => !state.lockedSections.advanced && state.setDepthOfField(v)}
          onToggleAdvanced={() => state.setShowAdvanced(!state.showAdvanced)}
          themeColors={state.themeColors}
        />
      </div>

      <OutputBar
        prompt={state.prompt}
        copied={state.copied}
        onReset={state.resetAll}
        onCopy={state.copyToClipboard}
        themeColors={state.themeColors}
      />
    </div>
  );
}

// Simple divider component
function Divider({ color }: { color: string }) {
  return <div className="h-px" style={{ backgroundColor: color }} />;
}
