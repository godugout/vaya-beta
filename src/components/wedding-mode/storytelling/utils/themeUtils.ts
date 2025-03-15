
export type ThemeStyle = 'classic' | 'modern' | 'rustic';

export interface ThemeStyles {
  accent: string;
  button: "forest" | "water" | "autumn";
  borderAccent: string;
  bgAccent: string;
}

export const getThemeStyles = (theme: ThemeStyle): ThemeStyles => {
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn' as const,
      borderAccent: 'border-autumn',
      bgAccent: 'bg-autumn'
    },
    modern: {
      accent: 'text-water',
      button: 'water' as const,
      borderAccent: 'border-water',
      bgAccent: 'bg-water'
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest' as const,
      borderAccent: 'border-forest',
      bgAccent: 'bg-forest'
    }
  };
  
  return themeStyles[theme];
};
