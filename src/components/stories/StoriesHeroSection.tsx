
import { FadeIn } from "@/components/animation/FadeIn";
import { heroConfigs } from "@/config/heroConfigs";
import { motion } from "framer-motion";

interface StoriesHeroSectionProps {
  className?: string;
}

const StoriesHeroSection = ({ className }: StoriesHeroSectionProps) => {
  const heroConfig = heroConfigs["/share-stories"];
  
  return (
    <div className={className}>
      <FadeIn>
        <div className="text-center mb-10 relative py-8">
          {/* Forest-inspired decorative elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-20 h-20 bg-leaf rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-water rounded-full blur-xl"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-forest mb-4 relative">
            {heroConfig.title_en}
            <motion.div 
              className="absolute -bottom-2 left-1/2 h-1 bg-autumn rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "80px", x: "-50%" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {heroConfig.subtitle_en}
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default StoriesHeroSection;
