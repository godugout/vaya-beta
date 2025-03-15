
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
    >
      <Button
        onClick={isRecordingActive ? onStopRecording : onStartRecording}
        variant={isRecordingActive ? "coral" : "purple"}
        size="lg"
        className={`${
          isRecordingActive
            ? "shadow-[0_0_15px_rgba(255,118,117,0.5)] animate-pulse"
            : "shadow-[0_0_15px_rgba(108,92,231,0.5)]"
        } text-white w-full font-medium border border-white/10`}
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
