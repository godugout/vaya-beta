
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MemoryCardProps {
  children: React.ReactNode;
}

const MemoryCard = ({ children }: MemoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        {children}
      </Card>
    </motion.div>
  );
};

export default MemoryCard;
