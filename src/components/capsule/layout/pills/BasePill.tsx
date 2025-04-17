
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
      outline: "border-black dark:border-white/30",
      bg: "bg-white/90 dark:bg-black/40"
    },
    stories: {
      outline: "border-black dark:border-white/30",
      bg: "bg-white/90 dark:bg-black/40"
    },
    capsules: {
      outline: "border-black dark:border-white/30", 
      bg: "bg-white/90 dark:bg-black/40"
    },
    narra: {
      outline: "border-black dark:border-white/30",
      bg: "bg-white/90 dark:bg-black/40"
    },
    default: {
      outline: "border-black dark:border-white/30",
      bg: "bg-white/90 dark:bg-black/40"
    }
  };

  const pillBaseClasses = cn(
    "relative overflow-hidden",
    "min-h-[100px] w-[400px]",
    colors[colorKey as keyof typeof colors]?.outline || colors.default.outline,
    isDetailed ? 
      (isDark ? "bg-dark-background-surface" : "bg-muted/50") : 
      (isDark ? "bg-dark-background-elevated" : "bg-white"),
    isDark ? 
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]" :
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)]",
    "transition-all duration-300 group",
    className
  );

  return (
    <div className={pillBaseClasses}>
      {!isDetailed && (
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isDark ? "bg-white/5" : "bg-black/5",
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
      <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none"></div>
      
      <div className="flex items-center justify-between h-full relative z-10 px-8 py-6">
        {children}
      </div>
    </div>
  );
};
