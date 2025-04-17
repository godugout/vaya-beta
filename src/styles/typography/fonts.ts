
/**
 * Font Management System
 * 
 * This file centralizes font configuration and provides utility classes and constants
 * for consistent typography across the application.
 * 
 * Note: This file now imports from modular files for better maintainability.
 */

import { fontFamilies } from './font-families';
import { fontWeights } from './font-weights';
import { fontSizes, fluidTypography } from './font-sizes';
import { lineHeights } from './line-heights';
import { letterSpacings } from './letter-spacings';
import { textStyles } from './text-styles';
import { fontImports } from './font-imports';
import { fontCustomProperties } from './custom-properties';

// Re-export everything for backward compatibility
export {
  fontFamilies,
  fontWeights,
  fontSizes,
  fluidTypography,
  lineHeights,
  letterSpacings,
  textStyles,
  fontImports,
  fontCustomProperties
};
