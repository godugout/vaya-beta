
import { motion } from "framer-motion";

interface TranscriptionDisplayProps {
  transcription: string | null;
}

const TranscriptionDisplay = ({ transcription }: TranscriptionDisplayProps) => {
  if (!transcription) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 p-4 rounded-xl text-sm text-vaya-text-secondary"
    >
      <p className="italic">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
