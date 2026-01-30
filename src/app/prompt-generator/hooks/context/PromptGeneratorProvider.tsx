/**
 * Prompt Generator Provider
 *
 * Root provider component that provides prompt generator state
 * through React Context to the component tree.
 *
 * Uses the existing usePromptGeneratorState hook internally
 * to avoid code duplication and ensure consistency.
 *
 * @module hooks/context/PromptGeneratorProvider
 */

'use client';

import { type ReactNode } from 'react';
import { PromptGeneratorContext } from './PromptGeneratorContext';
import { usePromptGeneratorState } from '../usePromptGeneratorState';

/**
 * Props for PromptGeneratorProvider
 */
interface PromptGeneratorProviderProps {
  /** Child components to render within the provider */
  children: ReactNode;
}

/**
 * Provider component for prompt generator state
 *
 * Wraps the application (or relevant subtree) to provide
 * access to all prompt generator state through context.
 *
 * The provider uses usePromptGeneratorState internally,
 * so components can use either:
 * - usePromptGeneratorContext() for context-based access
 * - Selector hooks for optimized subscriptions
 *
 * @param props - Provider props containing children
 * @returns Provider component wrapping children
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <PromptGeneratorProvider>
 *       <PromptGenerator />
 *     </PromptGeneratorProvider>
 *   );
 * }
 * ```
 */
export function PromptGeneratorProvider({ children }: PromptGeneratorProviderProps) {
  const state = usePromptGeneratorState();

  return (
    <PromptGeneratorContext.Provider value={state}>
      {children}
    </PromptGeneratorContext.Provider>
  );
}
