
export type ThemeStyle = 'classic' | 'modern' | 'rustic';

export interface ThemeStyles {
  accent: string;
  button: "forest" | "water" | "autumn";
  borderAccent: string;
  bgAccent: string;
  // Add new properties for elevation and responsive layouts
  elevation: string;
  fontPrimary: string;
  fontSecondary: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  gridBase: number;
  // Color values for direct use in styles
  accentColor: string;
  accentColorHover: string;
  textOnAccent: string;
}

// Color mapping for theme styles
const colorMap = {
  classic: {
    main: 'autumn',
    color: '#F2992D',
    hover: '#E08A20',
    text: '#FFFFFF'
  },
  modern: {
    main: 'water',
    color: '#449EBA',
    hover: '#3A8DA7',
    text: '#FFFFFF'
  },
  rustic: {
    main: 'forest',
    color: '#154734',
    hover: '#0E3524',
    text: '#FFFFFF'
  }
};

// Base grid unit (8px)
const GRID_BASE = 8;

export const getThemeStyles = (theme: ThemeStyle): ThemeStyles => {
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn' as const,
      borderAccent: 'border-autumn',
      bgAccent: 'bg-autumn',
      elevation: 'shadow-md',
      fontPrimary: 'font-heading',
      fontSecondary: 'font-story',
      radiusSm: 'rounded',
      radiusMd: 'rounded-md',
      radiusLg: 'rounded-lg',
      gridBase: GRID_BASE,
      accentColor: colorMap.classic.color,
      accentColorHover: colorMap.classic.hover,
      textOnAccent: colorMap.classic.text,
    },
    modern: {
      accent: 'text-water',
      button: 'water' as const,
      borderAccent: 'border-water',
      bgAccent: 'bg-water',
      elevation: 'shadow-lg',
      fontPrimary: 'font-heading',
      fontSecondary: 'font-body',
      radiusSm: 'rounded-sm',
      radiusMd: 'rounded',
      radiusLg: 'rounded-md',
      gridBase: GRID_BASE,
      accentColor: colorMap.modern.color,
      accentColorHover: colorMap.modern.hover,
      textOnAccent: colorMap.modern.text,
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest' as const,
      borderAccent: 'border-forest',
      bgAccent: 'bg-forest',
      elevation: 'shadow',
      fontPrimary: 'font-heading',
      fontSecondary: 'font-story',
      radiusSm: 'rounded-sm',
      radiusMd: 'rounded',
      radiusLg: 'rounded-md',
      gridBase: GRID_BASE,
      accentColor: colorMap.rustic.color,
      accentColorHover: colorMap.rustic.hover,
      textOnAccent: colorMap.rustic.text,
    }
  };
  
  return themeStyles[theme];
};

// Helper functions for responsive layouts
export const getResponsiveValue = (
  base: number | string,
  { sm, md, lg }: { sm?: number | string; md?: number | string; lg?: number | string }
) => {
  return {
    base,
    sm: sm || base,
    md: md || sm || base,
    lg: lg || md || sm || base
  };
};

// Calculate grid-based spacing
export const gridUnits = (units: number): string => {
  return `${units * GRID_BASE}px`;
};

// Media query breakpoints for consistent responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
