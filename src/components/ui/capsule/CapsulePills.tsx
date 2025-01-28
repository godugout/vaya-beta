import React from "react";
import { motion } from "framer-motion";
import { StepCard } from "./StepCard";
import { Camera, BookOpen, Users } from "lucide-react";

export const CapsulePills = () => {
  return (
    <div className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-vaya-gray-900 font-outfit mb-3 md:mb-4">
          Create Your Family Time Capsule
        </h2>
        <p className="text-base md:text-lg text-vaya-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto">
          Preserve your family's precious moments and stories in a digital time capsule. 
          Open it together on a special date to relive the memories.
        </p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <StepCard
            step={1}
            icon={Camera}
            title="Capture Moments"
            description="Add photos, voice messages, and written stories to your capsule"
            color="bg-vaya-accent-orange"
            iconColor="text-vaya-capsules"
          />
          <StepCard
            step={2}
            icon={BookOpen}
            title="Set the Date"
            description="Choose when your capsule will be opened - a birthday, anniversary, or special occasion"
            color="bg-vaya-accent-yellow"
            iconColor="text-vaya-capsules"
          />
          <StepCard
            step={3}
            icon={Users}
            title="Share Together"
            description="Invite family members to contribute their own memories to the capsule"
            color="bg-vaya-accent-green"
            iconColor="text-vaya-capsules"
          />
        </motion.div>
      </div>
    </div>
  );
};