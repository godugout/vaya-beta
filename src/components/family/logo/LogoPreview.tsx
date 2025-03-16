
import { cn } from "@/lib/utils";
import { FamilyIconOptions } from "./constants";

interface LogoPreviewProps {
  logo: {
    icon: string;
    color: string;
    background: string;
    isCustomIcon?: boolean;
  };
  customLogo: string | null;
}

export const LogoPreview = ({ logo, customLogo }: LogoPreviewProps) => {
  // Find the icon option
  const selectedIconOption = FamilyIconOptions.find(option => option.name === logo.icon);
  
  return (
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
            {selectedIconOption && (
              <div 
                className={cn(
                  "transform scale-[2]",
                  !selectedIconOption.customIcon && "text-vaya-text-primary"
                )} 
                style={{ color: !selectedIconOption.customIcon ? logo.color : undefined }}
              >
                {selectedIconOption.icon}
              </div>
            )}
          </div>
        )}
        <p className="mt-2 text-sm font-medium text-vaya-text-secondary">
          {customLogo ? "Custom Logo" : logo.icon}
        </p>
      </div>
    </div>
  );
};
