
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RecordingButtonProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const RecordingButton = ({ isRecording, onClick, disabled }: RecordingButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        size="icon"
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isRecording 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-blue-600 hover:bg-blue-700"
        )}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? (
          <Square className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </Button>
    </motion.div>
  );
};

export default RecordingButton;
