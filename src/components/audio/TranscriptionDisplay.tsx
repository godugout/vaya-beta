
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
      transition={{ duration: 0.5 }}
      className="relative rounded-lg border border-[#2a3546] p-5 bg-[#1a2332] text-white shadow-md"
    >
      <p className="italic text-gray-300 text-lg leading-relaxed">{transcription}</p>
    </motion.div>
  );
};

export default TranscriptionDisplay;
