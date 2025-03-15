
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Loader, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type RecorderState = "idle" | "recording" | "processing";

interface VoiceRecorderButtonProps {
  state?: RecorderState;
  size?: "sm" | "md" | "lg";
  onStart?: () => void;
  onStop?: () => void;
  disabled?: boolean;
  className?: string;
}

export const VoiceRecorderButton = ({
  state = "idle",
  size = "md",
  onStart,
  onStop,
  disabled = false,
  className,
}: VoiceRecorderButtonProps) => {
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Start pulsing animation when recording
  useEffect(() => {
    setPulseAnimation(state === "recording");
  }, [state]);

  const handleClick = () => {
    if (disabled) return;
    
    if (state === "idle") {
      onStart?.();
    } else if (state === "recording") {
      onStop?.();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-12 w-12";
      case "lg":
        return "h-20 w-20";
      case "md":
      default:
        return "h-16 w-16";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-5 w-5";
      case "lg":
        return "h-8 w-8";
      case "md":
      default:
        return "h-6 w-6";
    }
  };

  return (
    <div className="relative">
      {pulseAnimation && (
        <motion.div
          className={cn(
            "absolute rounded-full bg-red-500 opacity-20",
            getSizeClasses()
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      <motion.button
        disabled={disabled || state === "processing"}
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-md transition-colors",
          getSizeClasses(),
          state === "idle" 
            ? "bg-vaya-secondary hover:bg-vaya-secondary/90 text-white" 
            : state === "recording" 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-amber-500 text-white",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {state === "idle" && (
          <Mic className={getIconSize()} />
        )}
        {state === "recording" && (
          <StopCircle className={getIconSize()} />
        )}
        {state === "processing" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader className={getIconSize()} />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
