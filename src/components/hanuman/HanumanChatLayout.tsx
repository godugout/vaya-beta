
import React from "react";
import { motion } from "framer-motion";

interface HanumanChatLayoutProps {
  children: React.ReactNode;
}

export const HanumanChatLayout: React.FC<HanumanChatLayoutProps> = ({ children }) => {
  return (
    <motion.div 
      className="hanuman-chat-layout my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </motion.div>
  );
};
