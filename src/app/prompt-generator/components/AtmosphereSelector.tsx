/**
 * Atmosphere selector component
 * Dropdown-style mood/environment selector with color previews
 * Atmosphere = overall mood/environment of the scene
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, ChevronDown, Check, AlertTriangle, X } from 'lucide-react';
import { atmosphereConfigs, helpDescriptions } from '../config';
import type { Atmosphere, ThemeColors, ConflictResult } from '../config/types';
import { SectionLock } from './SectionLock';
import { HelpLabel } from './ui';

interface AtmosphereSelectorProps {
  selectedAtmosphere: Atmosphere | null;
  isLocked: boolean;
  onToggleLock: () => void;
  conflicts: ConflictResult;
  onSelectAtmosphere: (atmosphere: Atmosphere | null) => void;
  themeColors: ThemeColors;
}

export function AtmosphereSelector({
  selectedAtmosphere,
  isLocked,
  onToggleLock,
  conflicts,
  onSelectAtmosphere,
  themeColors,
}: AtmosphereSelectorProps) {
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

  const selectedConfig = selectedAtmosphere ? atmosphereConfigs[selectedAtmosphere] : null;

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <HelpLabel
          icon={Cloud}
          label="Atmosphere"
          help={helpDescriptions.atmosphere}
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
            {selectedConfig ? (
              <>
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0"
                  style={{ background: selectedConfig.gradient }}
                />
                <span>{selectedConfig.name}</span>
                <span className="text-xs opacity-60">— {selectedConfig.description}</span>
              </>
            ) : (
              <span style={{ color: themeColors.textPrimary }}>Select atmosphere...</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {selectedAtmosphere && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAtmosphere(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onSelectAtmosphere(null);
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
              <div className="max-h-[320px] overflow-y-auto py-1">
                {(Object.entries(atmosphereConfigs) as [Atmosphere, typeof atmosphereConfigs[Atmosphere]][]).map(
                  ([key, config]) => {
                    const isBlocked = conflicts.blockedAtmospheres.has(key);
                    const isSelected = selectedAtmosphere === key;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (!isBlocked) {
                            onSelectAtmosphere(isSelected ? null : key);
                            setIsOpen(false);
                          }
                        }}
                        disabled={isBlocked}
                        className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors"
                        style={{
                          opacity: isBlocked ? 0.4 : 1,
                          backgroundColor: isSelected ? themeColors.promptBg : 'transparent',
                        }}
                      >
                        {/* Color swatch */}
                        <div
                          className="w-8 h-8 rounded-lg flex-shrink-0 shadow-sm"
                          style={{ background: config.gradient }}
                        />

                        {/* Text */}
                        <div className="flex-1 text-left">
                          <div
                            className="text-sm font-medium"
                            style={{ color: themeColors.textPrimary }}
                          >
                            {config.name}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: themeColors.textTertiary }}
                          >
                            {config.description}
                          </div>
                        </div>

                        {/* Status icons */}
                        {isSelected && (
                          <Check className="w-4 h-4" style={{ color: themeColors.accent }} />
                        )}
                        {isBlocked && (
                          <AlertTriangle
                            className="w-4 h-4"
                            style={{ color: themeColors.warning }}
                          />
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
