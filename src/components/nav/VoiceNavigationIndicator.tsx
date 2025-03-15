
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface VoiceNavigationIndicatorProps {
  isActive: boolean;
}

export const VoiceNavigationIndicator = ({ isActive }: VoiceNavigationIndicatorProps) => {
  if (!isActive) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="fixed top-16 left-0 right-0 z-50 bg-gradient-to-r from-autumn to-autumn border-b border-autumn/20 text-white dark:from-leaf dark:to-leaf dark:border-leaf/20 dark:text-black"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center justify-center h-8 w-8 rounded-full bg-white/20 dark:bg-black/20",
                "animate-pulse"
              )}>
                <Mic className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Voice navigation active</p>
                <p className="text-xs opacity-90">Try saying "Go to stories" or "Record a memory"</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-white/60 dark:bg-black/60 animate-[pulse_1.2s_ease-in-out_infinite]" />
                <div className="h-2 w-2 rounded-full bg-white/60 dark:bg-black/60 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
                <div className="h-2 w-2 rounded-full bg-white/60 dark:bg-black/60 animate-[pulse_1.2s_ease-in-out_0.8s_infinite]" />
              </div>
              <span className="text-xs opacity-80">Listening...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
