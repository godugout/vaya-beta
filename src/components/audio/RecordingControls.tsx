import { Button } from "@/components/ui/button";
import { Square, Mic } from "lucide-react";

interface RecordingControlsProps {
  isRecordingActive: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const RecordingControls = ({
  isRecordingActive,
  onStartRecording,
  onStopRecording,
}: RecordingControlsProps) => {
  return (
    <Button
      onClick={isRecordingActive ? onStopRecording : onStartRecording}
      className={`${
        isRecordingActive
          ? "bg-red-500 hover:bg-red-600 animate-pulse"
          : "bg-vaya-secondary hover:bg-vaya-secondary/90"
      } text-white w-full`}
    >
      {isRecordingActive ? (
        <Square className="mr-2 h-4 w-4" />
      ) : (
        <Mic className="mr-2 h-4 w-4" />
      )}
      {isRecordingActive ? "Stop Recording" : "Start Recording"}
    </Button>
  );
};

export default RecordingControls;