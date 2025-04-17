
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordingButtonWithPulseProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RecordingButtonWithPulse = ({
  isRecording,
  onClick,
  disabled = false,
  size = "md",
  className
}: RecordingButtonWithPulseProps) => {
  // Size configurations
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };
  
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse effect for recording state */}
      {isRecording && (
        <motion.div
          className={cn(
            "absolute rounded-full bg-red-500/30",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Button background highlight */}
      <motion.div
        className={cn(
          "absolute rounded-full",
          sizeClasses[size],
          isRecording 
            ? "bg-red-100 dark:bg-red-900/20" 
            : "bg-orange-50 dark:bg-orange-900/10"
        )}
        animate={{
          scale: isRecording ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 3,
          repeat: isRecording ? Infinity : 0,
          repeatType: "reverse",
        }}
      />
      
      {/* Main button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="relative z-10"
      >
        <Button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "rounded-full flex items-center justify-center shadow-lg border-2",
            sizeClasses[size],
            isRecording 
              ? "bg-red-500 hover:bg-red-600 border-red-400 text-white" 
              : "bg-orange-500 hover:bg-orange-600 border-orange-400 text-white",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          aria-label={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isRecording ? (
            <Square className={iconSizes[size]} />
          ) : (
            <Mic className={iconSizes[size]} />
          )}
        </Button>
      </motion.div>
    </div>
  );
};
