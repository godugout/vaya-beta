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
}

export const CapsuleRow = ({ capsules, translateX, reverse = false, startIndex }: CapsuleRowProps) => {
  return (
    <div className="relative mb-12">
      <motion.div className={`flex ${reverse ? 'flex-row' : 'flex-row-reverse'} ${reverse ? '' : 'space-x-reverse'} space-x-20`}>
        {capsules.map((capsule, index) => (
          <motion.div
            style={{ x: reverse ? translateX : translateX }}
            whileHover={{ y: -20 }}
            key={capsule.title}
            className={index < startIndex ? 'opacity-0' : 'opacity-100'}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};