/**
 * Camera Settings Container Component
 *
 * Main orchestrator that composes camera, lens, shot type, and aspect ratio
 * selectors into a cohesive, collapsible section.
 *
 * @module CameraSettings/CameraSettings
 */

'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { SectionHeader } from '../ui';
import { CameraTypeSelector } from './CameraTypeSelector';
import { LensSelector } from './LensSelector';
import { ShotTypeSelector } from './ShotTypeSelector';
import { AspectRatioSelector } from './AspectRatioSelector';
import { COLLAPSE_ANIMATION, SECTION_KEY } from './constants';
import type { CameraSettingsProps } from './types';

/**
 * Camera & Lens settings section
 *
 * Provides a collapsible accordion section containing:
 * - Camera type selection with conflict blocking
 * - Lens selection (fixed, zoom range, or standard)
 * - Shot type selection
 * - Aspect ratio selection (restricted or all)
 *
 * @example
 * ```tsx
 * <CameraSettings
 *   selectedCamera={selectedCamera}
 *   customCamera={customCamera}
 *   selectedLens={selectedLens}
 *   customLens={customLens}
 *   selectedShot={selectedShot}
 *   customShot={customShot}
 *   aspectRatio={aspectRatio}
 *   isExpanded={expandedSections.camera}
 *   isLocked={lockedSections.camera}
 *   conflicts={conflicts}
 *   themeColors={themeColors}
 *   onToggleLock={() => toggleLock('camera')}
 *   onCameraChange={handleCameraChange}
 *   onCustomCameraChange={setCustomCamera}
 *   onLensChange={setSelectedLens}
 *   onCustomLensChange={setCustomLens}
 *   onShotChange={setSelectedShot}
 *   onCustomShotChange={setCustomShot}
 *   onAspectRatioChange={setAspectRatio}
 *   onToggleSection={toggleSection}
 * />
 * ```
 */
export const CameraSettings = memo(function CameraSettings({
  selectedCamera,
  customCamera,
  selectedLens,
  customLens,
  selectedShot,
  customShot,
  aspectRatio,
  isExpanded,
  isLocked,
  conflicts,
  themeColors,
  onToggleLock,
  onCameraChange,
  onCustomCameraChange,
  onLensChange,
  onCustomLensChange,
  onShotChange,
  onCustomShotChange,
  onAspectRatioChange,
  onToggleSection,
}: CameraSettingsProps) {
  return (
    <section aria-labelledby="camera-settings-header">
      {/* Section Header with expand/collapse and lock */}
      <SectionHeader
        title="Camera & Lens"
        icon={Camera}
        sectionKey={SECTION_KEY}
        isExpanded={isExpanded}
        isLocked={isLocked}
        onToggle={onToggleSection}
        onToggleLock={onToggleLock}
        themeColors={themeColors}
      />

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={COLLAPSE_ANIMATION.initial}
            animate={COLLAPSE_ANIMATION.animate}
            exit={COLLAPSE_ANIMATION.exit}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-4">
              {/* Camera Type */}
              <CameraTypeSelector
                selectedCamera={selectedCamera}
                customCamera={customCamera}
                blockedCameras={conflicts.blockedCameras}
                onCameraChange={onCameraChange}
                onCustomCameraChange={onCustomCameraChange}
                isLocked={isLocked}
                themeColors={themeColors}
              />

              {/* Lens */}
              <LensSelector
                selectedLens={selectedLens}
                customLens={customLens}
                fixedLens={conflicts.fixedLens}
                zoomRange={conflicts.zoomRange}
                onLensChange={onLensChange}
                onCustomLensChange={onCustomLensChange}
                isLocked={isLocked}
                themeColors={themeColors}
              />

              {/* Shot Type */}
              <ShotTypeSelector
                selectedShot={selectedShot}
                customShot={customShot}
                onShotChange={onShotChange}
                onCustomShotChange={onCustomShotChange}
                isLocked={isLocked}
                themeColors={themeColors}
              />

              {/* Aspect Ratio */}
              <AspectRatioSelector
                aspectRatio={aspectRatio}
                selectedCamera={selectedCamera}
                allowedAspectRatios={conflicts.allowedAspectRatios}
                onAspectRatioChange={onAspectRatioChange}
                isLocked={isLocked}
                themeColors={themeColors}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

CameraSettings.displayName = 'CameraSettings';
