import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mic, Hourglass } from "lucide-react";
import { HeroPattern } from "./HeroPattern";

const HomeHero = () => {
  return (
    <div className="relative overflow-hidden py-24 bg-white/90" data-component="HomeHero">
      <HeroPattern />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center px-4 sm:px-6"
        >
          <h1 className="font-outfit font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight">
            Share Your Stories
          </h1>
          <p className="font-inter text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 mb-8 sm:mb-10">
            Create digital time capsules to share your family's stories, traditions, and precious moments with loved ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button 
              id="hero-home-primary-cta"
              size="lg" 
              variant="capsules"
              className="w-full sm:w-auto transition-all duration-300 font-outfit bg-vaya-capsules text-white hover:bg-vaya-capsules/90"
            >
              <span>Start a Family Capsule</span>
              <Hourglass className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              id="hero-home-secondary-cta"
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto font-outfit border-2 border-vaya-capsules text-vaya-capsules bg-vaya-accent-green hover:bg-vaya-accent-green/80 hover:text-vaya-capsules"
            >
              <span>Share a Story</span>
              <Mic className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeHero;