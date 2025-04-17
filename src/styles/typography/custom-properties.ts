
/**
 * Typography CSS Custom Properties Generator
 * 
 * This file generates CSS custom properties for typography values.
 */

import { fontFamilies } from './font-families';
import { fontWeights } from './font-weights';
import { fontSizes } from './font-sizes';
import { lineHeights } from './line-heights';
import { letterSpacings } from './letter-spacings';

// CSS Custom properties generator for fonts
export const fontCustomProperties = `
  :root {
    /* Font families */
    --font-family-main: ${fontFamilies.main};
    --font-family-heading: ${fontFamilies.heading};
    --font-family-mono: ${fontFamilies.mono};
    --font-family-architects-daughter: ${fontFamilies.architectsDaughter};
    --font-family-story: ${fontFamilies.story};
    
    /* Font sizes */
    --font-size-xs: ${fontSizes.xs};
    --font-size-sm: ${fontSizes.sm};
    --font-size-base: ${fontSizes.base};
    --font-size-lg: ${fontSizes.lg};
    --font-size-xl: ${fontSizes.xl};
    --font-size-2xl: ${fontSizes['2xl']};
    --font-size-3xl: ${fontSizes['3xl']};
    --font-size-4xl: ${fontSizes['4xl']};
    --font-size-5xl: ${fontSizes['5xl']};
    --font-size-6xl: ${fontSizes['6xl']};
    
    /* Font weights */
    --font-weight-light: ${fontWeights.light};
    --font-weight-normal: ${fontWeights.normal};
    --font-weight-medium: ${fontWeights.medium};
    --font-weight-semibold: ${fontWeights.semibold};
    --font-weight-bold: ${fontWeights.bold};
    
    /* Line heights */
    --line-height-none: ${lineHeights.none};
    --line-height-tight: ${lineHeights.tight};
    --line-height-snug: ${lineHeights.snug};
    --line-height-normal: ${lineHeights.normal};
    --line-height-relaxed: ${lineHeights.relaxed};
    --line-height-loose: ${lineHeights.loose};
    
    /* Letter spacing */
    --letter-spacing-tighter: ${letterSpacings.tighter};
    --letter-spacing-tight: ${letterSpacings.tight};
    --letter-spacing-normal: ${letterSpacings.normal};
    --letter-spacing-wide: ${letterSpacings.wide};
    --letter-spacing-wider: ${letterSpacings.wider};
    --letter-spacing-widest: ${letterSpacings.widest};
  }
`;
