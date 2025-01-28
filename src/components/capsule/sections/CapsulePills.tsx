import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StepCard } from "@/components/ui/capsule/StepCard";
import { Camera, Users } from "lucide-react";

export const CapsulePills = () => {
  return (
    <div className="bg-white font-sans text-foreground pt-24 pb-32">
      <div className="max-w-4xl mx-auto text-center px-4">
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={1}
                icon={Camera}
                title="Create a Capsule"
                description="Give your capsule a theme and set a date for when it should be opened"
                color="bg-vaya-accent-orange/20"
                iconColor="text-vaya-capsules"
                className="animate-iconPulse"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={2}
                icon={Camera}
                title="Add Your Memories"
                description="Share stories through voice messages, photos, or written notes"
                color="bg-vaya-accent-orange/20"
                iconColor="text-vaya-capsules"
                className="animate-iconPulse"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <StepCard
                step={3}
                icon={Users}
                title="Invite Family & Friends"
                description="Let others contribute their memories to be revealed together"
                color="bg-vaya-accent-orange/20"
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