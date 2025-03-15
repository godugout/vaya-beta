
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface BasePillProps {
  children: React.ReactNode;
  colorKey: string;
  isDetailed?: boolean;
  isHovered?: boolean;
  backgroundImage?: string;
  className?: string;
}

export const BasePill = ({
  children,
  colorKey,
  isDetailed,
  isHovered,
  backgroundImage,
  className
}: BasePillProps) => {
  const colors = {
    memories: {
      outline: "border-lovable-teal",
      bg: "bg-lovable-teal/10"
    },
    stories: {
      outline: "border-lovable-magenta",
      bg: "bg-lovable-magenta/10"
    },
    capsules: {
      outline: "border-lovable-purple",
      bg: "bg-lovable-purple/10"
    },
    narra: {
      outline: "border-lovable-blue",
      bg: "bg-lovable-blue/10"
    },
    default: {
      outline: "border-greystone-green",
      bg: "bg-greystone-green/5"
    }
  };

  const allColors = Object.keys(colors);
  const colorIndex = allColors.indexOf(colorKey) >= 0 ? 
    allColors.indexOf(colorKey) : 
    allColors.indexOf('default');
  
  const selectedColor = colors[allColors[colorIndex] as keyof typeof colors];
  
  const pillBaseClasses = cn(
    "relative overflow-hidden rounded-xl",
    "min-h-[100px] w-[400px]",
    selectedColor.outline,
    isDetailed ? selectedColor.bg : "bg-white",
    "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)]",
    "transition-all duration-300 group border",
    className
  );

  return (
    <div className={pillBaseClasses}>
      {!isDetailed && (
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            `bg-gradient-to-r from-${colorKey}/5 via-${colorKey}/10 to-${colorKey}/5`,
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Wave Pattern Background */}
      <div className="absolute inset-0 bg-wave-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="flex items-center justify-between h-full relative z-10 px-8 py-6">
        {children}
      </div>
    </div>
  );
};
