
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CapsuleHoverEffectProps {
  colorKey: string;
  isHovered: boolean;
}

export const CapsuleHoverEffect = ({ colorKey, isHovered }: CapsuleHoverEffectProps) => {
  const getGradientColors = (key: string): string => {
    const colors: { [key: string]: string } = {
      memories: "from-vaya-memories/20 via-vaya-memories/30 to-vaya-memories/20",
      stories: "from-vaya-stories/20 via-vaya-stories/30 to-vaya-stories/20",
      capsules: "from-vaya-capsules/20 via-vaya-capsules/30 to-vaya-capsules/20" // This will now use the blue defined in tailwind theme
    };
    return colors[key] || "from-gray-100/20 via-gray-100/30 to-gray-100/20";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isHovered ? 1 : 0,
        transition: { duration: 0.3 }
      }}
      className="absolute inset-0 overflow-hidden rounded-[90px]"
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r",
        getGradientColors(colorKey)
      )} />
      
      {/* Animated particles */}
      <motion.div 
        className={cn(
          "absolute inset-0 opacity-30",
          `bg-vaya-${colorKey}`
        )}
        initial={false}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          backgroundSize: isHovered ? ["100% 100%", "400% 400%"] : "100% 100%"
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, currentColor 100%)`
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={false}
        animate={{
          x: isHovered ? ["0%", "100%"] : "0%",
          opacity: isHovered ? [0, 1, 0] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${getComputedStyle(document.documentElement).getPropertyValue(`--vaya-${colorKey}`)} 50%, transparent 100%)`
        }}
      />
    </motion.div>
  );
};
