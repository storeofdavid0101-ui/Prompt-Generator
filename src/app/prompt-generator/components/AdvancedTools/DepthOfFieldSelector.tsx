/**
 * Depth of Field Selector Component
 *
 * Grid-based selector for depth of field options with conflict detection.
 * Blocked options are visually indicated and disabled based on
 * camera/director/atmosphere conflicts.
 *
 * @module AdvancedTools/DepthOfFieldSelector
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { AlertTriangle, Focus } from 'lucide-react';
import { dofOptions, helpDescriptions } from '../../config';
import { HelpLabel } from '../ui';
import { CSS_CLASSES, OPACITY, DOF_GRID_COLUMNS } from './constants';
import type { DepthOfFieldSelectorProps } from './types';

/**
 * Depth of field option button with conflict awareness
 */
interface DOFButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  isBlocked: boolean;
  isLocked: boolean;
  themeColors: DepthOfFieldSelectorProps['themeColors'];
  onClick: (value: string) => void;
}

/**
 * Individual DOF option button
 */
const DOFButton = memo(function DOFButton({
  value,
  label,
  isSelected,
  isBlocked,
  isLocked,
  themeColors,
  onClick,
}: DOFButtonProps) {
  const isDisabled = isLocked || isBlocked;

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onClick(value);
    }
  }, [isDisabled, onClick, value]);

  /**
   * Memoized button styles based on selection and disabled state
   */
  const buttonStyles = useMemo(
    () => ({
      backgroundColor: isSelected ? themeColors.promptBg : 'transparent',
      borderColor: isSelected ? themeColors.accent : themeColors.borderColor,
      color: themeColors.textPrimary,
      opacity: isDisabled ? OPACITY.blocked : OPACITY.enabled,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }),
    [isSelected, isDisabled, themeColors]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      aria-label={isBlocked ? `${label} - unavailable due to conflicts` : label}
      className={CSS_CLASSES.gridButton}
      style={buttonStyles}
    >
      <span>{label}</span>
      {isBlocked && (
        <AlertTriangle
          className="w-3 h-3 flex-shrink-0"
          style={{ color: themeColors.warning }}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

DOFButton.displayName = 'DOFButton';

/**
 * Depth of field selector with grid layout
 *
 * Displays available DOF options in a responsive grid.
 * Options may be blocked based on conflict detection results.
 *
 * @example
 * ```tsx
 * <DepthOfFieldSelector
 *   value={depthOfField}
 *   conflicts={conflictResults}
 *   isLocked={false}
 *   onChange={handleDOFChange}
 *   themeColors={themeColors}
 * />
 * ```
 */
export const DepthOfFieldSelector = memo(function DepthOfFieldSelector({
  value,
  conflicts,
  isLocked,
  onChange,
  themeColors,
}: DepthOfFieldSelectorProps) {
  /**
   * Handle DOF selection with lock and conflict checks
   */
  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (!isLocked && !conflicts.blockedDOF.has(selectedValue)) {
        onChange(selectedValue);
      }
    },
    [isLocked, conflicts.blockedDOF, onChange]
  );

  return (
    <section aria-labelledby="dof-label">
      <HelpLabel
        icon={Focus}
        label="Depth of Field"
        help={helpDescriptions.depthOfField}
        themeColors={themeColors}
        className="mb-2"
      />
      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${DOF_GRID_COLUMNS}, minmax(0, 1fr))` }}
        role="group"
        aria-label="Depth of field options"
      >
        {dofOptions.map((dof) => (
          <DOFButton
            key={dof.value}
            value={dof.value}
            label={dof.label}
            isSelected={value === dof.value}
            isBlocked={conflicts.blockedDOF.has(dof.value)}
            isLocked={isLocked}
            themeColors={themeColors}
            onClick={handleSelect}
          />
        ))}
      </div>
    </section>
  );
});

DepthOfFieldSelector.displayName = 'DepthOfFieldSelector';
