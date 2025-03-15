
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
    <Button
      onClick={onClick}
      disabled={disabled}
      size="icon"
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative",
        isRecording 
          ? "bg-[#FF7675] hover:bg-[#FF7675]/90" 
          : "bg-[#6C5CE7] hover:bg-[#6C5CE7]/90"
      )}
      aria-label={isRecording ? "Stop Recording" : "Start Recording"}
    >
      {isRecording ? (
        <Square className="h-6 w-6 text-white" />
      ) : (
        <Mic className="h-6 w-6 text-white" />
      )}
    </Button>
  );
};

export default RecordingButton;
