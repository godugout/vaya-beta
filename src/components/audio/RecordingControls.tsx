
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
          ? "bg-[#FF7675] hover:bg-[#FF7675]/90 animate-pulse"
          : "bg-gradient-to-r from-[#6C5CE7] to-[#8F84EB] hover:from-[#6C5CE7]/90 hover:to-[#8F84EB]/90"
      } text-white w-full shadow-md`}
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
