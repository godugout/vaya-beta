
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type LogoColor = "default" | "primary" | "white" | "black" | "forest" | "purple" | "coral" | "grayscale";
type LogoType = "standard" | "simple" | "text-only";

interface VayaLogoProps {
  size?: LogoSize;
  color?: LogoColor;
  type?: LogoType;
  className?: string;
  withText?: boolean;
  textClassName?: string;
  animated?: boolean;
  autoAnimate?: boolean;
}

const sizeMap = {
  xs: "h-4 w-4",
  sm: "h-6 w-6",
  md: "h-8 w-8", 
  lg: "h-10 w-10",
  xl: "h-12 w-12",
  "2xl": "h-16 w-16",
  "3xl": "h-24 w-24",
  "4xl": "h-32 w-32",
};

const colorMap = {
  default: "filter-none",
  primary: "filter-none text-forest",
  white: "brightness-0 invert",
  black: "brightness-0",
  forest: "text-forest",
  purple: "text-vaya-accent-purple",
  coral: "text-vaya-accent-coral",
  grayscale: "grayscale",
};

const textSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

export const VayaLogo = ({
  size = "md",
  color = "default",
  type = "standard",
  className = "",
  withText = true,
  textClassName = "",
  animated = false,
  autoAnimate = false,
}: VayaLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const logoClassName = cn(sizeMap[size], colorMap[color], className);
  const textSize = textSizeMap[size];
  
  const handleMouseEnter = () => {
    if (animated) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    if (animated) setIsHovered(false);
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2",
        animated && "cursor-pointer transition-transform hover:scale-105 duration-300",
        autoAnimate && "auto-animate"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {type !== "text-only" && (
        <div className={cn("relative", animated && "logo-container", autoAnimate && "auto-animate")}>
          {/* Primary logo (Green) */}
          <img
            src="/lovable-uploads/7a139c69-d8f3-4454-9eca-472016d74c47.png"
            alt="VAYA Logo"
            className={cn(
              logoClassName,
              "logo-primary"
            )}
          />
          
          {/* Hover logo (White) */}
          <img
            src="/lovable-uploads/1bafb5f7-e34b-442d-ae06-5d78bfd53965.png"
            alt="VAYA Logo Hover"
            className={cn(
              logoClassName,
              "logo-hover"
            )}
          />
          
          {/* Orange logo */}
          <img
            src="/lovable-uploads/386a5a45-bc05-405c-bcb2-847a92b01709.png"
            alt="VAYA Logo Orange"
            className={cn(
              logoClassName,
              "logo-orange"
            )}
          />
          
          {/* Yellow logo */}
          <img
            src="/lovable-uploads/c8309244-d6ea-43e9-a380-9b4966cd0d70.png"
            alt="VAYA Logo Yellow"
            className={cn(
              logoClassName,
              "logo-yellow"
            )}
          />
        </div>
      )}
      
      {withText && (
        <span 
          className={cn(
            "font-heading font-semibold logo-text", 
            textSize, 
            textClassName
          )}
        >
          VAYA
        </span>
      )}
    </div>
  );
};

export default VayaLogo;
