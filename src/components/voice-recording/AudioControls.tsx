
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash } from "lucide-react";

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
  isProcessing,
}: AudioControlsProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={togglePlayback}
        disabled={isProcessing}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleReset}
        disabled={isProcessing}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AudioControls;
