
import React from 'react';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserPositionProps {
  themeAccent: string;
}

export function UserPosition({ themeAccent }: UserPositionProps) {
  return (
    <motion.div 
      className="z-10 rounded-full bg-white shadow-md w-16 h-16 flex items-center justify-center border-2 border-gray-200"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" // Changed from potential "ease-in-out" to "easeInOut"
      }}
    >
      <UserRound size={30} className={themeAccent} />
    </motion.div>
  );
}
