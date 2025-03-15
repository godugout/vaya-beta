
import { motion } from "framer-motion";
import { Camera, BookOpen, Users, Sparkle } from "lucide-react";
import { StepCard } from "@/components/ui/capsule/StepCard";

export const CapsulePills = () => {
  return (
    <div className="bg-white font-sans text-foreground py-12 relative">
      <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
        >
          How Time Capsules Work
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Create, collect, and share memories that matter in just four simple steps
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StepCard
            step={1}
            icon={Camera}
            title="Capture & Create"
            description="Add photos, voice messages, and stories to tell your family's journey."
            color="bg-gray-50"
            iconColor="text-blue-500"
            numberColor="text-blue-500"
            className="hover:shadow-md transition-shadow duration-300"
          />
          <StepCard
            step={2}
            icon={BookOpen}
            title="Set a Date"
            description="Choose a meaningful future moment for your capsule's reveal."
            color="bg-gray-50"
            iconColor="text-amber-500"
            numberColor="text-amber-500"
            className="hover:shadow-md transition-shadow duration-300"
          />
          <StepCard
            step={3}
            icon={Users}
            title="Invite Family"
            description="Let everyone contribute their memories, stories, and wishes."
            color="bg-gray-50"
            iconColor="text-purple-500"
            numberColor="text-purple-500"
            className="hover:shadow-md transition-shadow duration-300"
          />
          <StepCard
            step={4}
            icon={Sparkle}
            title="Experience Magic"
            description="Gather to open your capsule and relive precious memories together."
            color="bg-gray-50"
            iconColor="text-green-500"
            numberColor="text-green-500"
            className="hover:shadow-md transition-shadow duration-300"
          />
        </div>
      </div>
    </div>
  );
};
