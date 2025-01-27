import React from "react";
import { motion, MotionValue } from "framer-motion";

interface CapsuleContentProps {
  contentOpacity: MotionValue;
  contentTranslateY: MotionValue;
}

export const CapsuleContent = ({ contentOpacity, contentTranslateY }: CapsuleContentProps) => {
  return (
    <motion.div
      style={{ 
        opacity: contentOpacity,
        y: contentTranslateY,
      }}
      className="fixed top-48 left-0 right-0 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-vaya-gray-900 font-outfit mb-6">
          Create Your Family Capsules
        </h2>
        <p className="text-xl text-vaya-gray-600 max-w-2xl leading-relaxed">
          Each capsule is a unique collection of memories, stories, and moments from your family's journey. 
          Choose a capsule type below to start preserving your precious memories for generations to come.
        </p>
      </div>
    </motion.div>
  );
};