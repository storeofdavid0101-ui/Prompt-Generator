/**
 * LocationDropdown component
 * Accessible dropdown for selecting location presets or entering custom locations
 * Includes keyboard navigation and proper ARIA attributes
 */

'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  memo,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit3 } from 'lucide-react';
import type { LocationDropdownProps } from './types';
import { KeyboardCodes } from './types';
import type { LocationPreset } from '../../config/locationPresets';
import { LocationPresetList } from './LocationPresetList';

/** Animation variants for dropdown menu */
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} as const;

/** Animation variants for custom input reveal */
const inputVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
} as const;

/** Dropdown option for keyboard navigation */
interface DropdownOption {
  type: 'custom' | 'preset';
  value: string;
  label: string;
}

/** Check if location matches a preset */
function isLocationPreset(location: string, options: DropdownOption[]): boolean {
  if (!location) return false;
  return options.some((opt) => opt.type === 'preset' && opt.value === location);
}

/**
 * LocationDropdown - Accessible location selector with preset support
 */
export const LocationDropdown = memo(function LocationDropdown({
  location,
  isLocked,
  onLocationChange,
  themeColors,
  presetsByCategory,
  categoryNames,
}: LocationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [forceCustomMode, setForceCustomMode] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownId = useId();

  // Flatten all options for keyboard navigation
  const allOptions = useMemo((): DropdownOption[] => {
    const options: DropdownOption[] = [{ type: 'custom', value: '', label: 'Custom' }];
    Object.values(presetsByCategory).forEach((presets) => {
      presets.forEach((preset: LocationPreset) => {
        options.push({ type: 'preset', value: preset.keywords, label: preset.label });
      });
    });
    return options;
  }, [presetsByCategory]);

  // Derive custom mode from location value
  const isCustomMode = useMemo(() => {
    if (location && isLocationPreset(location, allOptions)) return false;
    return forceCustomMode || !location;
  }, [location, allOptions, forceCustomMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus first option when dropdown opens
  useEffect(() => {
    if (isOpen && listRef.current) {
      const firstItem = listRef.current.querySelector('[role="option"]');
      if (firstItem instanceof HTMLElement) firstItem.focus();
    }
  }, [isOpen]);

  // Focus option when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const options = listRef.current.querySelectorAll('[role="option"]');
      const target = options[focusedIndex];
      if (target instanceof HTMLElement) target.focus();
    }
  }, [focusedIndex]);

  const handleToggle = useCallback(() => {
    if (isLocked) return;
    setIsOpen((prev) => {
      setFocusedIndex(prev ? -1 : 0);
      return !prev;
    });
  }, [isLocked]);

  const handlePresetSelect = useCallback((keywords: string) => {
    setForceCustomMode(false);
    onLocationChange(keywords);
    setIsOpen(false);
    setFocusedIndex(-1);
    toggleButtonRef.current?.focus();
  }, [onLocationChange]);

  const handleCustomSelect = useCallback(() => {
    setForceCustomMode(true);
    setIsOpen(false);
    setFocusedIndex(-1);
    setTimeout(() => customInputRef.current?.focus(), 150);
  }, []);

  const handleCustomInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onLocationChange(e.target.value),
    [onLocationChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
        if (e.key === KeyboardCodes.ENTER || e.key === KeyboardCodes.SPACE) {
          e.preventDefault();
          handleToggle();
        }
        return;
      }
      switch (e.key) {
        case KeyboardCodes.ESCAPE:
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          toggleButtonRef.current?.focus();
          break;
        case KeyboardCodes.ARROW_DOWN:
          e.preventDefault();
          setFocusedIndex((p) => (p < allOptions.length - 1 ? p + 1 : 0));
          break;
        case KeyboardCodes.ARROW_UP:
          e.preventDefault();
          setFocusedIndex((p) => (p > 0 ? p - 1 : allOptions.length - 1));
          break;
        case KeyboardCodes.ENTER:
        case KeyboardCodes.SPACE:
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < allOptions.length) {
            const opt = allOptions[focusedIndex];
            if (opt.type === 'custom') {
              handleCustomSelect();
            } else {
              handlePresetSelect(opt.value);
            }
          }
          break;
        case KeyboardCodes.TAB:
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, allOptions, handleToggle, handleCustomSelect, handlePresetSelect]
  );

  // Memoized styles
  const styles = useMemo(() => ({
    toggleButton: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: location ? themeColors.textPrimary : themeColors.textTertiary,
      opacity: isLocked ? 0.6 : 1,
    },
    dropdown: {
      backgroundColor: themeColors.cardBackground,
      border: `1px solid ${themeColors.borderColor}`,
    },
    customOption: {
      backgroundColor: isCustomMode ? `${themeColors.accent}20` : 'transparent',
      color: themeColors.textPrimary,
      borderBottom: `1px solid ${themeColors.borderColor}`,
    },
    categoryHeader: {
      backgroundColor: themeColors.inputBackground,
      color: themeColors.textTertiary,
    },
    customInput: {
      backgroundColor: themeColors.inputBackground,
      border: `1px solid ${themeColors.inputBorder}`,
      color: themeColors.textPrimary,
      opacity: isLocked ? 0.6 : 1,
    },
  }), [themeColors, location, isLocked, isCustomMode]);

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={handleToggle}
        disabled={isLocked}
        className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 flex items-center justify-between"
        style={styles.toggleButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-label={`Location: ${location || 'Select or enter a location'}`}
      >
        <span className="truncate text-left flex-1">
          {location || 'Select or enter a location...'}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: themeColors.textTertiary }}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden"
            style={styles.dropdown}
          >
            <ul
              ref={listRef}
              id={dropdownId}
              role="listbox"
              aria-label="Location options"
              className="max-h-[300px] overflow-y-auto"
            >
              <li
                role="option"
                aria-selected={isCustomMode}
                tabIndex={-1}
                onClick={handleCustomSelect}
                onKeyDown={(e) => {
                  if (e.key === KeyboardCodes.ENTER || e.key === KeyboardCodes.SPACE) {
                    e.preventDefault();
                    handleCustomSelect();
                  }
                }}
                className="w-full px-3 py-2.5 text-sm text-left flex items-center gap-2 cursor-pointer transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-inset"
                style={styles.customOption}
              >
                <Edit3 className="w-3.5 h-3.5" style={{ color: themeColors.accent }} aria-hidden="true" />
                <span>Custom Location</span>
              </li>
              <LocationPresetList
                presetsByCategory={presetsByCategory}
                categoryNames={categoryNames}
                currentLocation={location}
                themeColors={themeColors}
                onSelect={handlePresetSelect}
                categoryHeaderStyle={styles.categoryHeader}
              />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCustomMode && (
          <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="exit" className="mt-2">
            <input
              ref={customInputRef}
              type="text"
              value={location}
              onChange={handleCustomInputChange}
              placeholder="e.g., neon-lit Tokyo street at night"
              disabled={isLocked}
              className="w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2"
              style={styles.customInput}
              aria-label="Custom location description"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LocationDropdown.displayName = 'LocationDropdown';
