
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
      outline: "border-transparent dark:border-transparent",
      bg: "bg-black/20 dark:bg-white/5"
    },
    stories: {
      outline: "border-transparent dark:border-transparent",
      bg: "bg-black/20 dark:bg-white/5"
    },
    capsules: {
      outline: "border-transparent dark:border-transparent", 
      bg: "bg-black/20 dark:bg-white/5"
    },
    narra: {
      outline: "border-transparent dark:border-transparent",
      bg: "bg-black/20 dark:bg-white/5"
    },
    default: {
      outline: "border-transparent dark:border-transparent",
      bg: "bg-black/20 dark:bg-white/5"
    }
  };

  const pillBaseClasses = cn(
    "relative overflow-hidden",
    "min-h-[100px] w-[400px]",
    "border border-transparent",
    isDetailed ? "bg-black/20 dark:bg-white/5" : "bg-black/10 dark:bg-black/30",
    isDark ? 
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]" :
      "shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)]",
    "transition-all duration-300 group",
    "backdrop-blur-sm",
    className
  );

  return (
    <div className={pillBaseClasses}>
      {!isDetailed && (
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            `bg-black/10 dark:bg-white/5`,
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
