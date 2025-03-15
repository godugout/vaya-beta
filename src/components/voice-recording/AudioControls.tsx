
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  togglePlayback: () => void;
  handleReset: () => void;
  isProcessing: boolean;
}

const AudioControls = ({
  isPlaying,
  togglePlayback,
  handleReset,
  isProcessing
}: AudioControlsProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={togglePlayback}
        className="rounded-full bg-[#6C5CE7] hover:bg-[#5649C0] shadow-lg shadow-[#6C5CE7]/30 border border-white/10"
        size="icon"
        disabled={isProcessing}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-1" />
        )}
      </Button>
      
      <Button
        onClick={handleReset}
        className="rounded-full bg-dark-background-elevated hover:bg-dark-background-surface text-white/70 border border-white/10"
        size="icon"
        disabled={isProcessing}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AudioControls;
