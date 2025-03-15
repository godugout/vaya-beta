
import { useLocation } from "react-router-dom";
import { heroConfigs } from "@/config/heroConfigs";
import { HeroPattern } from "./hero/HeroPattern";
import { HeroContent } from "./hero/HeroContent";
import HomeHero from "./hero/HomeHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { CulturalContent } from "@/types/cultural";

interface HeroProps {
  culturalContent?: CulturalContent | null;
}

export default function Hero({ culturalContent }: HeroProps) {
  const location = useLocation();
  const { isSpanish } = useLanguage();

  // If we're on the home page, render the HomeHero component
  if (location.pathname === '/') {
    return <HomeHero isSpanish={isSpanish} />;
  }

  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];
  
  // Select background color based on the page with improved contrast
  const getBgClass = () => {
    if (location.pathname.includes('family-capsules')) 
      return 'bg-gradient-to-br from-dark-background-orange/90 to-dark-background-orange/70 dark:from-dark-background-orange to-dark-background-orange/80';
    if (location.pathname.includes('memory-lane')) 
      return 'bg-gradient-to-br from-dark-background-green/90 to-dark-background-green/70 dark:from-dark-background-green to-dark-background-green/80';
    if (location.pathname.includes('share-stories')) 
      return 'bg-gradient-to-br from-dark-background-purple/90 to-dark-background-purple/70 dark:from-dark-background-purple to-dark-background-purple/80';
    return 'bg-gradient-to-br from-dark-background-red/90 to-dark-background-red/70 dark:from-dark-background-red to-dark-background-red/80';
  };

  return (
    <div 
      className={`relative overflow-hidden py-24 ${getBgClass()}`} 
      data-component="Hero"
    >
      <HeroPattern />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <HeroContent config={config} isSpanish={isSpanish} />
      </div>
    </div>
  );
}
