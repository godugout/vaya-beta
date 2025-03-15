
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FamilyTheme, FamilyThemeCustomizerProps, ThemePreset } from "./theme/types";
import { ThemePreview } from "./theme/ThemePreview";
import { ThemeHeader } from "./theme/ThemeHeader";
import { ThemeColorInputs } from "./theme/ThemeColorInputs";
import { ThemeSaveButton } from "./theme/ThemeSaveButton";

export default function FamilyThemeCustomizer({
  familyId,
  initialTheme,
  onThemeChange
}: FamilyThemeCustomizerProps) {
  const { toast } = useToast();
  const [theme, setTheme] = useState<FamilyTheme>(initialTheme || {
    primaryColor: "#6C5CE7",
    secondaryColor: "#A29BFE",
    textColor: "#2D3436"
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
    <div className="space-y-6">
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
