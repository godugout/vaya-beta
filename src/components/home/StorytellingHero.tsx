
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Heart, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "@/components/animation/TypewriterText";
import { useAnimation } from "@/components/animation/AnimationProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export const StorytellingHero = () => {
  const { isReduced } = useAnimation();
  const isMobile = useIsMobile();
  
  // Shorter phrases list for mobile devices
  const familyPhrases = isMobile ? [
    "a story to tell",
    "secret recipes",
    "weird traditions",
    "quirky nicknames",
    "holiday dramas",
    "unbelievable tales"
  ] : [
    "a story to tell",
    "inside jokes",
    "secret recipes",
    "weird traditions",
    "quirky nicknames",
    "holiday dramas",
    "photo-shy kids",
    "dance moves",
    "loud arguments",
    "dinner-table debates",
    "an embarrassing uncle",
    "unbelievable tales"
  ];

  return (
    <section className="min-h-[100vh] relative overflow-hidden flex items-center m-0 p-0">
      <div 
        className="absolute inset-0 w-full h-full m-0 p-0"
      >
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI5MjYyNjI5&dpr=2&h=1080')] bg-cover bg-center"
          style={{ opacity: 0.15 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn className="space-y-6">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: isReduced || isMobile ? 0.3 : 0.6,
                ease: isReduced || isMobile ? "easeOut" : "easeInOut"
              }}
            >
              Every family has 
              <span className="block">
                <TypewriterText 
                  phrases={familyPhrases} 
                  typingSpeed={isMobile ? 80 : 100}
                  deletingSpeed={isMobile ? 50 : 80}
                  pauseDuration={isMobile ? 1800 : 2500}
                  colorful={true}
                  cursorStyle={isMobile && isReduced ? "none" : "block"}
                  cursorBlinkSpeed={isMobile ? 800 : 600}
                />
              </span>
            </motion.h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create lasting memories, share cherished moments, and preserve your family's legacy for generations to come.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="bg-autumn hover:bg-autumn/90 text-white font-medium px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg"
              >
                <Link to="/share-stories">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Your Story
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="border-autumn text-autumn hover:bg-autumn/10 font-medium px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg"
              >
                <Link to="/family-capsules">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Create Family Capsule
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
