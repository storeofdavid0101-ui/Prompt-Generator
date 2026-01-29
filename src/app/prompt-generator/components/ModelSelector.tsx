/**
 * AI Model selector component
 * Allows selection between different AI image generation models
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import { SectionHeader } from './ui';
import { modelConfigs } from '../config';
import type { AIModel, ThemeColors } from '../config/types';

interface ModelSelectorProps {
  selectedModel: AIModel;
  isExpanded: boolean;
  settingsLocked: boolean;
  onSelectModel: (model: AIModel) => void;
  onToggleSection: (key: string) => void;
  themeColors: ThemeColors;
}

export function ModelSelector({
  selectedModel,
  isExpanded,
  settingsLocked,
  onSelectModel,
  onToggleSection,
  themeColors,
}: ModelSelectorProps) {
  return (
    <div>
      <SectionHeader
        title="AI Model"
        icon={Layers}
        sectionKey="model"
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
          >
            <div className="grid grid-cols-2 gap-2 pb-4 px-1">
              {(Object.entries(modelConfigs) as [AIModel, typeof modelConfigs[AIModel]][]).map(
                ([key, config]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !settingsLocked && onSelectModel(key)}
                    disabled={settingsLocked}
                    className="p-3 rounded-xl text-left transition-all border"
                    style={{
                      backgroundColor:
                        selectedModel === key ? themeColors.promptBg : 'transparent',
                      borderColor:
                        selectedModel === key ? themeColors.accent : themeColors.borderColor,
                      opacity: settingsLocked ? 0.6 : 1,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{config.icon}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: themeColors.textPrimary }}
                      >
                        {config.name}
                      </span>
                    </div>
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
