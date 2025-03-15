
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
      className="relative rounded-xl border p-6 bg-white dark:bg-gray-800"
    >
      <p className="font-story italic text-dark-text-primary text-lg leading-relaxed">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
