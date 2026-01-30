/**
 * SubjectInputs component
 * Main container for subject, character, and location inputs
 * Coordinates child components and manages section-level state
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FileText, User, MapPin, Target } from 'lucide-react';
import { SectionLock } from '../SectionLock';
import { HelpLabel } from '../ui';
import {
  locationPresetsByCategory,
  locationCategoryNames,
  helpDescriptions,
} from '../../config';
import type { SubjectInputsProps } from './types';
import { LocationDropdown } from './LocationDropdown';
import { CharacterInput } from './CharacterInput';
import { CharacterTag } from './CharacterTag';

/**
 * SubjectInputs - Unified input section for scene content
 */
export const SubjectInputs = memo(function SubjectInputs({
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
  // Memoized callbacks to prevent unnecessary re-renders
  const handleSubjectChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onSubjectChange(e.target.value);
    },
    [onSubjectChange]
  );

  const handleCharacterChange = useCallback(
    (value: string) => {
      onCurrentCharacterChange(value);
    },
    [onCurrentCharacterChange]
  );

  const handleCharacterSubmit = useCallback(() => {
    if (currentCharacter.trim()) {
      onAddCharacter();
    }
  }, [currentCharacter, onAddCharacter]);

  const handleCharacterRemove = useCallback(
    (id: string) => {
      onRemoveCharacter(id);
    },
    [onRemoveCharacter]
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      onLocationChange(value);
    },
    [onLocationChange]
  );

  // Memoized styles to prevent recreation on each render
  const styles = useMemo(
    () => ({
      sectionLabel: {
        color: themeColors.textTertiary,
      },
      subjectTextarea: {
        backgroundColor: themeColors.inputBackground,
        border: `1px solid ${themeColors.inputBorder}`,
        color: themeColors.textPrimary,
      },
    }),
    [themeColors]
  );

  // Check if there are any character items to display
  const hasCharacterItems = characterItems.length > 0;

  return (
    <div className="py-3 space-y-3">
      {/* Section Header with Lock */}
      <div className="flex items-center justify-between">
        <label
          className="text-xs font-medium flex items-center gap-1.5"
          style={styles.sectionLabel}
          id="subject-section-label"
        >
          <FileText className="w-3 h-3" aria-hidden="true" />
          Content
        </label>
        <SectionLock
          isLocked={isLocked}
          onToggle={onToggleLock}
          themeColors={themeColors}
        />
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
          onChange={handleSubjectChange}
          placeholder="A futuristic warrior standing on a cliff..."
          rows={2}
          disabled={isLocked}
          maxLength={2000}
          className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
          style={{
            ...styles.subjectTextarea,
            opacity: isLocked ? 0.6 : 1,
          }}
          aria-label="Main subject description"
          aria-describedby="subject-section-label"
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
        <CharacterInput
          value={currentCharacter}
          isLocked={isLocked}
          onChange={handleCharacterChange}
          onSubmit={handleCharacterSubmit}
          themeColors={themeColors}
        />

        {/* Character Tags List */}
        {hasCharacterItems && (
          <div
            className="flex flex-wrap gap-2 mt-2"
            role="list"
            aria-label="Added characters"
          >
            <AnimatePresence mode="popLayout">
              {characterItems.map((item) => (
                <CharacterTag
                  key={item.id}
                  item={item}
                  isLocked={isLocked}
                  onRemove={handleCharacterRemove}
                  themeColors={themeColors}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Location Input with Dropdown */}
      <div>
        <HelpLabel
          icon={MapPin}
          label="Location"
          help={helpDescriptions.location}
          themeColors={themeColors}
          className="mb-2"
        />
        <LocationDropdown
          location={location}
          isLocked={isLocked}
          onLocationChange={handleLocationChange}
          themeColors={themeColors}
          presetsByCategory={locationPresetsByCategory}
          categoryNames={locationCategoryNames}
        />
      </div>
    </div>
  );
});

SubjectInputs.displayName = 'SubjectInputs';
