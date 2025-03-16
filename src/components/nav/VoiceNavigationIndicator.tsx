
import React from 'react';
import { Volume2, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VoiceNavigationIndicatorProps {
  isActive: boolean;
}

export const VoiceNavigationIndicator: React.FC<VoiceNavigationIndicatorProps> = ({
  isActive
}) => {
  if (!isActive) return null;
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "fixed top-20 left-0 right-0 z-50 mx-auto max-w-md p-3",
            "bg-black/70 backdrop-blur-md border border-white/10 rounded-lg text-white",
            "animate-pulse shadow-lg"
          )}
        >
          <div className="flex items-center">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 mr-3 rounded-full",
              "bg-autumn text-black"
            )}>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Volume2 className="h-5 w-5" />
              </motion.div>
            </div>
            
            <div>
              <h4 className="font-medium text-white">Voice Navigation Active</h4>
              <p className="text-xs text-gray-300">
                Try saying "Open Stories" or "Show Family Tree"
              </p>
            </div>
          </div>
          
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className="text-gray-400">Sanskrit commands available</span>
            <span className="flex items-center text-autumn">
              <Mic className="h-3 w-3 mr-1" />
              Listening...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
