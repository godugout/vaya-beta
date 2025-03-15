
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const ThemePresets = [
  { name: "Ocean", primaryColor: "#0EA5E9", secondaryColor: "#7DD3FC", textColor: "#0F172A" },
  { name: "Forest", primaryColor: "#10B981", secondaryColor: "#6EE7B7", textColor: "#064E3B" },
  { name: "Sunset", primaryColor: "#F59E0B", secondaryColor: "#FCD34D", textColor: "#7C2D12" },
  { name: "Berry", primaryColor: "#EC4899", secondaryColor: "#F9A8D4", textColor: "#831843" },
  { name: "Lavender", primaryColor: "#8B5CF6", secondaryColor: "#C4B5FD", textColor: "#4C1D95" },
  { name: "Coral", primaryColor: "#FF7675", secondaryColor: "#FFACAB", textColor: "#7C2D12" },
];

interface FamilyThemeCustomizerProps {
  familyId?: string;
  initialTheme?: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
  };
  onThemeChange?: (theme: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
  }) => void;
}

export default function FamilyThemeCustomizer({
  familyId,
  initialTheme,
  onThemeChange
}: FamilyThemeCustomizerProps) {
  const { toast } = useToast();
  const [theme, setTheme] = useState(initialTheme || {
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

  const applyPreset = (preset: typeof ThemePresets[0]) => {
    setTheme(preset);
    if (onThemeChange) {
      onThemeChange(preset);
    }
    toast({
      title: "Theme Updated",
      description: `Applied the ${preset.name} theme to your family`,
    });
  };

  // Demo of what the theme looks like
  const ThemePreview = () => (
    <div className="space-y-4 mt-6">
      <p className="text-sm text-vaya-text-secondary">Theme Preview:</p>
      
      <div 
        className="p-4 rounded-xl border"
        style={{ 
          backgroundColor: theme.secondaryColor + "20", // Using hex opacity
          borderColor: theme.primaryColor + "40" 
        }}
      >
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: theme.textColor }}
        >
          Family Capsule Title
        </h3>
        <p className="text-sm mb-3" style={{ color: theme.textColor + "CC" }}>
          This is how your family's custom content would appear.
        </p>
        <Button
          className="transition-all"
          style={{ 
            backgroundColor: theme.primaryColor,
            color: "#FFFFFF"
          }}
        >
          Custom Action
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vaya-text-primary">
          Family Theme
        </h3>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Paintbrush className="h-4 w-4" />
              <span>Presets</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-2">
              <p className="text-sm text-vaya-text-secondary mb-3">
                Apply a preset theme
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ThemePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={cn(
                      "rounded-lg p-2 text-left text-sm transition-colors hover:bg-vaya-gray-100 relative",
                      theme.primaryColor === preset.primaryColor && "ring-2 ring-vaya-brand-primary ring-offset-2"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.primaryColor }} 
                      />
                      <span>{preset.name}</span>
                    </div>
                    {theme.primaryColor === preset.primaryColor && (
                      <Check className="h-3 w-3 absolute right-2 top-2.5 text-vaya-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border border-vaya-gray-200" 
              style={{ backgroundColor: theme.primaryColor }} 
            />
            <Input
              id="primaryColor"
              type="text"
              value={theme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border border-vaya-gray-200" 
              style={{ backgroundColor: theme.secondaryColor }} 
            />
            <Input
              id="secondaryColor"
              type="text"
              value={theme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full border border-vaya-gray-200" 
              style={{ backgroundColor: theme.textColor }} 
            />
            <Input
              id="textColor"
              type="text"
              value={theme.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <ThemePreview />
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={() => {
            if (onThemeChange) onThemeChange(theme);
            toast({
              title: "Theme Saved",
              description: "Your family's custom theme has been updated.",
            });
          }}
        >
          Save Theme
        </Button>
      </div>
    </div>
  );
}
