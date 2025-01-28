import { motion } from "framer-motion";
import { Camera, BookOpen, Users, Sparkle } from "lucide-react";
import { StepCard } from "@/components/ui/capsule/StepCard";

export const CapsulePills = () => {
  return (
    <div className="bg-white font-sans text-foreground py-24">
      <div className="max-w-7xl mx-auto text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-vaya-gray-900 font-outfit mb-6"
        >
          Create Your Family Time Capsule
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-vaya-gray-600 mb-16 max-w-2xl mx-auto font-inter"
        >
          Preserve your family's precious memories and stories in a digital time capsule. 
          Set a future date to unlock and relive these cherished moments together.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StepCard
            step={1}
            icon={Camera}
            title="Add Your Memories"
            description="Upload photos, record voice messages, and write down stories that capture special moments with your family"
            color="bg-gray-50"
            iconColor="text-blue-500"
            numberColor="text-blue-500"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={2}
            icon={BookOpen}
            title="Choose Your Date"
            description="Pick a meaningful future date to reveal your capsule - maybe a birthday, anniversary, or special family gathering"
            color="bg-gray-50"
            iconColor="text-amber-500"
            numberColor="text-amber-500"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={3}
            icon={Users}
            title="Invite Family"
            description="Share the capsule with family members so they can add their own memories and messages to the collection"
            color="bg-gray-50"
            iconColor="text-vaya-narra"
            numberColor="text-vaya-narra"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={4}
            icon={Sparkle}
            title="Open Together"
            description="When the special day arrives, gather your family to unlock the capsule and relive these precious memories together"
            color="bg-gray-50"
            iconColor="text-vaya-capsules"
            numberColor="text-vaya-capsules"
            className="reveal-card capsule-confetti"
          />
        </div>
      </div>
    </div>
  );
};