/**
 * @fileoverview Color validation and formatting utilities.
 * Provides functions for validating and normalizing hex color codes.
 */

/** Regex pattern for valid 6-digit hex color codes (with or without #) */
const HEX_COLOR_PATTERN = /^#?[0-9A-Fa-f]{6}$/;

/** Maximum number of custom colors allowed to prevent prompt bloating */
export const MAX_CUSTOM_COLORS = 10;

/**
 * Validates whether a string is a valid 6-digit hex color code.
 *
 * @param color - The color string to validate
 * @returns True if the color is a valid hex code
 *
 * @example
 * isValidHexColor('#FF5733')  // true
 * isValidHexColor('FF5733')   // true
 * isValidHexColor('#FFF')     // false (3-digit not supported)
 * isValidHexColor('invalid')  // false
 */
export function isValidHexColor(color: string): boolean {
  return HEX_COLOR_PATTERN.test(color.trim());
}

/**
 * Formats a hex color code to include the # prefix.
 *
 * @param color - The hex color code to format
 * @returns The color with # prefix
 *
 * @example
 * formatHexColor('FF5733')   // '#FF5733'
 * formatHexColor('#FF5733')  // '#FF5733'
 */
export function formatHexColor(color: string): string {
  const trimmed = color.trim();
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
}

/**
 * Filters an array of color strings to only valid hex colors.
 * Limits the result to MAX_CUSTOM_COLORS to prevent prompt bloating.
 *
 * @param colors - Array of color strings to filter
 * @returns Array containing only valid hex color codes (max 10)
 */
export function filterValidColors(colors: string[]): string[] {
  return colors.filter(isValidHexColor).slice(0, MAX_CUSTOM_COLORS);
}

/**
 * Formats an array of colors into a comma-separated string.
 *
 * @param colors - Array of hex color codes
 * @returns Formatted string of colors joined by commas
 *
 * @example
 * formatColorPalette(['FF5733', '#3498DB'])  // '#FF5733, #3498DB'
 */
export function formatColorPalette(colors: string[]): string {
  return colors.map(formatHexColor).join(', ');
}
