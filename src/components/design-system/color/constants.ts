
import { ColorCombination } from './types';
import { vayaColors } from '@/styles/theme/colors/vaya';

export const colorCombinations: ColorCombination[] = [
  {
    name: "Primary Action",
    background: vayaColors.primary,
    text: "#FFFFFF",
    example: "Button"
  },
  {
    name: "Secondary Action",
    background: vayaColors.secondary,
    text: "#FFFFFF",
    example: "Button"
  },
  {
    name: "Success State",
    background: vayaColors.ui.success,
    text: "#FFFFFF",
    example: "Alert"
  },
  {
    name: "Warning State",
    background: vayaColors.ui.warning,
    text: "#000000",
    example: "Notice"
  },
  {
    name: "Error State",
    background: vayaColors.ui.error,
    text: "#FFFFFF",
    example: "Alert"
  },
  {
    name: "Info State",
    background: vayaColors.ui.info,
    text: "#FFFFFF",
    example: "Message"
  }
];
