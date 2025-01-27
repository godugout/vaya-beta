import React from "react";
import { CapsuleCard } from "./CapsuleCard";
import { CapsuleHeader } from "./CapsuleHeader";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MobileCapsuleListProps {
  capsules: {
    title: string;
    link: string;
    icon: LucideIcon;
    colorKey: string;
  }[];
}

export const MobileCapsuleList = ({ capsules }: MobileCapsuleListProps) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <CapsuleHeader />
      <motion.div 
        className="grid grid-cols-1 gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {capsules.map((capsule, index) => (
          <motion.div
            key={capsule.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CapsuleCard {...capsule} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};