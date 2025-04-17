
/**
 * Font Import Management
 * 
 * This file centralizes font import statements for different contexts.
 */

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
