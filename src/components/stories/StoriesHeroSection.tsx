
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animation/FadeIn";

const StoriesHeroSection = () => {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-autumn/20 to-mountain/20 dark:from-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-lg" />
      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-md">
            Your Family's Story Matters
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-100 drop-shadow">
            Share and preserve your cherished memories with voice recordings, photos, and written stories that will be treasured for generations.
          </p>
          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a 
                href="#record-story" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-autumn hover:bg-autumn/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-autumn"
              >
                Start Recording
              </a>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default StoriesHeroSection;
