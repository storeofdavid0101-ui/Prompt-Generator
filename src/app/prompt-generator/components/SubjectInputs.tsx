/**
 * Subject and character input component
 * Handles main subject, character descriptions, and location inputs
 */

'use client';

import { motion } from 'framer-motion';
import { User, MapPin, X, FileText, CornerDownLeft } from 'lucide-react';
import type { CharacterItem, ThemeColors } from '../config/types';
import { SectionLock } from './SectionLock';

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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddCharacter();
    }
  };

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
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: themeColors.textTertiary }}
        >
          Subject (Main Focus)
        </label>
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
        <label
          className="block text-xs font-medium mb-2 flex items-center gap-1.5"
          style={{ color: themeColors.textTertiary }}
        >
          <User className="w-3 h-3" /> Character Description
        </label>
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

      {/* Location Input */}
      <div>
        <label
          className="block text-xs font-medium mb-2 flex items-center gap-1.5"
          style={{ color: themeColors.textTertiary }}
        >
          <MapPin className="w-3 h-3" /> Location
        </label>
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
      </div>
    </div>
  );
}
