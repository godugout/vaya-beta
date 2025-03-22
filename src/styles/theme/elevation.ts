
/**
 * Elevation system with 5 standardized levels
 * Used for consistent shadows across the application
 */
export const elevation = {
  // Level 1: Subtle, for hover states, subtle cards
  1: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    zIndex: 1
  },
  
  // Level 2: Cards, buttons, most components
  2: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    zIndex: 2
  },
  
  // Level 3: Dropdown menus, navigation drawers
  3: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    zIndex: 3
  },
  
  // Level 4: Modals, dialogs
  4: {
    boxShadow: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
    zIndex: 4
  },
  
  // Level 5: Toasts, notifications, highest elements
  5: {
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    zIndex: 5
  }
};

// Dark mode variants with adjusted opacity for better contrast
export const darkElevation = {
  1: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.4)',
    zIndex: 1
  },
  2: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.25)',
    zIndex: 2
  },
  3: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.2)',
    zIndex: 3
  },
  4: {
    boxShadow: '0 15px 25px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.15)',
    zIndex: 4
  },
  5: {
    boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
    zIndex: 5
  }
};

// Helper for applying elevation
export const applyElevation = (level: 1 | 2 | 3 | 4 | 5, isDarkMode = false) => {
  const elevationSet = isDarkMode ? darkElevation : elevation;
  return elevationSet[level];
};
