
import { FamilyTheme } from "./types";
import { ColorInput } from "./ColorInput";

interface ThemeColorInputsProps {
  theme: FamilyTheme;
  onColorChange: (colorType: 'primaryColor' | 'secondaryColor' | 'textColor', value: string) => void;
}

export const ThemeColorInputs = ({ theme, onColorChange }: ThemeColorInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ColorInput
        id="primaryColor"
        label="Primary Color"
        value={theme.primaryColor}
        onChange={(value) => onColorChange('primaryColor', value)}
      />
      
      <ColorInput
        id="secondaryColor"
        label="Secondary Color"
        value={theme.secondaryColor}
        onChange={(value) => onColorChange('secondaryColor', value)}
      />
      
      <ColorInput
        id="textColor"
        label="Text Color"
        value={theme.textColor}
        onChange={(value) => onColorChange('textColor', value)}
      />
    </div>
  );
};
