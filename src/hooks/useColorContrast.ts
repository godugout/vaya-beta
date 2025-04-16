
import { calculateContrast, meetsWcagAA, meetsWcagAAA } from '@/lib/colorUtils';
import { vayaColors } from '@/styles/theme/colors/vaya';

export interface ContrastResult {
  combination: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}

export const useColorContrast = () => {
  const checkContrast = (color1: string, color2: string, name: string): ContrastResult => {
    const ratio = calculateContrast(color1, color2);
    return {
      combination: name,
      ratio,
      passesAA: meetsWcagAA(ratio),
      passesAAA: meetsWcagAAA(ratio)
    };
  };

  const results: ContrastResult[] = [
    // Text on backgrounds
    checkContrast(vayaColors.text.primary, vayaColors.background.white, "Text Primary on White"),
    checkContrast(vayaColors.text.primary, vayaColors.background.light, "Text Primary on Light"),
    checkContrast(vayaColors.text.inverse, vayaColors.background.dark, "Text Inverse on Dark"),
    
    // UI Elements
    checkContrast(vayaColors.ui.success, vayaColors.background.white, "Success on White"),
    checkContrast(vayaColors.ui.error, vayaColors.background.white, "Error on White"),
    checkContrast(vayaColors.ui.warning, vayaColors.background.white, "Warning on White"),
    
    // Brand Colors
    checkContrast(vayaColors.primary, vayaColors.background.white, "Primary on White"),
    checkContrast(vayaColors.secondary, vayaColors.background.white, "Secondary on White")
  ];

  return { results };
};
