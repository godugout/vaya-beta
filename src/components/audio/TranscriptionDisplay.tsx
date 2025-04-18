
import { motion } from "framer-motion";
import { Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TranscriptionDisplayProps {
  transcription: string | null;
  isGenerating?: boolean;
  error?: string | null;
}

const TranscriptionDisplay = ({ 
  transcription, 
  isGenerating = false,
  error = null
}: TranscriptionDisplayProps) => {
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Transcription Failed</AlertTitle>
        <AlertDescription>
          {error.includes("OpenAI API key not configured") 
            ? "The transcription service is not properly configured. Please contact the administrator."
            : error}
        </AlertDescription>
      </Alert>
    );
  }
  
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
