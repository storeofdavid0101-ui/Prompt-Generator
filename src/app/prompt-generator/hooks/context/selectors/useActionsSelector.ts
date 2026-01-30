/**
 * Actions Selector Hook
 *
 * Provides access to prompt output and actions (copy, reset).
 * Use this for components managing prompt output.
 *
 * @module hooks/context/selectors/useActionsSelector
 */

'use client';

import { useMemo } from 'react';
import { usePromptGeneratorContext } from '../PromptGeneratorContext';

/**
 * Actions selector return type
 */
export interface ActionsSelectorReturn {
  /** Generated prompt string */
  readonly prompt: string;
  /** Whether content was recently copied */
  readonly copied: boolean;
  /** Copy prompt to clipboard with analytics tracking */
  readonly copyToClipboard: () => Promise<void>;
  /** Reset all unlocked sections to defaults */
  readonly resetAll: () => void;
}

/**
 * Hook to access prompt output and actions
 *
 * @returns Prompt and action handlers
 *
 * @example
 * ```tsx
 * function OutputBar() {
 *   const { prompt, copied, copyToClipboard, resetAll } = useActionsSelector();
 *   return (
 *     <div>
 *       <pre>{prompt}</pre>
 *       <button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
 *       <button onClick={resetAll}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useActionsSelector(): ActionsSelectorReturn {
  const context = usePromptGeneratorContext();

  return useMemo(
    () => ({
      prompt: context.prompt,
      copied: context.copied,
      copyToClipboard: context.copyToClipboard,
      resetAll: context.resetAll,
    }),
    [context.prompt, context.copied, context.copyToClipboard, context.resetAll]
  );
}
