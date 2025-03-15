
import { motion } from "framer-motion";

interface TranscriptionDisplayProps {
  transcription: string | null;
}

const TranscriptionDisplay = ({ transcription }: TranscriptionDisplayProps) => {
  if (!transcription) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative rounded-xl border border-gray-200 p-6 bg-white shadow-sm"
    >
      <p className="font-story italic text-gray-700 text-lg leading-relaxed">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
