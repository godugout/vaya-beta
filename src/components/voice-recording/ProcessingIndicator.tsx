
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessingIndicatorProps {
  isProcessing: boolean;
  isTranscribing: boolean;
}

const ProcessingIndicator = ({ 
  isProcessing, 
  isTranscribing 
}: ProcessingIndicatorProps) => {
  if (!isProcessing && !isTranscribing) return null;
  
  return (
    <motion.div 
      className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-4 w-4" />
      </motion.div>
      <span>
        {isTranscribing 
          ? "Transcribing your audio..."
          : isProcessing 
            ? "Processing your memory..."
            : ""}
      </span>
    </motion.div>
  );
};

export default ProcessingIndicator;
