import React from "react";
import { motion } from "framer-motion";
import { CapsuleCard } from "./CapsuleCard";
import { LucideIcon } from "lucide-react";

interface CapsuleRowProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
  translateX: any; // Framer motion value
  reverse?: boolean;
  startIndex: number;
  scale?: any; // Framer motion value for scaling
}

export const CapsuleRow = ({ capsules, translateX, reverse = false, startIndex, scale }: CapsuleRowProps) => {
  return (
    <div className="relative">
      <motion.div 
        className={`flex ${reverse ? 'flex-row' : 'flex-row-reverse'} ${reverse ? '' : 'space-x-reverse'} space-x-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {capsules.map((capsule, index) => (
          <motion.div
            style={{ 
              x: reverse ? translateX : translateX,
              scale: scale || 1
            }}
            whileHover={{ y: -20 }}
            key={capsule.title}
            className={`transition-opacity duration-500 ${index < startIndex ? 'opacity-0' : 'opacity-100'}`}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};