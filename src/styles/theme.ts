
// Brand color palette
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: "#6C5CE7", // Rich purple
    light: "#8A7EEC",
    dark: "#5348C0",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "#FF7675", // Vibrant coral
    light: "#FF9D9C",
    dark: "#E56160",
  },
  
  // Background colors
  background: {
    DEFAULT: "#FFFFFF", // White
    light: "#F8F5FF", // Light lavender
    gradient: "linear-gradient(to bottom, #F8F5FF, #FFFFFF)",
  },
  
  // Accent colors
  accent: {
    turquoise: "#00CEC9",
    yellow: "#FFEAA7",
  },
  
  // Text colors
  text: {
    primary: "#2D3436", // Deep indigo
    secondary: "#636E72", // Warm gray
  },
  
  // Feature section colors
  features: {
    stories: "#FF7675", // Vibrant coral for stories
    memories: "#00CEC9", // Turquoise for memory lane
    capsules: "#6C5CE7", // Purple for family capsules
    narra: "#FFEAA7", // Yellow for Narra AI assistant
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
    heading: "Montserrat, sans-serif",
    body: "Inter, sans-serif",
    story: "Georgia, serif",
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
