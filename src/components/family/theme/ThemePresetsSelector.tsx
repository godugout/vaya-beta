
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemePresets } from "./constants";
import { FamilyTheme, ThemePreset } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

interface ThemePresetsSelectorProps {
  currentTheme: FamilyTheme;
  onPresetSelected: (preset: ThemePreset) => void;
}

export const ThemePresetsSelector = ({ 
  currentTheme, 
  onPresetSelected 
}: ThemePresetsSelectorProps) => {
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const applyPreset = (preset: ThemePreset) => {
    onPresetSelected(preset);
    toast({
      title: "Theme Updated",
      description: `Applied the ${preset.name} theme to your family`,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 dark:bg-dark-background-elevated dark:border-dark-border dark:text-dark-text-primary">
          <Paintbrush className="h-4 w-4" />
          <span>Presets</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 dark:bg-dark-background-surface dark:border-dark-border" align="end">
        <div className="space-y-2">
          <p className="text-sm text-vaya-text-secondary dark:text-dark-text-secondary mb-3">
            Apply a preset theme
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ThemePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={cn(
                  "rounded-lg p-2 text-left text-sm transition-colors hover:bg-vaya-gray-100 dark:hover:bg-dark-background-elevated relative",
                  currentTheme.primaryColor === preset.primaryColor && "ring-2 ring-vaya-brand-primary dark:ring-dark-accent-purple ring-offset-2 dark:ring-offset-dark-background-surface"
                )}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.primaryColor }} 
                  />
                  <span className="dark:text-dark-text-primary">{preset.name}</span>
                </div>
                {currentTheme.primaryColor === preset.primaryColor && (
                  <Check className="h-3 w-3 absolute right-2 top-2.5 text-vaya-brand-primary dark:text-dark-accent-purple" />
                )}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

