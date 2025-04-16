
import { motion } from "framer-motion";

export const DemoHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Vaya Component Demo
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Explore the building blocks of the Vaya family storytelling platform
      </p>
    </motion.div>
  );
};
