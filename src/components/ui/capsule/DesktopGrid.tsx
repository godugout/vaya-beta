import React from "react";
import { motion } from "framer-motion";
import { CapsuleCard } from "./CapsuleCard";
import { LucideIcon } from "lucide-react";

interface DesktopGridProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}

export const DesktopGrid = ({ capsules }: DesktopGridProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center py-12">
        {capsules.map((capsule, index) => (
          <motion.div
            key={capsule.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CapsuleCard {...capsule} isDesktop />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};