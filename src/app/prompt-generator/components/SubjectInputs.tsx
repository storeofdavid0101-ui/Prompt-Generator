/**
 * Subject and character input component
 * Handles main subject, character descriptions, and location inputs
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Plus, X } from 'lucide-react';
import type { CharacterItem, ThemeColors } from '../config/types';

interface SubjectInputsProps {
  subject: string;
  characterItems: CharacterItem[];
  currentCharacter: string;
  location: string;
  settingsLocked: boolean;
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
  settingsLocked,
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
        <div className="flex gap-2">
          <input
            type="text"
            value={currentCharacter}
            onChange={(e) => onCurrentCharacterChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add character description..."
            disabled={settingsLocked}
            className="flex-1 rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
            style={{
              backgroundColor: themeColors.inputBackground,
              border: `1px solid ${themeColors.inputBorder}`,
              color: themeColors.textPrimary,
              opacity: settingsLocked ? 0.6 : 1,
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddCharacter}
            disabled={settingsLocked}
            className="px-3 rounded-lg"
            style={{
              backgroundColor: themeColors.accent,
              color: '#fff',
              opacity: settingsLocked ? 0.6 : 1,
            }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
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
                  disabled={settingsLocked}
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
          disabled={settingsLocked}
          className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
          style={{
            backgroundColor: themeColors.inputBackground,
            border: `1px solid ${themeColors.inputBorder}`,
            color: themeColors.textPrimary,
            opacity: settingsLocked ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
}
