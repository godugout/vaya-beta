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
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6"
        >
          Go Back to the Future
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-vaya-gray-600 mb-16 max-w-2xl mx-auto font-inter"
        >
          Each capsule represents a unique collection of memories and stories
          <br />
          from your family's journey. Click on any capsule to dive deeper into your family's history.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StepCard
            step={1}
            icon={Camera}
            title="Capture & Create"
            description="Add photos, voice messages, and stories to tell your family's journey. Each piece creates a lasting legacy."
            color="bg-gray-50"
            iconColor="text-blue-500"
            numberColor="text-blue-500"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={2}
            icon={BookOpen}
            title="Set the Perfect Date"
            description="Choose a meaningful future moment for your capsule's reveal - a wedding, graduation, or family reunion. Make it special!"
            color="bg-gray-50"
            iconColor="text-amber-500"
            numberColor="text-amber-500"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={3}
            icon={Users}
            title="Invite Loved Ones"
            description="Share the capsule with family and friends. Let everyone contribute their memories, stories, and wishes for the future."
            color="bg-gray-50"
            iconColor="text-vaya-narra"
            numberColor="text-vaya-narra"
            className="hover:scale-105 transition-transform duration-300"
          />
          <StepCard
            step={4}
            icon={Sparkle}
            title="Experience the Magic"
            description="Gather together to open your capsule and relive precious memories. Celebrate your family's story as one."
            color="bg-gray-50"
            iconColor="text-vaya-capsules"
            numberColor="text-vaya-capsules"
            className="magical-card magical-sparkle hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};