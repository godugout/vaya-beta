
export type ThemeStyle = 'classic' | 'modern' | 'rustic';

export interface ThemeStyles {
  accent: string;
  button: string;
  borderAccent: string;
  bgAccent: string;
}

export const getThemeStyles = (theme: ThemeStyle): ThemeStyles => {
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      button: 'autumn',
      borderAccent: 'border-autumn',
      bgAccent: 'bg-autumn'
    },
    modern: {
      accent: 'text-water',
      button: 'water',
      borderAccent: 'border-water',
      bgAccent: 'bg-water'
    },
    rustic: {
      accent: 'text-forest',
      button: 'forest',
      borderAccent: 'border-forest',
      bgAccent: 'bg-forest'
    }
  };
  
  return themeStyles[theme];
};
