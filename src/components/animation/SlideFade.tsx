
import { motion } from "framer-motion";

interface SlideFadeProps {
  children: React.ReactNode;
  delay?: number;
}

export const SlideFade = ({ children, delay = 0.2 }: SlideFadeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};
