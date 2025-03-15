
import { FamilyTheme, ThemePreset } from "./types";
import { ThemePresetsSelector } from "./ThemePresetsSelector";

interface ThemeHeaderProps {
  currentTheme: FamilyTheme;
  onPresetSelected: (preset: ThemePreset) => void;
}

export const ThemeHeader = ({ currentTheme, onPresetSelected }: ThemeHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-vaya-text-primary">
        Family Theme
      </h3>
      
      <ThemePresetsSelector 
        currentTheme={currentTheme} 
        onPresetSelected={onPresetSelected} 
      />
    </div>
  );
};
