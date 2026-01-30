/**
 * Subject and character input component
 * Handles main subject, character descriptions, and location inputs
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, X, FileText, CornerDownLeft, ChevronDown, Edit3, Target } from 'lucide-react';
import type { CharacterItem, ThemeColors } from '../config/types';
import { SectionLock } from './SectionLock';
import { locationPresetsByCategory, locationCategoryNames, helpDescriptions } from '../config';
import { HelpLabel } from './ui';

interface SubjectInputsProps {
  subject: string;
  characterItems: CharacterItem[];
  currentCharacter: string;
  location: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onSubjectChange: (value: string) => void;
  onCurrentCharacterChange: (value: string) => void;
  onAddCharacter: () => void;
  onRemoveCharacter: (id: string) => void;
  onLocationChange: (value: string) => void;
  themeColors: ThemeColors;
}

export function SubjectInputs({
  subject,
  characterItems,
  currentCharacter,
  location,
  isLocked,
  onToggleLock,
  onSubjectChange,
  onCurrentCharacterChange,
  onAddCharacter,
  onRemoveCharacter,
  onLocationChange,
  themeColors,
}: SubjectInputsProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isCustomLocation, setIsCustomLocation] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddCharacter();
    }
  };

  const handleLocationPresetSelect = (keywords: string) => {
    onLocationChange(keywords);
    setIsCustomLocation(false);
    setShowLocationDropdown(false);
  };

  const handleCustomLocationClick = () => {
    setIsCustomLocation(true);
    setShowLocationDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="py-3 space-y-3">
      {/* Section Header with Lock */}
      <div className="flex items-center justify-between">
        <label
          className="text-xs font-medium flex items-center gap-1.5"
          style={{ color: themeColors.textTertiary }}
        >
          <FileText className="w-3 h-3" /> Content
        </label>
        <SectionLock isLocked={isLocked} onToggle={onToggleLock} themeColors={themeColors} />
      </div>

      {/* Subject Input */}
      <div>
        <HelpLabel
          icon={Target}
          label="Subject (Main Focus)"
          help={helpDescriptions.subject}
          themeColors={themeColors}
          className="mb-2"
        />
        <textarea
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="A futuristic warrior standing on a cliff..."
          rows={2}
          className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
          style={{
            backgroundColor: themeColors.inputBackground,
            border: `1px solid ${themeColors.inputBorder}`,
            color: themeColors.textPrimary,
          }}
        />
      </div>

      {/* Character Input */}
      <div>
        <HelpLabel
          icon={User}
          label="Character Description"
          help={helpDescriptions.character}
          themeColors={themeColors}
          className="mb-2"
        />
        <div className="relative">
          <input
            type="text"
            value={currentCharacter}
            onChange={(e) => onCurrentCharacterChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., tall woman with red hair, wearing armor"
            disabled={isLocked}
            className="w-full rounded-lg pl-3 pr-16 py-2 text-sm transition-all focus:outline-none focus:ring-2"
            style={{
              backgroundColor: themeColors.inputBackground,
              border: `1px solid ${themeColors.inputBorder}`,
              color: themeColors.textPrimary,
              opacity: isLocked ? 0.6 : 1,
            }}
          />
          {currentCharacter && (
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]"
              style={{
                backgroundColor: themeColors.accent + '20',
                color: themeColors.accent,
              }}
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>Enter</span>
            </div>
          )}
        </div>

        {characterItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {characterItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
                style={{
                  backgroundColor: themeColors.promptBg,
                  color: themeColors.textPrimary,
                  border: `1px solid ${themeColors.borderColor}`,
                }}
              >
                <User className="w-3 h-3" style={{ color: themeColors.accent }} />
                <span className="max-w-[150px] truncate">{item.content}</span>
                <button
                  onClick={() => onRemoveCharacter(item.id)}
                  disabled={isLocked}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="w-3 h-3" style={{ color: themeColors.textTertiary }} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Location Input with Dropdown */}
      <div ref={dropdownRef}>
        <HelpLabel
          icon={MapPin}
          label="Location"
          help={helpDescriptions.location}
          themeColors={themeColors}
          className="mb-2"
        />

        <div className="relative">
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => !isLocked && setShowLocationDropdown(!showLocationDropdown)}
            disabled={isLocked}
            className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 flex items-center justify-between"
            style={{
              backgroundColor: themeColors.inputBackground,
              border: `1px solid ${themeColors.inputBorder}`,
              color: location ? themeColors.textPrimary : themeColors.textTertiary,
              opacity: isLocked ? 0.6 : 1,
            }}
          >
            <span className="truncate text-left flex-1">
              {location || 'Select or enter a location...'}
            </span>
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`}
              style={{ color: themeColors.textTertiary }}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showLocationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: themeColors.cardBackground,
                  border: `1px solid ${themeColors.borderColor}`,
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}
              >
                {/* Custom Location Option */}
                <button
                  onClick={handleCustomLocationClick}
                  className="w-full px-3 py-2.5 text-sm text-left flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: isCustomLocation ? themeColors.accent + '20' : 'transparent',
                    color: themeColors.textPrimary,
                    borderBottom: `1px solid ${themeColors.borderColor}`,
                  }}
                >
                  <Edit3 className="w-3.5 h-3.5" style={{ color: themeColors.accent }} />
                  <span>Custom Location</span>
                </button>

                {/* Preset Categories */}
                {Object.entries(locationPresetsByCategory).map(([category, presets]) => (
                  <div key={category}>
                    <div
                      className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider"
                      style={{
                        backgroundColor: themeColors.inputBackground,
                        color: themeColors.textTertiary,
                      }}
                    >
                      {locationCategoryNames[category] || category}
                    </div>
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => handleLocationPresetSelect(preset.keywords)}
                        className="w-full px-3 py-2 text-sm text-left transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: location === preset.keywords ? themeColors.accent + '20' : 'transparent',
                          color: themeColors.textPrimary,
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Location Text Input (shown when custom is selected or editing) */}
        {isCustomLocation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="e.g., neon-lit Tokyo street at night"
              disabled={isLocked}
              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
              style={{
                backgroundColor: themeColors.inputBackground,
                border: `1px solid ${themeColors.inputBorder}`,
                color: themeColors.textPrimary,
                opacity: isLocked ? 0.6 : 1,
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
