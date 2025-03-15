
// Base unit of 8px for consistency
const BASE = 8;

export const spacing = {
  0: "0",
  1: `${BASE * 0.25}px`,    // 2px
  2: `${BASE * 0.5}px`,     // 4px
  3: `${BASE * 0.75}px`,    // 6px
  4: `${BASE}px`,           // 8px
  5: `${BASE * 1.25}px`,    // 10px
  6: `${BASE * 1.5}px`,     // 12px
  8: `${BASE * 2}px`,       // 16px
  10: `${BASE * 2.5}px`,    // 20px
  12: `${BASE * 3}px`,      // 24px
  16: `${BASE * 4}px`,      // 32px
  20: `${BASE * 5}px`,      // 40px
  24: `${BASE * 6}px`,      // 48px
  32: `${BASE * 8}px`,      // 64px
  40: `${BASE * 10}px`,     // 80px
  48: `${BASE * 12}px`,     // 96px
  56: `${BASE * 14}px`,     // 112px
  64: `${BASE * 16}px`,     // 128px
};

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

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  // Elevation system mapped to shadows
  elevation1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  elevation2: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
  elevation3: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
  elevation4: "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
  elevation5: "0 20px 40px rgba(0,0,0,0.2)",
};

export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: "auto",
  modal: 1000,
  popup: 900,
  tooltip: 800,
  overlay: 700,
  dropdown: 600,
  header: 100,
};

// Media query breakpoints - adds better tablet support
export const breakpoints = {
  xs: "480px",   // Extra small devices
  sm: "640px",   // Small devices, phones
  md: "768px",   // Medium devices, tablets
  lg: "1024px",  // Large devices, laptops
  xl: "1280px",  // Extra large devices, desktops
  "2xl": "1536px", // 2X large devices, large desktops
};
