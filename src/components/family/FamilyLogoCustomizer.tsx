
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Archive, Camera, Flower, Home, Leaf, Mountain, Trees, Upload, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface FamilyLogoIconOption {
  icon: JSX.Element;
  name: string;
  background?: string;
}

export const FamilyIconOptions: FamilyLogoIconOption[] = [
  { icon: <Trees />, name: "Tree", background: "bg-vaya-accent-green/10" },
  { icon: <Leaf />, name: "Leaf", background: "bg-vaya-accent-green/10" },
  { icon: <Flower />, name: "Flower", background: "bg-vaya-stories/10" },
  { icon: <Mountain />, name: "Mountain", background: "bg-vaya-accent-blue/10" },
  { icon: <Home />, name: "Home", background: "bg-vaya-accent-yellow/10" },
  { icon: <Users />, name: "Family", background: "bg-vaya-accent-purple/10" },
  { icon: <Archive />, name: "Archive", background: "bg-vaya-accent-orange/10" },
];

interface FamilyLogoCustomizerProps {
  familyId?: string;
  initialLogo?: {
    icon: string;
    color: string;
    background: string;
  };
  onLogoChange?: (logo: {
    icon: string;
    color: string;
    background: string;
  }) => void;
}

export default function FamilyLogoCustomizer({
  familyId,
  initialLogo,
  onLogoChange
}: FamilyLogoCustomizerProps) {
  const { toast } = useToast();
  const [logo, setLogo] = useState(initialLogo || {
    icon: "Tree",
    color: "#6C5CE7",
    background: "bg-vaya-accent-green/10"
  });
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const handleIconSelect = (option: FamilyLogoIconOption) => {
    const newLogo = { 
      ...logo, 
      icon: option.name, 
      background: option.background || "bg-vaya-gray-100" 
    };
    setLogo(newLogo);
    
    if (onLogoChange) {
      onLogoChange(newLogo);
    }
  };

  const handleColorChange = (color: string) => {
    const newLogo = { ...logo, color };
    setLogo(newLogo);
    
    if (onLogoChange) {
      onLogoChange(newLogo);
    }
  };

  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomLogo(event.target.result as string);
        toast({
          title: "Logo Uploaded",
          description: "Your custom family logo has been uploaded.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-vaya-text-primary mb-3">
          Family Logo
        </h3>
        <p className="text-sm text-vaya-text-secondary mb-4">
          Choose an icon or upload your own logo that represents your family.
        </p>
      </div>
      
      {/* Icon Preview */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          {customLogo ? (
            <div className="w-24 h-24 rounded-lg overflow-hidden shadow-sm">
              <img 
                src={customLogo} 
                alt="Custom family logo" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div 
              className={cn(
                "w-24 h-24 rounded-lg flex items-center justify-center shadow-sm",
                logo.background
              )}
            >
              {FamilyIconOptions.find(option => option.name === logo.icon)?.icon && (
                <div className="transform scale-[2]" style={{ color: logo.color }}>
                  {FamilyIconOptions.find(option => option.name === logo.icon)?.icon}
                </div>
              )}
            </div>
          )}
          <p className="mt-2 text-sm font-medium text-vaya-text-secondary">
            {customLogo ? "Custom Logo" : logo.icon}
          </p>
        </div>
      </div>
      
      {/* Icon Selection */}
      <div>
        <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
          Built-in Icons
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {FamilyIconOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleIconSelect(option)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all",
                option.background,
                logo.icon === option.name && "ring-2 ring-vaya-brand-primary ring-offset-2"
              )}
            >
              <span style={{ color: logo.icon === option.name ? logo.color : undefined }}>
                {option.icon}
              </span>
              <span className="text-xs mt-1 text-vaya-text-secondary">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Selection */}
      <div>
        <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
          Icon Color
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {[
            "#6C5CE7", // Purple
            "#FF7675", // Coral
            "#00CEC9", // Turquoise
            "#FFEAA7", // Yellow
            "#FF9F43", // Orange
            "#55EFC4", // Green
          ].map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={cn(
                "w-full aspect-square rounded-full transition-all",
                logo.color === color && "ring-2 ring-vaya-gray-800 ring-offset-2"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      {/* Custom Logo Upload */}
      <div className="border-t border-vaya-gray-200 pt-6">
        <h4 className="text-sm font-medium text-vaya-text-secondary mb-3">
          Upload Custom Logo
        </h4>
        <div className="flex justify-center">
          <div className="relative">
            <input 
              type="file" 
              id="logo-upload" 
              className="sr-only"
              accept="image/*"
              onChange={handleCustomLogoUpload}
            />
            <label 
              htmlFor="logo-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-vaya-gray-100 hover:bg-vaya-gray-200 text-vaya-text-secondary rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Choose Image</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <Button
          onClick={() => {
            toast({
              title: "Logo Saved",
              description: "Your family's logo has been updated successfully.",
            });
            
            if (onLogoChange && !customLogo) {
              onLogoChange(logo);
            }
          }}
        >
          Save Logo
        </Button>
      </div>
    </div>
  );
}
