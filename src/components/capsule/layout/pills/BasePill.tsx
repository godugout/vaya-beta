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
      outline: "border-[#0EA5E9]",
      bg: "bg-[#E0F2FE]"
    },
    stories: {
      outline: "border-[#F97316]",
      bg: "bg-[#FDE1D3]"
    },
    capsules: {
      outline: "border-[#22C55E]",
      bg: "bg-[#F2FCE2]"
    },
    narra: {
      outline: "border-[#9b87f5]",
      bg: "bg-[#E5DEFF]"
    },
    purple: {
      outline: "border-[#7E69AB]",
      bg: "bg-[#F3EEFF]"
    },
    magenta: {
      outline: "border-[#D946EF]",
      bg: "bg-[#FFDEE2]"
    }
  };

  const allColors = Object.keys(colors);
  const colorIndex = allColors.indexOf(colorKey) >= 0 ? 
    allColors.indexOf(colorKey) : 
    Math.floor(Math.random() * allColors.length);
  
  const selectedColor = colors[allColors[colorIndex] as keyof typeof colors];
  
  const pillBaseClasses = cn(
    "relative overflow-hidden rounded-[90px]",
    "min-h-[100px] w-[400px]",
    selectedColor.outline,
    isDetailed ? selectedColor.bg : "bg-white",
    "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]",
    "transition-all duration-300 group",
    className
  );

  return (
    <div className={pillBaseClasses}>
      {!isDetailed && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-r transition-opacity duration-300",
            `from-vaya-${colorKey}/5 via-vaya-${colorKey}/10 to-vaya-${colorKey}/5`,
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
      
      <div className="flex items-center justify-between h-full relative z-10 px-8 py-6">
        {children}
      </div>
    </div>
  );
};