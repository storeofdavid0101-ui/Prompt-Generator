/**
 * SubjectInputs component
 * Main container for subject, character, and location inputs
 * Coordinates child components and manages section-level state
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FileText, User, MapPin, Target, Eye, PersonStanding, LayoutGrid } from 'lucide-react';
import { SectionLock } from '../SectionLock';
import { MagicButton } from '../MagicButton';
import { MagicGlow } from '../MagicGlow';
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
import { GazeDirection } from './GazeDirection';
import { PoseAction } from './PoseAction';
import { CharacterPosition } from './CharacterPosition';

/**
 * SubjectInputs - Unified input section for scene content
 */
export const SubjectInputs = memo(function SubjectInputs({
  subject,
  characterItems,
  currentCharacter,
  gazeDirection,
  poseAction,
  characterPosition,
  location,
  isSubjectLocked,
  isCharacterLocked,
  isGazeLocked,
  isPoseLocked,
  isPositionLocked,
  isLocationLocked,
  onToggleSubjectLock,
  onToggleCharacterLock,
  onToggleGazeLock,
  onTogglePoseLock,
  onTogglePositionLock,
  onToggleLocationLock,
  onSubjectChange,
  onCurrentCharacterChange,
  onAddCharacter,
  onRemoveCharacter,
  onGazeChange,
  onPoseChange,
  onPositionChange,
  onLocationChange,
  themeColors,
  magicState,
  magicHandlers,
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
    if (currentCharacter.trim() && !isCharacterLocked) {
      onAddCharacter();
    }
  }, [currentCharacter, onAddCharacter, isCharacterLocked]);

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
        color: themeColors.accent,
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
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <label
          className="text-xs font-medium flex items-center gap-1.5"
          style={styles.sectionLabel}
          id="subject-section-label"
        >
          <FileText className="w-3 h-3" aria-hidden="true" />
          Content
        </label>
      </div>

      {/* Subject Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={Target}
            label="Subject (Main Focus)"
            help={helpDescriptions.subject}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizeSubject}
                disabled={isSubjectLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isSubjectLocked}
              onToggle={onToggleSubjectLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.subject ?? false} themeColors={themeColors}>
          <textarea
            value={subject}
            onChange={handleSubjectChange}
            placeholder="A futuristic warrior standing on a cliff..."
            rows={2}
            disabled={isSubjectLocked}
            maxLength={2000}
            className="w-full rounded-lg px-3 py-2.5 text-sm resize-none transition-all focus:outline-none focus:ring-2"
            style={{
              ...styles.subjectTextarea,
              opacity: isSubjectLocked ? 0.6 : 1,
            }}
            aria-label="Main subject description"
            aria-describedby="subject-section-label"
          />
        </MagicGlow>
      </div>

      {/* Character Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={User}
            label="Character Description"
            help={helpDescriptions.character}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizeCharacter}
                disabled={isCharacterLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isCharacterLocked}
              onToggle={onToggleCharacterLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.character ?? false} themeColors={themeColors}>
          <CharacterInput
            value={currentCharacter}
            isLocked={isCharacterLocked}
            onChange={handleCharacterChange}
            onSubmit={handleCharacterSubmit}
            themeColors={themeColors}
          />
        </MagicGlow>

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
                  isLocked={isCharacterLocked}
                  onRemove={handleCharacterRemove}
                  themeColors={themeColors}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Gaze Direction */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={Eye}
            label="Gaze Direction"
            help={helpDescriptions.gaze}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizeGaze}
                disabled={isGazeLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isGazeLocked}
              onToggle={onToggleGazeLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.gaze ?? false} themeColors={themeColors}>
          <GazeDirection
            selectedGaze={gazeDirection}
            isLocked={isGazeLocked}
            onGazeChange={onGazeChange}
            themeColors={themeColors}
          />
        </MagicGlow>
      </div>

      {/* Pose/Action */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={PersonStanding}
            label="Pose / Action"
            help={helpDescriptions.pose}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizePose}
                disabled={isPoseLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isPoseLocked}
              onToggle={onTogglePoseLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.pose ?? false} themeColors={themeColors}>
          <PoseAction
            selectedPose={poseAction}
            isLocked={isPoseLocked}
            onPoseChange={onPoseChange}
            themeColors={themeColors}
          />
        </MagicGlow>
      </div>

      {/* Character Position in Frame */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={LayoutGrid}
            label="Position in Frame"
            help={helpDescriptions.position}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizePosition}
                disabled={isPositionLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isPositionLocked}
              onToggle={onTogglePositionLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.position ?? false} themeColors={themeColors}>
          <CharacterPosition
            selectedPosition={characterPosition}
            isLocked={isPositionLocked}
            onPositionChange={onPositionChange}
            themeColors={themeColors}
          />
        </MagicGlow>
      </div>

      {/* Location Input with Dropdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <HelpLabel
            icon={MapPin}
            label="Location"
            help={helpDescriptions.location}
            themeColors={themeColors}
          />
          <div className="flex items-center gap-1.5">
            {magicHandlers && (
              <MagicButton
                onClick={magicHandlers.randomizeLocation}
                disabled={isLocationLocked}
                themeColors={themeColors}
                size="sm"
              />
            )}
            <SectionLock
              isLocked={isLocationLocked}
              onToggle={onToggleLocationLock}
              themeColors={themeColors}
            />
          </div>
        </div>
        <MagicGlow isActive={magicState?.location ?? false} themeColors={themeColors}>
          <LocationDropdown
            location={location}
            isLocked={isLocationLocked}
            onLocationChange={handleLocationChange}
            themeColors={themeColors}
            presetsByCategory={locationPresetsByCategory}
            categoryNames={locationCategoryNames}
          />
        </MagicGlow>
      </div>
    </div>
  );
});

SubjectInputs.displayName = 'SubjectInputs';
