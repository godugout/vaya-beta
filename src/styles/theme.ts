
// Brand color palette
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: "#113231", // Harmony Green
    light: "#3D5A59",
    dark: "#0A2120",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "#EBDDD6", // Sandstone Skin
    light: "#F5EBE7",
    dark: "#D4C5BD",
  },
  
  // Background colors
  background: {
    DEFAULT: "#FFFFFF", // White
    light: "#F8F8F8", // Light gray
    dark: "#222222", // Dark mode background
    gradient: "linear-gradient(to bottom, #F8F8F8, #FFFFFF)",
  },
  
  // Accent colors - using Lovable colors for important CTAs
  accent: {
    turquoise: "#00CED1",
    purple: "#8A2BE2",
    magenta: "#FF3366",
  },
  
  // Text colors
  text: {
    primary: "#113231", // Dark green
    secondary: "#5E7472", // Medium green-gray
    light: "#FFFFFF", // White text for dark backgrounds
    muted: "#94A3A2", // Muted green-gray
  },
  
  // Feature section colors
  features: {
    stories: "#FF3366", // Lovable Magenta for stories
    memories: "#00CED1", // Lovable Teal for memory lane
    capsules: "#8A2BE2", // Lovable Purple for family capsules
    narra: "#4169E1", // Lovable Blue for Narra AI assistant
  },
  
  // Lovable logo colors with variations (kept for accent buttons)
  lovable: {
    // Bright pink/magenta
    magenta: {
      bright: "#FF1A53", // Brighter version
      DEFAULT: "#FF3366", // Original
      light: "#FF708C", // Lighter shade
    },
    // Vibrant purple
    purple: {
      bright: "#9D33FF", // Brighter version
      DEFAULT: "#8A2BE2", // Original
      light: "#A555FF", // Lighter shade
    },
    // Deep blue
    blue: {
      bright: "#4D7AFF", // Brighter version
      DEFAULT: "#4169E1", // Original
      light: "#7695FF", // Lighter shade
    },
    // Teal/cyan
    teal: {
      bright: "#00E6EA", // Brighter version
      DEFAULT: "#00CED1", // Original
      light: "#4DDFE1", // Lighter shade
    },
    // Light blue
    skyblue: {
      bright: "#5DB7FF", // Brighter version
      DEFAULT: "#87CEFA", // Original
      light: "#B0DFFF", // Lighter shade
    },
  },
  
  // Greystone branded colors
  greystone: {
    // Primary green
    green: {
      DEFAULT: "#113231", // Harmony Green - Primary color
      90: "#1E3D3C",
      80: "#2B4847",
      70: "#385352",
      60: "#455F5D",
      50: "#566A68",
      40: "#778786",
      30: "#98A3A3",
      20: "#B9C0BF",
      10: "#DBDDDC",
    },
    // Secondary sandstone
    sandstone: {
      DEFAULT: "#EBDDD6", // Sandstone Skin - Secondary color
      dark: "#D4C5BD",
      darker: "#BEA99F",
    },
    // UI colors
    ui: {
      black: "#222222",
      white: "#FFFFFF",
      gray: "#F8F8F8",
      error: "#E53E3E",
      success: "#38A169",
      warning: "#DD6B20",
    }
  }
};

// Animation durations
export const animation = {
  fast: "200ms",
  default: "300ms",
  slow: "400ms",
  pulse: "1500ms",
};

// Typography scale
export const typography = {
  fontFamily: {
    heading: "TT Hoves Pro, system-ui, sans-serif",
    body: "Borna, sans-serif",
    mono: "monospace",
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

// Spacing scale
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
};

// Border radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Z-index values
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: "auto",
};

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
