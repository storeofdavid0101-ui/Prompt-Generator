/**
 * Character Creator State Hook
 *
 * Manages state for the character creator feature including:
 * - Character type selection (human vs other)
 * - Face feature sliders for human characters
 * - Custom species input for non-human characters
 * - Clothing/attire description
 *
 * @module hooks/state/useCharacterCreatorState
 */

'use client';

import { useState, useCallback } from 'react';
import type { CharacterType, FaceFeatures, FaceFeatureKey } from '../../config/types';
import type { CharacterCreatorState } from './types';
import { DEFAULT_FACE_FEATURES } from '../../config';

/**
 * Hook for managing character creator state
 *
 * @returns Character creator state and handlers
 *
 * @example
 * ```tsx
 * const characterCreator = useCharacterCreatorState();
 *
 * // Toggle between human and other
 * characterCreator.setCharacterType('other');
 *
 * // Set custom species for non-human
 * characterCreator.setCustomSpecies('Elf');
 *
 * // Adjust a face feature
 * characterCreator.setFaceFeature('eyeSize', 80);
 *
 * // Set clothing
 * characterCreator.setClothing('Victorian silk dress');
 * ```
 */
export function useCharacterCreatorState(): CharacterCreatorState {
  const [characterType, setCharacterTypeInternal] = useState<CharacterType>('human');
  const [customSpecies, setCustomSpeciesInternal] = useState('');
  const [faceFeatures, setFaceFeatures] = useState<FaceFeatures>(DEFAULT_FACE_FEATURES);
  const [clothing, setClothingInternal] = useState('');

  const setCharacterType = useCallback((value: CharacterType) => {
    setCharacterTypeInternal(value);
  }, []);

  const setCustomSpecies = useCallback((value: string) => {
    setCustomSpeciesInternal(value);
  }, []);

  const setFaceFeature = useCallback((feature: FaceFeatureKey, value: number) => {
    setFaceFeatures((prev) => ({
      ...prev,
      [feature]: Math.max(0, Math.min(100, value)), // Clamp to 0-100
    }));
  }, []);

  const resetFaceFeatures = useCallback(() => {
    setFaceFeatures(DEFAULT_FACE_FEATURES);
  }, []);

  const setClothing = useCallback((value: string) => {
    setClothingInternal(value);
  }, []);

  const reset = useCallback(() => {
    setCharacterTypeInternal('human');
    setCustomSpeciesInternal('');
    setFaceFeatures(DEFAULT_FACE_FEATURES);
    setClothingInternal('');
  }, []);

  return {
    characterType,
    setCharacterType,
    customSpecies,
    setCustomSpecies,
    faceFeatures,
    setFaceFeature,
    resetFaceFeatures,
    clothing,
    setClothing,
    reset,
  };
}
