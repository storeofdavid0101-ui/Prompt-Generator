/**
 * Content State Hook
 *
 * Manages the core content inputs: subject, characters, and location.
 * Handles character list management with unique ID generation.
 *
 * @module hooks/state/useContentState
 */

'use client';

import { useState, useCallback } from 'react';
import type { CharacterItem } from '../../config/types';
import type { ContentState } from './types';

/**
 * Generate a unique ID for character items
 * Uses crypto.randomUUID with truncation for shorter IDs
 */
function generateCharacterId(): string {
  return crypto.randomUUID().slice(0, 9);
}

/**
 * Hook for managing content state (subject, characters, location)
 *
 * @returns Content state and handlers
 *
 * @example
 * ```tsx
 * const content = useContentState();
 *
 * // Set subject
 * content.setSubject('A mysterious figure');
 *
 * // Add a character
 * content.setCurrentCharacter('wearing a red cloak');
 * content.addCharacter();
 *
 * // Remove a character
 * content.removeCharacter(characterId);
 * ```
 */
export function useContentState(): ContentState {
  const [subject, setSubjectInternal] = useState('');
  const [characterItems, setCharacterItems] = useState<CharacterItem[]>([]);
  const [currentCharacter, setCurrentCharacterInternal] = useState('');
  const [gazeDirection, setGazeDirectionInternal] = useState('');
  const [poseAction, setPoseActionInternal] = useState('');
  const [characterPosition, setCharacterPositionInternal] = useState('');
  const [location, setLocationInternal] = useState('');

  const setSubject = useCallback((value: string) => {
    setSubjectInternal(value);
  }, []);

  const setCurrentCharacter = useCallback((value: string) => {
    setCurrentCharacterInternal(value);
  }, []);

  const setGazeDirection = useCallback((value: string) => {
    setGazeDirectionInternal(value);
  }, []);

  const setPoseAction = useCallback((value: string) => {
    setPoseActionInternal(value);
  }, []);

  const setCharacterPosition = useCallback((value: string) => {
    setCharacterPositionInternal(value);
  }, []);

  const setLocation = useCallback((value: string) => {
    setLocationInternal(value);
  }, []);

  const addCharacter = useCallback(() => {
    const trimmed = currentCharacter.trim();
    if (trimmed) {
      setCharacterItems((prev) => [
        ...prev,
        { id: generateCharacterId(), content: trimmed },
      ]);
      setCurrentCharacterInternal('');
    }
  }, [currentCharacter]);

  const removeCharacter = useCallback((id: string) => {
    setCharacterItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const reset = useCallback(() => {
    setSubjectInternal('');
    setCharacterItems([]);
    setCurrentCharacterInternal('');
    setGazeDirectionInternal('');
    setPoseActionInternal('');
    setCharacterPositionInternal('');
    setLocationInternal('');
  }, []);

  const resetSubject = useCallback(() => {
    setSubjectInternal('');
  }, []);

  const resetCharacter = useCallback(() => {
    setCharacterItems([]);
    setCurrentCharacterInternal('');
  }, []);

  const resetGaze = useCallback(() => {
    setGazeDirectionInternal('');
  }, []);

  const resetPose = useCallback(() => {
    setPoseActionInternal('');
  }, []);

  const resetPosition = useCallback(() => {
    setCharacterPositionInternal('');
  }, []);

  const resetLocation = useCallback(() => {
    setLocationInternal('');
  }, []);

  return {
    subject,
    characterItems,
    currentCharacter,
    gazeDirection,
    poseAction,
    characterPosition,
    location,
    setSubject,
    setCurrentCharacter,
    setGazeDirection,
    setPoseAction,
    setCharacterPosition,
    setLocation,
    addCharacter,
    removeCharacter,
    reset,
    resetSubject,
    resetCharacter,
    resetGaze,
    resetPose,
    resetPosition,
    resetLocation,
  };
}
