import React from "react";
import { motion } from "framer-motion";
import { StepCard } from "./StepCard";
import { Camera } from "lucide-react";

export const CapsulePills = () => {
  return (
    <div className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-vaya-gray-900 font-outfit mb-3 md:mb-4">
          Go Back to the Future
        </h2>
        <p className="text-base md:text-lg text-vaya-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto">
          Each capsule represents a unique collection of memories, stories, and moments from your family's journey. 
          Click on any capsule to dive deeper into your family's history.
        </p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <StepCard
            step={1}
            icon={Camera}
            title="Create a Capsule"
            description="Give your capsule a theme and set a date for when it should be opened. It could be for a special occasion, anniversary, or future milestone."
          />
          <StepCard
            step={2}
            icon={Camera}
            title="Add Your Memories"
            description="Share stories through voice messages, photos, or written notes. Each contribution is kept secret until the reveal date."
          />
          <StepCard
            step={3}
            icon={Camera}
            title="Invite Family & Friends"
            description="Let others contribute their memories. Everyone's additions remain a surprise until the capsule is opened together."
          />
        </motion.div>
      </div>
    </div>
  );
};