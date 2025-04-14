
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadarRingsProps {
  themeSecondary: string;
}

export function RadarRings({ themeSecondary }: RadarRingsProps) {
  return (
    <>
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className={cn(
            "rounded-full border border-dashed absolute",
            themeSecondary
          )}
          style={{
            width: `${ring * 100}px`,
            height: `${ring * 100}px`,
          }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: ring * 0.5 }}
        />
      ))}
    </>
  );
}
