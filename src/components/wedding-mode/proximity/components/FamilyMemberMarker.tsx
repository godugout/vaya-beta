
import React from 'react';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FamilyMemberMarkerProps {
  memberId: string;
  memberName: string;
  style: {
    color: string;
    position: { x: number; y: number };
    ring: string;
    animPulse: boolean;
  };
}

export function FamilyMemberMarker({ memberId, memberName, style }: FamilyMemberMarkerProps) {
  return (
    <motion.div
      key={memberId}
      className={cn(
        "absolute z-20 rounded-full bg-white shadow-md p-2",
        "flex items-center justify-center",
        "border border-gray-200 ring-2",
        style.ring
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: style.animPulse ? [1, 1.1, 1] : 1,
        x: style.position.x * 3, 
        y: style.position.y * 3
      }}
      transition={{ 
        duration: style.animPulse ? 2 : 0.5, 
        repeat: style.animPulse ? Infinity : 0,
        delay: Math.random() * 0.5,
        ease: "easeOut" // Changed from potential "ease-out" to "easeOut"
      }}
    >
      <div className="relative">
        <UserRound size={24} className={style.color} />
        <motion.div 
          className="absolute -bottom-4 whitespace-nowrap text-xs font-medium"
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5, ease: "easeOut" }} // Added explicit easing
        >
          {memberName}
        </motion.div>
      </div>
    </motion.div>
  );
}
