
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FamilyTheme, FamilyThemeCustomizerProps, ThemePreset } from "./theme/types";
import { ThemePreview } from "./theme/ThemePreview";
import { ThemeHeader } from "./theme/ThemeHeader";
import { ThemeColorInputs } from "./theme/ThemeColorInputs";
import { ThemeSaveButton } from "./theme/ThemeSaveButton";
import { useTheme } from "next-themes";

export default function FamilyThemeCustomizer({
  familyId,
  initialTheme,
  onThemeChange
}: FamilyThemeCustomizerProps) {
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const [theme, setTheme] = useState<FamilyTheme>(initialTheme || {
    primaryColor: isDark ? "#8B5CF6" : "#6C5CE7",
    secondaryColor: isDark ? "#C4B5FD" : "#A29BFE",
    textColor: isDark ? "#F8F9FA" : "#2D3436"
  });

  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor' | 'textColor', value: string) => {
    const newTheme = { ...theme, [colorType]: value };
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  const handlePresetSelected = (preset: ThemePreset) => {
    setTheme(preset);
    if (onThemeChange) {
      onThemeChange(preset);
    }
  };

  const handleSaveTheme = () => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
    toast({
      title: "Theme Saved",
      description: "Your family's custom theme has been updated.",
    });
  };

  return (
    <div className="space-y-6 dark:bg-[#1A1F2C] dark:text-white dark:rounded-lg dark:p-4 transition-colors duration-300">
      <ThemeHeader 
        currentTheme={theme} 
        onPresetSelected={handlePresetSelected} 
      />
      
      <ThemeColorInputs 
        theme={theme} 
        onColorChange={handleColorChange} 
      />

      <ThemePreview theme={theme} />
      
      <ThemeSaveButton onSave={handleSaveTheme} />
    </div>
  );
}
