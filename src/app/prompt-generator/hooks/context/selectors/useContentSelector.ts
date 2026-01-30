/**
 * Content Selector Hook
 *
 * Provides access to content-related state (subject, characters, location).
 * Use this for components managing content inputs.
 *
 * @module hooks/context/selectors/useContentSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';
import type { CharacterItem } from '../../../config/types';

/**
 * Content selector return type
 */
export interface ContentSelectorReturn {
  /** Main subject description */
  readonly subject: string;
  /** Update subject description */
  readonly setSubject: (value: string) => void;
  /** List of character items */
  readonly characterItems: readonly CharacterItem[];
  /** Current character input value */
  readonly currentCharacter: string;
  /** Update current character input */
  readonly setCurrentCharacter: (value: string) => void;
  /** Scene location description */
  readonly location: string;
  /** Update location description */
  readonly setLocation: (value: string) => void;
  /** Add current character to list */
  readonly addCharacter: () => void;
  /** Remove character by ID */
  readonly removeCharacter: (id: string) => void;
}

/**
 * Hook to access only content-related state
 *
 * @returns Content state and handlers
 *
 * @example
 * ```tsx
 * function SubjectInput() {
 *   const { subject, setSubject } = useContentSelector();
 *   return <input value={subject} onChange={e => setSubject(e.target.value)} />;
 * }
 * ```
 */
export function useContentSelector(): ContentSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      subject: context.subject,
      setSubject: context.setSubject,
      characterItems: context.characterItems,
      currentCharacter: context.currentCharacter,
      setCurrentCharacter: context.setCurrentCharacter,
      location: context.location,
      setLocation: context.setLocation,
      addCharacter: context.addCharacter,
      removeCharacter: context.removeCharacter,
    }),
    [
      context.subject,
      context.setSubject,
      context.characterItems,
      context.currentCharacter,
      context.setCurrentCharacter,
      context.location,
      context.setLocation,
      context.addCharacter,
      context.removeCharacter,
    ]
  );
}
