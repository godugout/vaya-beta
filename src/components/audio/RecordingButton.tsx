
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

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
        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
        isRecording 
          ? "bg-red-500 hover:bg-red-600 animate-recording-pulse" 
          : "bg-lovable-magenta hover:bg-lovable-magenta-bright"
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
