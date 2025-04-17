
/**
 * Text Style Definitions
 * 
 * This file defines combined text styles for common UI elements.
 * Each style combines font family, size, weight, line height, and letter spacing.
 */

import { fontFamilies } from './font-families';
import { fontWeights } from './font-weights';
import { fontSizes } from './font-sizes';
import { lineHeights } from './line-heights';
import { letterSpacings } from './letter-spacings';

export const textStyles = {
  // Headings
  h1: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h3: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h4: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  h5: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  h6: {
    fontFamily: fontFamilies.heading,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
  },
  bodyDefault: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
  },
  bodySmall: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  
  // UI elements
  button: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.none,
  },
  caption: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  label: {
    fontFamily: fontFamilies.main,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
  },
  
  // Specialty styles
  storyText: {
    fontFamily: fontFamilies.story,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.loose,
  },
  handwritten: {
    fontFamily: fontFamilies.architectsDaughter,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
  },
  monospace: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
}
