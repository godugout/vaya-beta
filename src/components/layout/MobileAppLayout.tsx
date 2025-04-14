
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

export const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({
  children,
  className,
  withPadding = true
}) => {
  return (
    <div className="min-h-screen bg-hanuman-dark overflow-x-hidden flex justify-center">
      <motion.div
        className={cn(
          "w-full max-w-md min-h-screen bg-gradient-to-b from-hanuman-bg-dark to-hanuman-dark border-x border-hanuman-gold/10",
          withPadding && "px-4 py-6",
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
