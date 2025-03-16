
import React from 'react';
import { JamnabenCircularGlyph } from './JamnabenCircularGlyph';
import { AmbalTriangleGlyph } from './AmbalTriangleGlyph';
import { ChanchalbenDualityGlyph } from './ChanchalbenDualityGlyph';
import { FamilyTreeGlyph } from './FamilyTreeGlyph';
import { motion } from 'framer-motion';

export const SacredGlyphGrid = () => {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
    >
      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <JamnabenCircularGlyph size="md" />
        <p className="mt-2 text-sm font-medium text-amber-800">Family Wisdom</p>
        <p className="text-xs text-gray-500">Ancestral Knowledge</p>
      </motion.div>

      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <AmbalTriangleGlyph size="md" />
        <p className="mt-2 text-sm font-medium text-amber-800">Spiritual Connection</p>
        <p className="text-xs text-gray-500">Sacred Devotion</p>
      </motion.div>

      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <ChanchalbenDualityGlyph size="md" />
        <p className="mt-2 text-sm font-medium text-amber-800">Life Balance</p>
        <p className="text-xs text-gray-500">Inner Harmony</p>
      </motion.div>

      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <FamilyTreeGlyph size="md" />
        <p className="mt-2 text-sm font-medium text-amber-800">Heritage Growth</p>
        <p className="text-xs text-gray-500">Family Lineage</p>
      </motion.div>
    </motion.div>
  );
};
