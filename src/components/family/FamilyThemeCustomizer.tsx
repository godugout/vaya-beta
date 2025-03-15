
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
    primaryColor: "#FF7675", // Brand coral color
    secondaryColor: "#6C5CE7", // Brand purple color
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
    <div className="space-y-6 bg-white dark:bg-dark-background-surface dark:text-dark-text-primary dark:rounded-lg dark:p-4 transition-colors duration-300 border border-transparent dark:border-dark-border">
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
