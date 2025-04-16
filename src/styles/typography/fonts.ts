
/**
 * Font Management System
 * 
 * This file centralizes font configuration and provides utility classes and constants
 * for consistent typography across the application.
 */

// Font family definitions
export const fontFamilies = {
  // Primary fonts
  main: 'Inter Tight, system-ui, sans-serif',
  heading: 'Montserrat, system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  
  // Specialty fonts
  architectsDaughter: 'Architects Daughter, cursive',
  story: 'Georgia, serif',
  
  // Brand fonts (premium/licensed)
  ttHovesPro: 'TT Hoves Pro, sans-serif',
  borna: 'Borna, sans-serif',
}

// Font weight mapping
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

// Font size scale in rems - following 8px grid system
export const fontSizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
}

// Fluid typography helpers
export const fluidTypography = {
  headingLarge: 'clamp(2.5rem, 5vw, 4rem)',
  headingMedium: 'clamp(2rem, 4vw, 3rem)',
  headingSmall: 'clamp(1.5rem, 3vw, 2rem)',
  paragraph: 'clamp(1rem, 2vw, 1.125rem)',
}

// Line height mapping
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}

// Letter spacing
export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

// Font style combinations for common text elements
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

// Font import groups
export const fontImports = {
  // Core font imports (always loaded)
  core: `
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
  `,
  
  // Extended font imports (loaded on demand or in specific contexts)
  extended: `
    @import url('https://fonts.googleapis.com/css2?family=Georgia&family=Architects+Daughter&display=swap');
  `,
  
  // Premium font imports (loaded for premium features or customers)
  premium: `
    /* TT Hoves Pro and Borna are self-hosted */
  `,
};

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
