/**
 * Director style selector component
 * Dropdown selector for famous director visual styles with descriptions
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Check, X } from 'lucide-react';
import { directorStyles, helpDescriptions } from '../config';
import type { ThemeColors } from '../config/types';
import { SectionLock } from './SectionLock';
import { MagicButton } from './MagicButton';
import { HelpLabel } from './ui';

interface DirectorSelectorProps {
  selectedDirector: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onDirectorChange: (director: string) => void;
  themeColors: ThemeColors;
  onRandomize?: () => void;
}

export function DirectorSelector({
  selectedDirector,
  isLocked,
  onToggleLock,
  onDirectorChange,
  themeColors,
  onRandomize,
}: DirectorSelectorProps) {
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

  const selectedConfig = directorStyles.find((d) => d.name === selectedDirector);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <HelpLabel
          icon={Sparkles}
          label="Director Style"
          help={helpDescriptions.director}
          themeColors={themeColors}
        />
        <div className="flex items-center gap-1.5">
          {onRandomize && (
            <MagicButton
              onClick={onRandomize}
              disabled={isLocked}
              themeColors={themeColors}
              size="sm"
            />
          )}
          <SectionLock isLocked={isLocked} onToggle={onToggleLock} themeColors={themeColors} />
        </div>
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
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {selectedConfig ? (
              <>
                <span className="font-medium whitespace-nowrap">{selectedConfig.name}</span>
                <span className="text-xs opacity-60 truncate hidden sm:inline">— {selectedConfig.description}</span>
              </>
            ) : (
              <span style={{ color: themeColors.textPrimary }}>No director style</span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {selectedDirector && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onDirectorChange('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onDirectorChange('');
                  }
                }}
                className="p-0.5 rounded hover:bg-black/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" style={{ color: themeColors.textTertiary }} />
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              style={{ color: themeColors.textTertiary }}
            />
          </div>
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
              <div className="max-h-[280px] overflow-y-auto py-1">
                {/* No style option */}
                <button
                  onClick={() => {
                    onDirectorChange('');
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors"
                  style={{
                    backgroundColor: !selectedDirector ? themeColors.promptBg : 'transparent',
                  }}
                >
                  <div className="flex-1 text-left">
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeColors.textPrimary }}
                    >
                      No director style
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeColors.textTertiary }}
                    >
                      Use default prompt without director influence
                    </div>
                  </div>
                  {!selectedDirector && (
                    <Check className="w-4 h-4" style={{ color: themeColors.accent }} />
                  )}
                </button>

                {/* Director options */}
                {directorStyles.map((director) => {
                  const isSelected = selectedDirector === director.name;

                  return (
                    <button
                      key={director.name}
                      onClick={() => {
                        onDirectorChange(director.name);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors"
                      style={{
                        backgroundColor: isSelected ? themeColors.promptBg : 'transparent',
                      }}
                    >
                      <div className="flex-1 text-left">
                        <div
                          className="text-sm font-medium"
                          style={{ color: themeColors.textPrimary }}
                        >
                          {director.name}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: themeColors.textTertiary }}
                        >
                          {director.description}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4" style={{ color: themeColors.accent }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDirector && (
        <p className="text-xs mt-1.5" style={{ color: themeColors.textTertiary }}>
          Some options locked to match {selectedDirector}&apos;s aesthetic
        </p>
      )}
    </div>
  );
}
