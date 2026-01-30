/**
 * Prompt Generator Context
 *
 * Provides centralized state management for the prompt generator.
 * Uses React Context for efficient state distribution to components.
 *
 * Architecture:
 * - Context holds references to domain-specific state hooks
 * - Components can subscribe to specific slices via selector hooks
 * - Reduces prop drilling and enables selective re-rendering
 *
 * @module hooks/context/PromptGeneratorContext
 */

'use client';

import { createContext, useContext } from 'react';
import type { PromptGeneratorStateReturn } from '../state/types';

/**
 * Context value type
 *
 * Wraps the full state return to allow for future extensions
 * like adding dispatch methods or middleware.
 */
export interface PromptGeneratorContextValue extends PromptGeneratorStateReturn {}

/**
 * Prompt Generator Context
 *
 * Provides access to all prompt generator state and actions.
 * Must be used within a PromptGeneratorProvider.
 */
export const PromptGeneratorContext = createContext<PromptGeneratorContextValue | null>(null);

/**
 * Display name for React DevTools
 */
PromptGeneratorContext.displayName = 'PromptGeneratorContext';

/**
 * Hook to access the full prompt generator context
 *
 * Throws an error if used outside of PromptGeneratorProvider.
 * For most use cases, prefer domain-specific selector hooks.
 *
 * @throws {Error} When used outside of PromptGeneratorProvider
 * @returns Full prompt generator state and actions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { selectedModel, setSelectedModel } = usePromptGeneratorContext();
 *   return <div>{selectedModel}</div>;
 * }
 * ```
 */
export function usePromptGeneratorContext(): PromptGeneratorContextValue {
  const context = useContext(PromptGeneratorContext);

  if (context === null) {
    throw new Error(
      'usePromptGeneratorContext must be used within a PromptGeneratorProvider. ' +
        'Wrap your component tree with <PromptGeneratorProvider>.'
    );
  }

  return context;
}
