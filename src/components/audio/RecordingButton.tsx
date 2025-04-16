
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RecordingButtonProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

const RecordingButton = ({ 
  isRecording, 
  onClick, 
  disabled, 
  isProcessing = false 
}: RecordingButtonProps) => {
  // Pulse animation for recording state
  const pulseVariants = {
    recording: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(239, 68, 68, 0.7)",
        "0 0 0 10px rgba(239, 68, 68, 0)",
        "0 0 0 0 rgba(239, 68, 68, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    idle: {
      scale: 1,
      boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)"
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        variants={pulseVariants}
        animate={isRecording ? "recording" : "idle"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onClick}
          disabled={disabled || isProcessing}
          size="icon"
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
            isRecording 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-blue-600 hover:bg-blue-700"
          )}
          aria-label={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isProcessing ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </Button>
      </motion.div>
      <p className="mt-2 text-sm text-gray-400">
        {isProcessing ? "Processing..." : isRecording ? "Recording..." : "Tap to Record"}
      </p>
    </div>
  );
};

export default RecordingButton;
