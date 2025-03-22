
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface ProcessingIndicatorProps {
  isProcessing: boolean;
  isTranscribing: boolean;
}

const ProcessingIndicator = ({ isProcessing, isTranscribing }: ProcessingIndicatorProps) => {
  if (!isProcessing && !isTranscribing) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-4 text-sm text-gray-500"
    >
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      <span>
        {isTranscribing 
          ? "Transcribing your memory..."
          : "Processing your memory..."}
      </span>
    </motion.div>
  );
};

export default ProcessingIndicator;
