/**
 * AI Model selector component
 * Dropdown-style selector for AI image generation models
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown, Check } from 'lucide-react';
import { modelConfigs, helpDescriptions } from '../config';
import type { AIModel, ThemeColors } from '../config/types';
import { SectionLock } from './SectionLock';
import { HelpLabel } from './ui';

interface ModelSelectorProps {
  selectedModel: AIModel;
  isLocked: boolean;
  onToggleLock: () => void;
  onSelectModel: (model: AIModel) => void;
  themeColors: ThemeColors;
}

export function ModelSelector({
  selectedModel,
  isLocked,
  onToggleLock,
  onSelectModel,
  themeColors,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedConfig = modelConfigs[selectedModel];

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <HelpLabel
          icon={Layers}
          label="AI Model"
          help={helpDescriptions.model}
          themeColors={themeColors}
        />
        <SectionLock isLocked={isLocked} onToggle={onToggleLock} themeColors={themeColors} />
      </div>

      <div ref={dropdownRef} className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => !isLocked && setIsOpen(!isOpen)}
          disabled={isLocked}
          className="w-full rounded-lg px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 flex items-center justify-between"
          style={{
            backgroundColor: themeColors.inputBackground,
            border: `1px solid ${isOpen ? themeColors.accent : themeColors.inputBorder}`,
            color: themeColors.textPrimary,
            opacity: isLocked ? 0.6 : 1,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedConfig.icon}</span>
            <span className="font-medium">{selectedConfig.name}</span>
            {!selectedConfig.supportsNegativePrompt && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: themeColors.warning + '20',
                  color: themeColors.warning,
                }}
              >
                No negative
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: themeColors.textTertiary }}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-xl"
              style={{
                backgroundColor: themeColors.cardBackground,
                border: `1px solid ${themeColors.borderColor}`,
              }}
            >
              <div className="max-h-[320px] overflow-y-auto py-1">
                {(Object.entries(modelConfigs) as [AIModel, typeof modelConfigs[AIModel]][]).map(
                  ([key, config]) => {
                    const isSelected = selectedModel === key;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onSelectModel(key);
                          setIsOpen(false);
                        }}
                        className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors"
                        style={{
                          backgroundColor: isSelected ? themeColors.promptBg : 'transparent',
                        }}
                      >
                        {/* Icon */}
                        <span className="text-xl w-7 text-center">{config.icon}</span>

                        {/* Text */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-medium"
                              style={{ color: themeColors.textPrimary }}
                            >
                              {config.name}
                            </span>
                            {!config.supportsNegativePrompt && (
                              <span
                                className="text-[9px] px-1 py-0.5 rounded"
                                style={{
                                  backgroundColor: themeColors.warning + '20',
                                  color: themeColors.warning,
                                }}
                              >
                                No negative
                              </span>
                            )}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: themeColors.textTertiary }}
                          >
                            {config.promptStyle === 'tags' ? 'Tag-based prompts' : 'Natural language'}
                          </div>
                        </div>

                        {/* Check icon */}
                        {isSelected && (
                          <Check className="w-4 h-4" style={{ color: themeColors.accent }} />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
