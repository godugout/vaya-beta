
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const StorytellingHero = () => {
  return (
    <div className="relative min-h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden m-0 p-0">
      {/* Full-bleed background image with overlay */}
      <div className="absolute inset-0 w-full h-full m-0 p-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI5MjYyNjI5&dpr=2&h=1080')] bg-cover bg-center"
          style={{ opacity: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40" />
      </div>
      
      <div className="container relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 -mt-32">
        <div className="text-center max-w-4xl mx-auto agencs-hero staggered-fade-in">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Every Family has
          </motion.h1>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Weird Traditions
          </motion.h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-autumn hover:bg-autumn/90 text-white font-medium px-8 h-14 text-lg"
            >
              <Link to="/share-stories">
                Start Your Story
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-autumn text-autumn hover:bg-autumn/10 font-medium px-8 h-14 text-lg"
            >
              <Link to="/family-capsules">
                Create Family Capsule
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
