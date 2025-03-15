
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SaveMemoryButtonProps {
  handleSave: () => void;
  isProcessing: boolean;
  isTranscribing: boolean;
}

const SaveMemoryButton = ({ 
  handleSave, 
  isProcessing, 
  isTranscribing 
}: SaveMemoryButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="pt-4"
    >
      <Button
        onClick={handleSave}
        className="w-full bg-lovable-magenta hover:bg-lovable-magenta-bright"
        disabled={isProcessing || isTranscribing}
      >
        <motion.span
          whileTap={{ scale: 0.97 }}
          className="flex items-center"
        >
          Save Memory
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default SaveMemoryButton;
