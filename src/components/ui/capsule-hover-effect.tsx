
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
      memories: "from-vaya-memories to-vaya-memories",
      stories: "from-vaya-stories to-vaya-stories",
      capsules: "from-vaya-capsules to-vaya-capsules"
    };
    return colors[key] || "from-gray-100 to-gray-100";
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
      {/* Simple background color */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r",
        getGradientColors(colorKey)
      )} />
    </motion.div>
  );
};
