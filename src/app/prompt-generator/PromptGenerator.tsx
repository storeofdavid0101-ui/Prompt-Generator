/**
 * Main Prompt Generator component
 * Orchestrates all sub-components using centralized state management
 */

'use client';

import React from 'react';
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
} from './components';
import { usePromptGeneratorState } from './hooks';

export function PromptGenerator() {
  const state = usePromptGeneratorState();

  return (
    <div
      className="min-h-screen pb-52 transition-colors duration-300"
      style={{ backgroundColor: state.themeColors.background }}
    >
      <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
        <Header
          darkMode={state.darkMode}
          settingsLocked={state.settingsLocked}
          onToggleDarkMode={() => state.setDarkMode(!state.darkMode)}
          onToggleLock={() => state.setSettingsLocked(!state.settingsLocked)}
          themeColors={state.themeColors}
        />

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
              isExpanded={state.expandedSections.model}
              settingsLocked={state.settingsLocked}
              onSelectModel={(model) => !state.settingsLocked && state.setSelectedModel(model)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <SubjectInputs
              subject={state.subject}
              characterItems={state.characterItems}
              currentCharacter={state.currentCharacter}
              location={state.location}
              settingsLocked={state.settingsLocked}
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
              settingsLocked={state.settingsLocked}
              onDirectorChange={state.handleDirectorChange}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <AtmosphereSelector
              selectedAtmosphere={state.selectedAtmosphere}
              settingsLocked={state.settingsLocked}
              conflicts={state.conflicts}
              onSelectAtmosphere={(atm) => !state.settingsLocked && state.setSelectedAtmosphere(atm)}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <VisualStyleSelector
              selectedVisualPreset={state.selectedVisualPreset}
              isExpanded={state.expandedSections.visual}
              settingsLocked={state.settingsLocked}
              conflicts={state.conflicts}
              onSelectPreset={(preset) => !state.settingsLocked && state.setSelectedVisualPreset(preset)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <ColorPaletteSelector
              selectedColorPalette={state.selectedColorPalette}
              customColors={state.customColors}
              isExpanded={state.expandedSections.color}
              settingsLocked={state.settingsLocked}
              onSelectPalette={(palette) => !state.settingsLocked && state.setSelectedColorPalette(palette)}
              onCustomColorsChange={(colors) => !state.settingsLocked && state.setCustomColors(colors)}
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
              settingsLocked={state.settingsLocked}
              conflicts={state.conflicts}
              onCameraChange={state.handleCameraChange}
              onCustomCameraChange={(v) => !state.settingsLocked && state.setCustomCamera(v)}
              onLensChange={(v) => {
                if (!state.settingsLocked) {
                  state.setSelectedLens(v);
                  state.setCustomLens('');
                }
              }}
              onCustomLensChange={(v) => !state.settingsLocked && state.setCustomLens(v)}
              onShotChange={(v) => {
                if (!state.settingsLocked) {
                  state.setSelectedShot(v);
                  state.setCustomShot('');
                }
              }}
              onCustomShotChange={(v) => !state.settingsLocked && state.setCustomShot(v)}
              onAspectRatioChange={(v) => !state.settingsLocked && state.setAspectRatio(v)}
              onToggleSection={state.toggleSection}
              themeColors={state.themeColors}
            />

            <Divider color={state.themeColors.borderColor} />

            <LightingSelector
              selectedLighting={state.selectedLighting}
              isExpanded={state.expandedSections.lighting}
              settingsLocked={state.settingsLocked}
              onSelectLighting={(lighting) => !state.settingsLocked && state.setSelectedLighting(lighting)}
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
          settingsLocked={state.settingsLocked}
          conflicts={state.conflicts}
          onNegativePromptChange={(v) => !state.settingsLocked && state.setNegativePrompt(v)}
          onCreativeControlsToggle={() =>
            !state.settingsLocked && state.setCreativeControlsEnabled(!state.creativeControlsEnabled)
          }
          onCreativityChange={(v) => !state.settingsLocked && state.setCreativity(v)}
          onVariationChange={(v) => !state.settingsLocked && state.setVariation(v)}
          onUniquenessChange={(v) => !state.settingsLocked && state.setUniqueness(v)}
          onDepthOfFieldChange={(v) => !state.settingsLocked && state.setDepthOfField(v)}
          onToggleAdvanced={() => state.setShowAdvanced(!state.showAdvanced)}
          themeColors={state.themeColors}
        />
      </div>

      <OutputBar
        prompt={state.prompt}
        copied={state.copied}
        settingsLocked={state.settingsLocked}
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
