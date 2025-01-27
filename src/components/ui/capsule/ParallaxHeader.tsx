import React from "react";
import { motion } from "framer-motion";

interface ParallaxHeaderProps {
  opacity: any; // Framer motion value
}

export const ParallaxHeader = ({ opacity }: ParallaxHeaderProps) => {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-0 right-0 mx-auto px-4 w-full"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-vaya-gray-900 font-outfit mb-4">
          Explore Family Capsules
        </h2>
        <p className="text-lg text-vaya-gray-600 max-w-2xl">
          Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
          Click on any capsule to dive deeper into your family's history.
        </p>
      </div>
    </motion.div>
  );
};