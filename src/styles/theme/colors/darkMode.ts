
// Dark mode specific colors
export const darkModeColors = {
  // Dark backgrounds with warm tones
  background: {
    DEFAULT: "#1A1F2C", // Deep blue-gray
    surface: "#222837", // Slightly lighter blue-gray
    elevated: "#2D3748", // Elevated UI components
    inset: "#171C26", // Inset areas
    orange: "#331F17", // Dark warm orange
    red: "#2C1517", // Dark warm red
    green: "#192D1D", // Dark forest green
    purple: "#261E36", // Dark purple
  },
  
  // Text colors for dark mode with better contrast
  text: {
    primary: "#F8F9FA", // Bright white
    secondary: "#A0AEC0", // Muted gray-blue
    tertiary: "#718096", // More muted for least important text
    inverse: "#2D3436", // For buttons with light backgrounds
    highlight: "#FF8E8D", // Bright coral highlight
  },
  
  // Dark mode border colors
  border: {
    DEFAULT: "#2D3748", // Subtle border
    focus: "#4A5568", // Higher contrast border for focus states
    divider: "#2D3748", // Divider lines
    highlight: "#FF7675", // Coral highlight border
  },
  
  // Dark mode accent colors (brighter versions)
  accent: {
    purple: "#8F84EB", // Brighter purple
    coral: "#FF8E8D", // Brighter coral
    teal: "#33E5E2", // Brighter teal
    blue: "#5C85E6", // Brighter blue
    orange: "#FF9F43", // Warm orange
    red: "#FF6B6B", // Warm red
    green: "#68D391", // Warm green
  },
  
  // Feedback colors with better contrast for dark mode
  feedback: {
    error: "#FC8181", // Lighter red for dark backgrounds
    warning: "#F6AD55", // Lighter orange for dark backgrounds
    success: "#68D391", // Lighter green for dark backgrounds
    info: "#63B3ED", // Lighter blue for dark backgrounds
  },
  
  // Glass effects with warmer tints
  glass: {
    DEFAULT: "rgba(26, 31, 44, 0.8)", // Semi-transparent dark background
    overlay: "rgba(26, 31, 44, 0.9)", // More opaque for overlays
    dialog: "rgba(26, 31, 44, 0.95)", // Most opaque for modal dialogs
    orange: "rgba(51, 31, 23, 0.85)", // Warm orange glass
    red: "rgba(44, 21, 23, 0.85)", // Warm red glass
    green: "rgba(25, 45, 29, 0.85)", // Warm green glass
  },
  
  // Shadow colors for dark mode
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)",
    highlight: "0 0 15px rgba(255, 118, 117, 0.4)", // Coral highlight shadow
  },
  
  // Overlay for dark mode
  overlay: "rgba(0, 0, 0, 0.7)",
  
  // Gradients
  gradients: {
    orangeRed: "linear-gradient(135deg, #FF7675 0%, #D53F3F 100%)",
    purpleBlue: "linear-gradient(135deg, #6C5CE7 0%, #4834D4 100%)",
    greenTeal: "linear-gradient(135deg, #68D391 0%, #38B2AC 100%)",
  },
};
