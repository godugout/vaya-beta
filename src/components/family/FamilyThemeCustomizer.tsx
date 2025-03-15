
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FamilyTheme, FamilyThemeCustomizerProps, ThemePreset } from "./theme/types";
import { ThemePreview } from "./theme/ThemePreview";
import { ThemePresetsSelector } from "./theme/ThemePresetsSelector";
import { ColorInput } from "./theme/ColorInput";

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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vaya-text-primary">
          Family Theme
        </h3>
        
        <ThemePresetsSelector 
          currentTheme={theme} 
          onPresetSelected={handlePresetSelected} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorInput
          id="primaryColor"
          label="Primary Color"
          value={theme.primaryColor}
          onChange={(value) => handleColorChange('primaryColor', value)}
        />
        
        <ColorInput
          id="secondaryColor"
          label="Secondary Color"
          value={theme.secondaryColor}
          onChange={(value) => handleColorChange('secondaryColor', value)}
        />
        
        <ColorInput
          id="textColor"
          label="Text Color"
          value={theme.textColor}
          onChange={(value) => handleColorChange('textColor', value)}
        />
      </div>

      <ThemePreview theme={theme} />
      
      <div className="flex justify-end">
        <Button type="button" onClick={handleSaveTheme}>
          Save Theme
        </Button>
      </div>
    </div>
  );
}
