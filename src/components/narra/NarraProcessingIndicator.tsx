
import { motion } from "framer-motion";

export const NarraProcessingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      <motion.div
        className="h-2 w-2 bg-lovable-blue rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0
        }}
      />
      <motion.div
        className="h-2 w-2 bg-lovable-blue rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0.2
        }}
      />
      <motion.div
        className="h-2 w-2 bg-lovable-blue rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0.4
        }}
      />
    </div>
  );
};
