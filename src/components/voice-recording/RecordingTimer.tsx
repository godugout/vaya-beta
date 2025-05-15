
import { motion } from 'framer-motion';

interface RecordingTimerProps {
  duration: string;
  isRecording: boolean;
}

const RecordingTimer = ({ duration, isRecording }: RecordingTimerProps) => {
  if (!isRecording) return null;
  
  return (
    <motion.div
      className="flex items-center justify-center gap-2 text-sm font-mono"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
      <span>{duration}</span>
    </motion.div>
  );
};

export default RecordingTimer;
