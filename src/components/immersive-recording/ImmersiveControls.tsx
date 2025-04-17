
import { motion } from "framer-motion";
import { Mic, Square, Send, X, Loader2 } from "lucide-react";
import { RecordingState } from "../voice-recording/EnhancedRecordingButton";
import { Button } from "@/components/ui/button";

interface ImmersiveControlsProps {
  recordingState: RecordingState;
  hasRecording: boolean;
  onToggleRecording: () => void;
  onCancel: () => void;
  onComplete: () => void;
}

const ImmersiveControls = ({
  recordingState,
  hasRecording,
  onToggleRecording,
  onCancel,
  onComplete
}: ImmersiveControlsProps) => {
  const isRecording = recordingState === "recording";
  const isProcessing = recordingState === "processing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/30 backdrop-blur-md rounded-full p-2 flex items-center space-x-4"
    >
      {/* Cancel button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onCancel}
        className="text-white hover:bg-white/10 rounded-full h-10 w-10"
        disabled={isProcessing}
      >
        <X size={20} />
      </Button>
      
      {/* Main recording button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleRecording}
        disabled={isProcessing}
        className={`rounded-full transition-all duration-300 ${
          isRecording 
            ? "bg-red-500 hover:bg-red-600 text-white h-14 w-14" 
            : "bg-blue-600 hover:bg-blue-700 text-white h-14 w-14"
        }`}
      >
        {isProcessing ? (
          <Loader2 size={24} className="animate-spin" />
        ) : isRecording ? (
          <Square size={24} />
        ) : (
          <Mic size={24} />
        )}
      </Button>
      
      {/* Complete/send button (only visible when we have a recording) */}
      {hasRecording && !isRecording && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onComplete}
          disabled={isProcessing}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full h-10 w-10"
        >
          <Send size={20} />
        </Button>
      )}
    </motion.div>
  );
};

export default ImmersiveControls;
