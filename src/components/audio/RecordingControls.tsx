
import { Button } from "@/components/ui/button";
import { Square, Mic } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-3"
    >
      <Button
        onClick={isRecordingActive ? onStopRecording : onStartRecording}
        variant={isRecordingActive ? "destructive" : "default"}
        size="lg"
        className={`${
          isRecordingActive
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white w-full font-medium`}
      >
        {isRecordingActive ? (
          <Square className="mr-2 h-5 w-5" />
        ) : (
          <Mic className="mr-2 h-5 w-5" />
        )}
        {isRecordingActive ? "Stop Recording" : "Start Recording"}
      </Button>
    </motion.div>
  );
};

export default RecordingControls;
