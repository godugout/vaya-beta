
import { useWeddingMode } from '../../WeddingModeProvider';

export function useProximityTheme() {
  const { theme } = useWeddingMode();
  
  const themeStyles = {
    classic: {
      accent: 'text-autumn',
      primary: 'bg-autumn/20',
      secondary: 'ring-autumn/30',
      progressBg: 'bg-autumn'
    },
    modern: {
      accent: 'text-water',
      primary: 'bg-water/20',
      secondary: 'ring-water/30',
      progressBg: 'bg-water'
    },
    rustic: {
      accent: 'text-forest',
      primary: 'bg-forest/20',
      secondary: 'ring-forest/30',
      progressBg: 'bg-forest'
    }
  };
  
  return themeStyles[theme];
}
