/**
 * Visual style selector component
 * Color grading and contrast treatment options
 * Visual Style = technical color/contrast treatment (separate from mood)
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Check, AlertTriangle } from 'lucide-react';
import { SectionHeader } from './ui';
import { visualPresets, helpDescriptions } from '../config';
import type { ThemeColors, ConflictResult } from '../config/types';
import { SectionLock } from './SectionLock';

interface VisualStyleSelectorProps {
  selectedVisualPreset: string | null;
  isExpanded: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  conflicts: ConflictResult;
  onSelectPreset: (preset: string | null) => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
  onRandomize?: () => void;
}

export function VisualStyleSelector({
  selectedVisualPreset,
  isExpanded,
  isLocked,
  onToggleLock,
  conflicts,
  onSelectPreset,
  onToggleSection,
  themeColors,
  onRandomize,
}: VisualStyleSelectorProps) {
  return (
    <div>
      <SectionHeader
        title="Color Grade"
        icon={Sliders}
        sectionKey="visual"
        badge={selectedVisualPreset ? visualPresets[selectedVisualPreset].name : undefined}
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.colorGrade}
        onToggle={onToggleSection}
        onToggleLock={onToggleLock}
        onRandomize={onRandomize}
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
            <div className="grid grid-cols-2 gap-2 pb-4">
              {Object.entries(visualPresets).map(([key, config]) => {
                const isBlocked = conflicts.blockedPresets.has(key);
                const blockReason = conflicts.presetBlockReasons.get(key);
                return (
                  <button
                    key={key}
                    onClick={() =>
                      !isLocked &&
                      !isBlocked &&
                      onSelectPreset(selectedVisualPreset === key ? null : key)
                    }
                    disabled={isLocked || isBlocked}
                    className="relative p-3 rounded-xl text-left transition-all border overflow-hidden hover:scale-[1.02] active:scale-[0.98] group"
                    style={{
                      borderColor:
                        selectedVisualPreset === key
                          ? themeColors.accent
                          : isBlocked
                          ? themeColors.warning + '40'
                          : themeColors.borderColor,
                      opacity: isLocked || isBlocked ? 0.5 : 1,
                    }}
                    title={isBlocked && blockReason ? blockReason.reason : undefined}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: config.gradient }}
                    />
                    <div className="relative z-10">
                      <span
                        className="text-sm font-medium block"
                        style={{ color: themeColors.textPrimary }}
                      >
                        {config.name}
                      </span>
                      {isBlocked && blockReason && (
                        <span
                          className="text-[10px] block mt-0.5"
                          style={{ color: themeColors.warning }}
                        >
                          {blockReason.reason}
                        </span>
                      )}
                      {selectedVisualPreset === key && (
                        <Check
                          className="absolute top-2 right-2 w-4 h-4"
                          style={{ color: themeColors.accent }}
                        />
                      )}
                      {isBlocked && (
                        <AlertTriangle
                          className="absolute top-2 right-2 w-4 h-4"
                          style={{ color: themeColors.warning }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
