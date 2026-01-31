/**
 * Character Creator Component
 *
 * Main container for the character creation interface.
 * Provides toggle between Human (Face Builder) and Other (Custom Species) modes,
 * with a clothing input section that's always visible.
 *
 * @module components/CharacterCreator/CharacterCreator
 */

'use client';

import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import { SectionLock } from '../SectionLock';
import { MagicButton } from '../MagicButton';
import { MagicGlow } from '../MagicGlow';
import { HelpLabel } from '../ui';
import { CharacterTypeSelector } from './CharacterTypeSelector';
import { SpeciesInput } from './SpeciesInput';
import { ClothingInput } from './ClothingInput';
import { FaceBuilder } from './FaceBuilder';
import { characterCreatorHelp } from '../../config';
import type {
  ThemeColors,
  CharacterType,
  FaceFeatures,
  FaceFeatureKey,
} from '../../config/types';

interface CharacterCreatorProps {
  characterType: CharacterType;
  customSpecies: string;
  faceFeatures: FaceFeatures;
  clothing: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onCharacterTypeChange: (value: CharacterType) => void;
  onCustomSpeciesChange: (value: string) => void;
  onFaceFeatureChange: (feature: FaceFeatureKey, value: number) => void;
  onClothingChange: (value: string) => void;
  themeColors: ThemeColors;
  magicState?: boolean;
  onRandomize?: () => void;
}

const contentVariants = {
  initial: { opacity: 0, height: 0, overflow: 'hidden' },
  animate: { opacity: 1, height: 'auto', overflow: 'visible' },
  exit: { opacity: 0, height: 0, overflow: 'hidden' },
};

export const CharacterCreator = memo(function CharacterCreator({
  characterType,
  customSpecies,
  faceFeatures,
  clothing,
  isLocked,
  onToggleLock,
  onCharacterTypeChange,
  onCustomSpeciesChange,
  onFaceFeatureChange,
  onClothingChange,
  themeColors,
  magicState,
  onRandomize,
}: CharacterCreatorProps) {
  const styles = useMemo(
    () => ({
      sectionLabel: {
        color: themeColors.accent,
      },
    }),
    [themeColors]
  );

  return (
    <div className="py-3 space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <HelpLabel
          icon={UserCircle}
          label="Character Creator"
          help={characterCreatorHelp.faceBuilder}
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
          <SectionLock
            isLocked={isLocked}
            onToggle={onToggleLock}
            themeColors={themeColors}
          />
        </div>
      </div>

      {/* Character Type Toggle */}
      <MagicGlow isActive={magicState ?? false} themeColors={themeColors}>
        <CharacterTypeSelector
          value={characterType}
          onChange={onCharacterTypeChange}
          isLocked={isLocked}
          themeColors={themeColors}
        />
      </MagicGlow>

      {/* Conditional Content: Species Input OR Face Builder */}
      <AnimatePresence mode="wait">
        {characterType === 'other' ? (
          <motion.div
            key="species-input"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <SpeciesInput
              value={customSpecies}
              onChange={onCustomSpeciesChange}
              isLocked={isLocked}
              themeColors={themeColors}
            />
          </motion.div>
        ) : (
          <motion.div
            key="face-builder"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <FaceBuilder
              features={faceFeatures}
              onFeatureChange={onFaceFeatureChange}
              isLocked={isLocked}
              themeColors={themeColors}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clothing Input (always visible) */}
      <ClothingInput
        value={clothing}
        onChange={onClothingChange}
        isLocked={isLocked}
        themeColors={themeColors}
      />
    </div>
  );
});

CharacterCreator.displayName = 'CharacterCreator';
