
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { LogoCustomizerProps, FamilyLogoIconOption } from "./logo/types";
import { IconOptions } from "./logo/IconOptions";
import { ColorOptions } from "./logo/ColorOptions";
import { CustomLogoUpload } from "./logo/CustomLogoUpload";
import { LogoPreview } from "./logo/LogoPreview";
import { FamilyIconOptions } from "./logo/constants";

export { FamilyIconOptions };

export default function FamilyLogoCustomizer({
  familyId,
  initialLogo,
  onLogoChange
}: LogoCustomizerProps) {
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

  const handleSaveLogo = () => {
    toast({
      title: "Logo Saved",
      description: "Your family's logo has been updated successfully.",
    });
    
    if (onLogoChange && !customLogo) {
      onLogoChange(logo);
    }
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
      <LogoPreview logo={logo} customLogo={customLogo} />
      
      {/* Icon Selection */}
      <IconOptions 
        selectedIcon={logo.icon} 
        selectedColor={logo.color} 
        onIconSelect={handleIconSelect} 
      />
      
      {/* Color Selection */}
      <ColorOptions 
        selectedColor={logo.color} 
        onColorChange={handleColorChange} 
      />
      
      {/* Custom Logo Upload */}
      <CustomLogoUpload onLogoUploaded={setCustomLogo} />
      
      <div className="flex justify-end pt-2">
        <Button onClick={handleSaveLogo}>
          Save Logo
        </Button>
      </div>
    </div>
  );
}
