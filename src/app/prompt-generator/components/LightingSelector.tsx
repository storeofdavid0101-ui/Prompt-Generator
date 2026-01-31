/**
 * Lighting selector component
 * Provides categorized lighting style options
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun } from 'lucide-react';
import { SectionHeader } from './ui';
import { lightingOptions, helpDescriptions } from '../config';
import type { ThemeColors } from '../config/types';

interface LightingSelectorProps {
  selectedLighting: string | null;
  isExpanded: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  onSelectLighting: (lighting: string | null) => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
  onRandomize?: () => void;
}

type LightingCategory = 'classic' | 'natural' | 'stylized';

const categoryLabels: Record<LightingCategory, string> = {
  classic: 'Classic Cinematic',
  natural: 'Natural / Atmospheric',
  stylized: 'Stylized / Modern',
};

export function LightingSelector({
  selectedLighting,
  isExpanded,
  isLocked,
  onToggleLock,
  onSelectLighting,
  onToggleSection,
  themeColors,
  onRandomize,
}: LightingSelectorProps) {
  const renderCategory = (category: LightingCategory) => (
    <div key={category}>
      <label className="block text-xs mb-2" style={{ color: themeColors.textTertiary }}>
        {categoryLabels[category]}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(lightingOptions)
          .filter(([, opt]) => opt.category === category)
          .map(([key, opt]) => (
            <motion.button
              key={key}
              onClick={() => {
                if (!isLocked) {
                  onSelectLighting(selectedLighting === key ? null : key);
                }
              }}
              disabled={isLocked}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
              style={{
                background:
                  selectedLighting === key ? opt.gradient : themeColors.inputBackground,
                border: `1px solid ${selectedLighting === key ? 'transparent' : themeColors.inputBorder}`,
                color: selectedLighting === key ? '#fff' : themeColors.textSecondary,
                opacity: isLocked ? 0.6 : 1,
              }}
              whileHover={{ scale: isLocked ? 1 : 1.02 }}
              whileTap={{ scale: isLocked ? 1 : 0.98 }}
            >
              {opt.name}
            </motion.button>
          ))}
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Lighting"
        icon={Sun}
        sectionKey="lighting"
        isExpanded={isExpanded}
        isLocked={isLocked}
        help={helpDescriptions.lighting}
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
            <div className="pb-4 space-y-4">
              {renderCategory('classic')}
              {renderCategory('natural')}
              {renderCategory('stylized')}

              {/* Selected lighting preview */}
              {selectedLighting && (
                <div
                  className="p-3 rounded-lg text-xs"
                  style={{
                    background: lightingOptions[selectedLighting].gradient,
                    color: '#fff',
                  }}
                >
                  <div className="font-medium mb-1">
                    {lightingOptions[selectedLighting].name}
                  </div>
                  <div className="opacity-80 text-[10px]">
                    {lightingOptions[selectedLighting].keywords}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
