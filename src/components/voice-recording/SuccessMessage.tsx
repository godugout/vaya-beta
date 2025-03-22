
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  hasSaved: boolean;
}

const SuccessMessage = ({ hasSaved }: SuccessMessageProps) => {
  if (!hasSaved) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h4 className="text-lg font-medium text-green-800">Memory Saved!</h4>
      <p className="text-sm text-green-600 mt-1">
        Your memory has been preserved for future generations
      </p>
    </motion.div>
  );
};

export default SuccessMessage;
