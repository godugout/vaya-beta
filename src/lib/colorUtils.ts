
/**
 * Utility functions for working with colors and ensuring accessibility
 */

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color (e.g. #FFFFFF)
 * @returns RGB values as object {r, g, b}
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle shorthand hex (e.g. #FFF)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Calculates the luminance of an RGB color
 * Used for contrast calculations
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Luminance value (0-1)
 */
export const calculateLuminance = (r: number, g: number, b: number): number => {
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // Calculate RGB values
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  // Calculate luminance using WCAG formula
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First color in hex format (e.g. #FFFFFF)
 * @param color2 - Second color in hex format (e.g. #000000)
 * @returns Contrast ratio (1:1 to 21:1)
 */
export const calculateContrast = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 0;
  }

  const luminance1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighterLum = Math.max(luminance1, luminance2);
  const darkerLum = Math.min(luminance1, luminance2);

  return (lighterLum + 0.05) / (darkerLum + 0.05);
};

/**
 * Checks if a contrast ratio meets WCAG AA standards
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether the text is large (18pt+)
 * @returns Whether the contrast meets WCAG AA standards
 */
export const meetsWcagAA = (ratio: number, isLargeText: boolean = false): boolean => {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

/**
 * Checks if a contrast ratio meets WCAG AAA standards
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether the text is large (18pt+)
 * @returns Whether the contrast meets WCAG AAA standards
 */
export const meetsWcagAAA = (ratio: number, isLargeText: boolean = false): boolean => {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Returns the appropriate text color (black or white) for a given background color
 * @param backgroundColor - Background color in hex format
 * @returns Text color (#000000 or #FFFFFF)
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const rgb = hexToRgb(backgroundColor);
  
  if (!rgb) {
    return '#000000';
  }
  
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
  
  // If luminance is greater than 0.5, background is light, so use dark text
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
