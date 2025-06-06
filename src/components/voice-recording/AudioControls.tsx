
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface AudioControlsProps {
  isPlaying: boolean;
  togglePlayback: () => void;
  handleReset: () => void;
  isProcessing: boolean;
}

const AudioControls = ({
  isPlaying,
  togglePlayback,
  handleReset,
  isProcessing
}: AudioControlsProps) => {
  return (
    <motion.div 
      className="flex justify-center space-x-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Button
        onClick={togglePlayback}
        className="rounded-full bg-ui-orange hover:bg-ui-orange/90 shadow"
        size="icon"
        disabled={isProcessing}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-1" />
        )}
      </Button>
      
      <Button
        onClick={handleReset}
        className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        size="icon"
        disabled={isProcessing}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default AudioControls;
