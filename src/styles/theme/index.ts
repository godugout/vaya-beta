
import { colors } from './colors';
import { typography } from './typography';
import { animation } from './animation';
import { spacing, borderRadius, shadows, zIndex } from './spacing';
import { spaceVaultColors } from './colors/space-vault';
import { sacredColors } from './colors/sacred';
import { dispatchColors } from './colors/dispatch';

// Export the entire theme
export const theme = {
  colors,
  animation,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
};

// Export individual theme components
export {
  colors,
  typography,
  animation,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  // Theme-specific exports
  spaceVaultColors,
  sacredColors,
  dispatchColors
};

// Create theme-specific bundles
export const themeAnjaneya = {
  name: 'anjaneya',
  colors: spaceVaultColors,
  typography: {
    fontFamily: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    }
  }
};

export const themeAmbalal = {
  name: 'ambalal',
  colors: sacredColors,
  typography: {
    fontFamily: {
      heading: "'Mukta Vaani', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    }
  }
};

export const themeDispatch = {
  name: 'dispatch',
  colors: dispatchColors,
  typography: {
    fontFamily: {
      heading: "'Inter Tight', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    }
  }
};

