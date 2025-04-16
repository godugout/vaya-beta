
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animation/FadeIn";

const StoriesHeroSection = () => {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/40 rounded-lg" />
      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Family's Story Matters
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-100">
            Share and preserve your cherished memories with voice recordings, photos, and written stories that will be treasured for generations.
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default StoriesHeroSection;
