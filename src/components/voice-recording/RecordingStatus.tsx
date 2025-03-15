
import { motion } from "framer-motion";

interface RecordingStatusProps {
  isRecordingActive: boolean;
  hasAudioBlob: boolean;
}

const RecordingStatus = ({ isRecordingActive, hasAudioBlob }: RecordingStatusProps) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`text-xl font-heading font-semibold drop-shadow-md ${
        isRecordingActive 
          ? "text-[#FF7675]" 
          : hasAudioBlob 
            ? "text-[#6C5CE7]" 
            : "text-white"
      }`}>
        {isRecordingActive 
          ? "Recording..." 
          : hasAudioBlob 
            ? "Review Your Memory" 
            : "Record Your Memory"}
      </h3>
      <p className="text-base text-white/90 mt-1 max-w-xs mx-auto">
        {isRecordingActive 
          ? "Speak clearly into your microphone" 
          : hasAudioBlob 
            ? "Listen, transcribe and save your memory" 
            : "Tap the microphone to start recording"}
      </p>
    </motion.div>
  );
};

export default RecordingStatus;
