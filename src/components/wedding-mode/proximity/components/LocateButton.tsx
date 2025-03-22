
import React from 'react';
import { motion } from 'framer-motion';
import { Locate } from 'lucide-react';

interface LocateButtonProps {
  themeAccent: string;
}

export function LocateButton({ themeAccent }: LocateButtonProps) {
  return (
    <div className="absolute bottom-4 right-4">
      <motion.div 
        className="flex items-center justify-center rounded-full bg-white shadow-md p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Locate size={20} className={themeAccent} />
      </motion.div>
    </div>
  );
}
