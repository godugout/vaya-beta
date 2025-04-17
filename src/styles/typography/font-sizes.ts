
/**
 * Font Size Definitions
 * 
 * This file centralizes all font size configurations following the 8px grid system.
 */

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

// Fluid typography helpers for responsive designs
export const fluidTypography = {
  headingLarge: 'clamp(2.5rem, 5vw, 4rem)',
  headingMedium: 'clamp(2rem, 4vw, 3rem)',
  headingSmall: 'clamp(1.5rem, 3vw, 2rem)',
  paragraph: 'clamp(1rem, 2vw, 1.125rem)',
}
