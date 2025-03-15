
// Brand color palette
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: "#6C5CE7", // Rich purple
    light: "#8F84EB",
    dark: "#5649C0",
  },
  
  // Secondary colors
  secondary: {
    DEFAULT: "#FF7675", // Vibrant coral/orange
    light: "#FF9897",
    dark: "#E55A59",
  },
  
  // Background colors
  background: {
    DEFAULT: "#FFFFFF", // White
    light: "#F8F5FF", // Light lavender
    dark: "#2D3436", // Deep indigo for dark mode
    gradient: "linear-gradient(to bottom, #F8F5FF, #FFFFFF)",
  },
  
  // Accent colors
  accent: {
    turquoise: "#00CEC9", // Turquoise for success
    yellow: "#FFEAA7", // Pastel yellow for notifications
    coral: "#FF7675", // Coral for highlights
  },
  
  // Text colors
  text: {
    primary: "#2D3436", // Deep indigo
    secondary: "#636E72", // Warm gray
    light: "#FFFFFF", // White text for dark backgrounds
    muted: "#A0AEC0", // Muted text
  },
  
  // Feature section colors
  features: {
    stories: "#FF7675", // Coral for stories
    memories: "#00CEC9", // Turquoise for memory lane
    capsules: "#6C5CE7", // Purple for family capsules
    narra: "#4169E1", // Royal blue for Narra AI assistant
    home: "#FF9F43", // Warm orange for home
    account: "#00B894", // Teal for account
    
    // Accent colors
    "accent-green": "#55EFC4",
    "accent-blue": "#74B9FF",
    "accent-purple": "#A29BFE",
    "accent-yellow": "#FFEAA7",
    "accent-orange": "#FF9F43",
    "accent-turquoise": "#00CEC9",
    "accent-coral": "#FF7675",
  },
  
  // Lovable logo colors
  lovable: {
    // Vibrant coral/orange - primary brand color
    coral: {
      bright: "#FF8E8D",
      DEFAULT: "#FF7675",
      light: "#FFACAB",
    },
    // Rich purple - primary UI color
    purple: {
      bright: "#8F84EB",
      DEFAULT: "#6C5CE7",
      light: "#A29BFE",
    },
    // Royal blue
    blue: {
      bright: "#5C85E6",
      DEFAULT: "#4169E1",
      light: "#74B9FF",
    },
    // Turquoise
    teal: {
      bright: "#33E5E2",
      DEFAULT: "#00CEC9",
      light: "#55EFC4",
    },
    // Sky blue
    skyblue: {
      bright: "#5DB7FF",
      DEFAULT: "#87CEFA",
      light: "#B0DFFF",
    },
    // Warm orange
    orange: {
      bright: "#FFA75A",
      DEFAULT: "#FF9F43",
      light: "#FFBE7A",
    },
    // Pastel yellow
    yellow: {
      bright: "#FFF0C4",
      DEFAULT: "#FFEAA7",
      light: "#FFF5D1",
    },
    // Deep indigo
    indigo: {
      bright: "#454C4E",
      DEFAULT: "#2D3436",
      light: "#636E72",
    },
  },
  
  // Greystone branded colors
  greystone: {
    // Primary green
    green: {
      DEFAULT: "#2D3436", // Updated to deep indigo for consistency
      90: "#3E4446",
      80: "#4F5456",
      70: "#606466",
      60: "#717576",
      50: "#828586",
      40: "#939596",
      30: "#A4A6A6",
      20: "#B5B7B6",
      10: "#C6C7C6",
    },
    // Secondary sandstone updated to warm tones
    sandstone: {
      DEFAULT: "#FFF5D1", // Light yellow
      dark: "#FFEAA7", // Pastel yellow
      darker: "#FFD166", // Darker yellow
    },
    // UI colors
    ui: {
      black: "#2D3436",
      white: "#FFFFFF",
      gray: "#F8F5FF",
      error: "#FF6B6B",
      success: "#00B894",
      warning: "#FF9F43",
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
      DEFAULT: "#6C5CE7",
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#FF7675",
      foreground: "#FFFFFF",
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
      DEFAULT: "#00CEC9",
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
  },
  
  // Vaya specific branded colors
  vaya: {
    // Text colors
    text: {
      primary: "#2D3436", // Deep indigo
      secondary: "#636E72", // Warm gray
      muted: "#A0AEC0", // Muted text
    },
    // Background colors
    background: {
      light: "#F8F5FF", // Light lavender
      paper: "#FFFFFF", // White
      subtle: "#F7FAFC", // Very light gray
    },
    // Brand colors
    brand: {
      primary: "#6C5CE7", // Rich purple
      secondary: "#FF7675", // Vibrant coral/orange
      tertiary: "#00CEC9", // Turquoise
    },
    // Accent colors
    accent: {
      green: "#55EFC4",
      blue: "#74B9FF", 
      purple: "#A29BFE",
      yellow: "#FFEAA7",
      orange: "#FF9F43",
      turquoise: "#00CEC9",
      coral: "#FF7675",
    },
    // Feature colors
    stories: "#FF7675", // Coral for stories
    memories: "#00CEC9", // Turquoise for memory lane
    capsules: "#6C5CE7", // Purple for family capsules
    home: "#FF9F43", // Warm orange for home
    narra: "#4169E1", // Royal blue for Narra AI assistant
    
    // UI state colors
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    }
  }
};

