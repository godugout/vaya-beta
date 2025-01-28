import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { StepCard } from "@/components/ui/capsule/StepCard";

export const CapsulePills = () => {
  return (
    <div className="bg-white font-sans text-foreground py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-vaya-gray-900 font-outfit mb-6"
        >
          Go Back to the Future
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-vaya-gray-600 mb-16 max-w-2xl mx-auto font-inter"
        >
          Each capsule represents a unique collection of memories, stories, and moments 
          from your family's journey. Click on any capsule to dive deeper into your family's 
          history.
        </motion.p>

        <div className="max-w-md mx-auto">
          <StepCard
            step={4}
            icon={Star}
            title="Experience the Magic"
            description="When the special day arrives, gather together to unlock your capsule and relive cherished memories in a heartwarming celebration"
            color="bg-vaya-accent-blue/20"
            iconColor="text-vaya-capsules"
            className="reveal-card capsule-confetti"
          />
        </div>
      </div>
    </div>
  );
};