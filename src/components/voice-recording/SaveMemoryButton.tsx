
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

interface SaveMemoryButtonProps {
  handleSave: () => void;
  isProcessing: boolean;
  isTranscribing: boolean;
}

const SaveMemoryButton = ({
  handleSave,
  isProcessing,
  isTranscribing,
}: SaveMemoryButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center mt-4"
    >
      <Button
        onClick={handleSave}
        disabled={isProcessing || isTranscribing}
        className="bg-vaya-secondary hover:bg-vaya-secondary/90 text-white px-8"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Your Memory
      </Button>
    </motion.div>
  );
};

export default SaveMemoryButton;
