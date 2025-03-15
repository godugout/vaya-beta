
import { FamilyTheme, ThemePreset } from "./types";
import { ThemePresetsSelector } from "./ThemePresetsSelector";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface ThemeHeaderProps {
  currentTheme: FamilyTheme;
  onPresetSelected: (preset: ThemePreset) => void;
}

export const ThemeHeader = ({ currentTheme, onPresetSelected }: ThemeHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-tight dark:text-white">
          Family Theme
        </h2>
        <ThemeToggle variant="icon" />
      </div>
      
      <ThemePresetsSelector 
        currentTheme={currentTheme} 
        onPresetSelected={onPresetSelected} 
      />
    </div>
  );
};
