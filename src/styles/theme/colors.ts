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
    blue: "#0EA5E9", // Changed from purple to blue
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
    capsules: "#0EA5E9", // Changed from purple to blue for family capsules
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
    // Blue replacing purple
    blue: {
      bright: "#33B1F0", // Brighter version
      DEFAULT: "#0EA5E9", // Changed from purple to blue
      light: "#70CFFF", // Lighter shade
    },
    // Deep blue
    navy: {
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
  },
  
  // shadcn/ui specific colors
  shadcn: {
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: {
      DEFAULT: "#113231",
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#EBDDD6",
      foreground: "#113231",
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
      DEFAULT: "#00CED1",
      foreground: "#FFFFFF",
    },
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))",
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))",
    },
  }
};
