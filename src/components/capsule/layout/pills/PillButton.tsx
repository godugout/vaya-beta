import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillButtonProps {
  colorKey: string;
  isHovered: boolean;
}

export const PillButton = ({ colorKey, isHovered }: PillButtonProps) => {
  return (
    <div className="ml-auto relative">
      <div 
        className={cn(
          "absolute inset-0 w-12 h-12 rounded-full",
          "flex items-center justify-center",
          "bg-gray-100 animate-pulse",
          isHovered ? "opacity-0" : "opacity-50"
        )}
      >
        <Plus className="w-6 h-6 text-gray-400" />
      </div>
      <motion.button
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          `bg-vaya-${colorKey} text-white`,
          "transition-all duration-300 transform",
          isHovered ? "scale-110" : "scale-100 opacity-0"
        )}
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        whileHover={{ scale: 1.15 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};