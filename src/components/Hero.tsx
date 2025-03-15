
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
      return 'bg-ui-orange/15 dark:bg-[#2A1E17]';
    if (location.pathname.includes('memory-lane')) 
      return 'bg-ui-teal/15 dark:bg-[#172A2A]';
    if (location.pathname.includes('share-stories')) 
      return 'bg-ui-purple/15 dark:bg-[#211C2F]';
    return 'bg-ui-green/15 dark:bg-[#1C2F21]';
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
