
import React from "react";
import { CapsuleCard } from "./CapsuleCard";
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
    <div className="px-4 py-4">
      <motion.div 
        className="grid grid-cols-1 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Wave pattern background */}
        <div className="absolute inset-0 bg-wave-pattern opacity-[0.03] pointer-events-none"></div>
        
        {capsules.map((capsule, index) => (
          <motion.div
            key={capsule.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="action-pill bg-white border border-gray-100 shadow-sm">
              <div className={`action-pill-icon ${capsule.colorKey === 'memories' ? 'bg-lovable-teal text-white' : 
                               capsule.colorKey === 'stories' ? 'bg-lovable-magenta text-white' : 
                               capsule.colorKey === 'capsules' ? 'bg-lovable-purple text-white' : 
                               'bg-greystone-green text-white'}`}>
                <capsule.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg text-greystone-green">{capsule.title}</h3>
              </div>
              <div>
                <svg className="h-6 w-6 text-greystone-green-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
