
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
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-tight dark:text-white">
          Family Theme
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
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
