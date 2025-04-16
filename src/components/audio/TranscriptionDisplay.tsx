
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TranscriptionDisplayProps {
  transcription: string | null;
  isGenerating?: boolean;
}

const TranscriptionDisplay = ({ 
  transcription, 
  isGenerating = false 
}: TranscriptionDisplayProps) => {
  if (!transcription && !isGenerating) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg border border-gray-700 p-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md"
    >
      {isGenerating ? (
        <div className="flex items-center space-x-2 text-blue-300">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <p className="text-lg">Generating transcription...</p>
        </div>
      ) : (
        <>
          <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded">
            Transcription
          </div>
          <p className="italic text-gray-200 text-lg leading-relaxed">{transcription}</p>
        </>
      )}
    </motion.div>
  );
};

export default TranscriptionDisplay;
