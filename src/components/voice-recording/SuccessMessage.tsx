
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  hasSaved: boolean;
}

const SuccessMessage = ({ hasSaved }: SuccessMessageProps) => {
  if (!hasSaved) return null;
  
  return (
    <motion.div 
      className="flex items-center justify-center gap-2 text-sm text-emerald-600 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
        <Check className="h-3 w-3 text-emerald-600" />
      </div>
      <span>Memory saved successfully!</span>
    </motion.div>
  );
};

export default SuccessMessage;
