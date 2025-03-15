
import { FamilyTheme, ThemePreset } from "./types";
import { ThemePresetsSelector } from "./ThemePresetsSelector";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeHeaderProps {
  currentTheme: FamilyTheme;
  onPresetSelected: (preset: ThemePreset) => void;
}

export const ThemeHeader = ({ currentTheme, onPresetSelected }: ThemeHeaderProps) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-vaya-text-primary dark:text-white">
          Family Theme
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-vaya-gray-600" />
          )}
        </Button>
      </div>
      
      <ThemePresetsSelector 
        currentTheme={currentTheme} 
        onPresetSelected={onPresetSelected} 
      />
    </div>
  );
};
