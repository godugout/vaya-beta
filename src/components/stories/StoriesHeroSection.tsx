
import { FadeIn } from "@/components/animation/FadeIn";
import { heroConfigs } from "@/config/heroConfigs";

interface StoriesHeroSectionProps {
  className?: string;
}

const StoriesHeroSection = ({ className }: StoriesHeroSectionProps) => {
  const heroConfig = heroConfigs["/share-stories"];
  
  return (
    <div className={className}>
      <FadeIn>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {heroConfig.title_en}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {heroConfig.subtitle_en}
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default StoriesHeroSection;
