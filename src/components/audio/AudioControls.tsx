
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
        variant="purple"
        className="rounded-full shadow-lg shadow-[#6C5CE7]/30 border border-white/10"
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
        variant="ghost"
        className="rounded-full bg-dark-background-elevated hover:bg-dark-background-surface text-white/70 border border-white/10"
        size="icon"
        disabled={isProcessing}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default AudioControls;
