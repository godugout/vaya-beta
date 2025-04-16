
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
        variant="outline"
        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg h-12 w-12 p-0"
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
        variant="outline"
        className="rounded-full bg-[#243040] hover:bg-[#2d3a4a] text-gray-300 border-[#2a3546] h-12 w-12 p-0"
        size="icon"
        disabled={isProcessing}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default AudioControls;
