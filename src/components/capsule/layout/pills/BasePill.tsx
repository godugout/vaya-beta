
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const colors = {
    memories: {
      outline: "border-lovable-teal dark:border-dark-accent-teal",
      bg: "bg-lovable-teal/10 dark:bg-dark-accent-teal/20"
    },
    stories: {
      outline: "border-lovable-magenta dark:border-dark-accent-coral",
      bg: "bg-lovable-magenta/10 dark:bg-dark-accent-coral/20"
    },
    capsules: {
      outline: "border-lovable-blue dark:border-dark-accent-blue", 
      bg: "bg-lovable-blue/10 dark:bg-dark-accent-blue/20"
    },
    narra: {
      outline: "border-lovable-navy dark:border-dark-accent-purple",
      bg: "bg-lovable-navy/10 dark:bg-dark-accent-purple/20"
    },
    default: {
      outline: "border-greystone-green dark:border-dark-border",
      bg: "bg-greystone-green/5 dark:bg-dark-background-elevated"
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
    isDetailed ? selectedColor.bg : "bg-white dark:bg-dark-background-surface",
    isDark ? 
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)]" :
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
            `bg-gradient-to-r from-${colorKey}/5 via-${colorKey}/10 to-${colorKey}/5 dark:from-dark-accent-${colorKey}/10 dark:via-dark-accent-${colorKey}/20 dark:to-dark-accent-${colorKey}/10`,
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
      <div className="absolute inset-0 bg-wave-pattern opacity-[0.02] dark:opacity-[0.03] pointer-events-none"></div>
      
      <div className="flex items-center justify-between h-full relative z-10 px-8 py-6">
        {children}
      </div>
    </div>
  );
};

