import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StepCard } from "./StepCard";
import { Camera, BookOpen, Users } from "lucide-react";

export const CapsulePills = () => {
  return (
    <div className="bg-white/90 font-sans text-foreground pt-16 pb-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-vaya-gray-900 font-outfit mb-3 md:mb-4"
        >
          Create Your Family Time Capsule
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-vaya-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto font-inter"
        >
          Preserve your family's precious moments and stories in a digital time capsule. 
          Open it together on a special date to relive the memories.
        </motion.p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto px-4"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={1}
                icon={Camera}
                title="Capture Moments"
                description="Add photos, voice messages, and written stories to your capsule"
                color="bg-vaya-accent-orange"
                iconColor="text-vaya-capsules"
                className="animate-iconPulse"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={2}
                icon={BookOpen}
                title="Set the Date"
                description="Choose when your capsule will be opened - a birthday, anniversary, or special occasion"
                color="bg-vaya-accent-yellow"
                iconColor="text-vaya-capsules"
                className="animate-iconPulse"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={3}
                icon={Users}
                title="Share Together"
                description="Invite family members to contribute their own memories to the capsule"
                color="bg-vaya-accent-green"
                iconColor="text-vaya-capsules"
                className="animate-iconPulse"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};