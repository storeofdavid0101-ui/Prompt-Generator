/**
 * Camera settings component
 * Handles camera, lens, shot type, and aspect ratio selection
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Lock } from 'lucide-react';
import { SectionHeader } from './ui';
import { cameraOptions, lensOptions, shotOptions, aspectRatioOptions } from '../config';
import type { ThemeColors, ConflictResult } from '../config/types';

interface CameraSettingsProps {
  selectedCamera: string;
  customCamera: string;
  selectedLens: string;
  customLens: string;
  selectedShot: string;
  customShot: string;
  aspectRatio: string;
  isExpanded: boolean;
  settingsLocked: boolean;
  conflicts: ConflictResult;
  onCameraChange: (camera: string) => void;
  onCustomCameraChange: (value: string) => void;
  onLensChange: (lens: string) => void;
  onCustomLensChange: (value: string) => void;
  onShotChange: (shot: string) => void;
  onCustomShotChange: (value: string) => void;
  onAspectRatioChange: (ratio: string) => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
}

export function CameraSettings({
  selectedCamera,
  customCamera,
  selectedLens,
  customLens,
  selectedShot,
  customShot,
  aspectRatio,
  isExpanded,
  settingsLocked,
  conflicts,
  onCameraChange,
  onCustomCameraChange,
  onLensChange,
  onCustomLensChange,
  onShotChange,
  onCustomShotChange,
  onAspectRatioChange,
  onToggleSection,
  themeColors,
}: CameraSettingsProps) {
  const inputStyle = {
    backgroundColor: themeColors.inputBackground,
    border: `1px solid ${themeColors.inputBorder}`,
    color: themeColors.textPrimary,
    opacity: settingsLocked ? 0.6 : 1,
  };

  return (
    <div>
      <SectionHeader
        title="Camera & Lens"
        icon={Camera}
        sectionKey="camera"
        isExpanded={isExpanded}
        onToggle={onToggleSection}
        themeColors={themeColors}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-4">
              {/* Camera Type Selection */}
              <div>
                <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>
                  Camera
                </label>
                <select
                  value={selectedCamera}
                  onChange={(e) => onCameraChange(e.target.value)}
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                  style={inputStyle}
                >
                  <option value="">No specific camera</option>
                  {cameraOptions.map((camera) => {
                    const isBlocked = conflicts.blockedCameras.has(camera.label);
                    return (
                      <option
                        key={camera.label}
                        value={camera.label}
                        disabled={isBlocked}
                        style={{ color: isBlocked ? '#999' : undefined }}
                      >
                        {camera.label}
                        {isBlocked ? ' ⚠️' : ''}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  value={customCamera}
                  onChange={(e) => onCustomCameraChange(e.target.value)}
                  placeholder="Or enter custom camera (e.g., Canon 5D)"
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                  style={inputStyle}
                />
              </div>

              {/* Lens Selection */}
              <div>
                <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>
                  Lens
                </label>
                {conflicts.fixedLens ? (
                  <div
                    className="w-full rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                    style={{
                      backgroundColor: themeColors.promptBg,
                      border: `1px solid ${themeColors.borderColor}`,
                      color: themeColors.textSecondary,
                    }}
                  >
                    <Lock className="w-3 h-3" style={{ color: themeColors.warning }} />
                    <span>{conflicts.fixedLens}</span>
                    <span className="text-xs opacity-60">(fixed)</span>
                  </div>
                ) : conflicts.zoomRange ? (
                  <>
                    <div
                      className="w-full rounded-lg px-3 py-1.5 text-xs mb-2 flex items-center gap-2"
                      style={{
                        backgroundColor: themeColors.promptBg,
                        border: `1px solid ${themeColors.borderColor}`,
                        color: themeColors.textTertiary,
                      }}
                    >
                      <Camera className="w-3 h-3" style={{ color: themeColors.accent }} />
                      <span>Built-in zoom: {conflicts.zoomRange.range}</span>
                    </div>
                    <select
                      value={selectedLens}
                      onChange={(e) => onLensChange(e.target.value)}
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                      style={inputStyle}
                    >
                      {conflicts.zoomRange.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      value={selectedLens}
                      onChange={(e) => onLensChange(e.target.value)}
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                      style={inputStyle}
                    >
                      {lensOptions.map((lens) => (
                        <option key={lens} value={lens}>
                          {lens}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={customLens}
                      onChange={(e) => onCustomLensChange(e.target.value)}
                      placeholder="Or enter custom lens (e.g., 21mm Zeiss)"
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                      style={inputStyle}
                    />
                  </>
                )}
              </div>

              {/* Shot Type Selection */}
              <div>
                <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>
                  Shot Type
                </label>
                <select
                  value={selectedShot}
                  onChange={(e) => onShotChange(e.target.value)}
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 mb-2"
                  style={inputStyle}
                >
                  {shotOptions.map((shot) => (
                    <option key={shot.label} value={shot.label}>
                      {shot.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={customShot}
                  onChange={(e) => onCustomShotChange(e.target.value)}
                  placeholder="Or enter custom shot type"
                  disabled={settingsLocked}
                  className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                  style={inputStyle}
                />
              </div>

              {/* Aspect Ratio Selection */}
              <div>
                <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>
                  Aspect Ratio
                </label>
                {conflicts.allowedAspectRatios ? (
                  <>
                    <div
                      className="w-full rounded-lg px-3 py-1.5 text-xs mb-2 flex items-center gap-2"
                      style={{
                        backgroundColor: themeColors.promptBg,
                        border: `1px solid ${themeColors.borderColor}`,
                        color: themeColors.textTertiary,
                      }}
                    >
                      <Camera className="w-3 h-3" style={{ color: themeColors.accent }} />
                      <span>Limited to authentic {selectedCamera} ratios</span>
                    </div>
                    <select
                      value={aspectRatio}
                      onChange={(e) => onAspectRatioChange(e.target.value)}
                      disabled={settingsLocked}
                      className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                      style={inputStyle}
                    >
                      <option value="none">Default</option>
                      {conflicts.allowedAspectRatios.map((ratio) => {
                        const opt = aspectRatioOptions.find((r) => r.ratio === ratio);
                        return (
                          <option key={ratio} value={ratio}>
                            {opt ? opt.label : ratio}
                          </option>
                        );
                      })}
                    </select>
                  </>
                ) : (
                  <select
                    value={aspectRatio}
                    onChange={(e) => onAspectRatioChange(e.target.value)}
                    disabled={settingsLocked}
                    className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
                    style={inputStyle}
                  >
                    {aspectRatioOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
