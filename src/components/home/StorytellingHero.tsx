
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Heart, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "@/components/animation/TypewriterText";

export const StorytellingHero = () => {
  const familyPhrases = [
    "a Story to Tell",
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
              className="text-5xl md:text-7xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Every Family Has 
              <span className="block bg-gradient-to-r from-autumn to-orange-500 bg-clip-text text-transparent">
                <TypewriterText 
                  phrases={familyPhrases} 
                  typingSpeed={100}
                  deletingSpeed={80}
                  pauseDuration={2500}
                />
              </span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create lasting memories, share cherished moments, and preserve your family's legacy for generations to come.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-autumn hover:bg-autumn/90 text-white font-medium px-8 h-14 text-lg"
              >
                <Link to="/share-stories">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Your Story
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-autumn text-autumn hover:bg-autumn/10 font-medium px-8 h-14 text-lg"
              >
                <Link to="/family-capsules">
                  <Heart className="w-5 h-5 mr-2" />
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
