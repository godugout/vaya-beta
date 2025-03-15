
import { AnimatePresence, motion } from "framer-motion";

export const NarraProcessingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <AnimatePresence>
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.7,
              delay: dot * 0.2,
            }}
            className="w-2 h-2 bg-lovable-blue rounded-full"
          />
        ))}
      </AnimatePresence>
      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">Thinking...</span>
    </div>
  );
};
