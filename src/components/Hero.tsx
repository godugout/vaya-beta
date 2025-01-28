import { useLocation } from "react-router-dom";
import { heroConfigs } from "@/config/heroConfigs";
import { HeroContent } from "./hero/HeroContent";
import HomeHero from "./hero/HomeHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { CulturalContent } from "@/types/cultural";

interface HeroProps {
  culturalContent?: CulturalContent | null;
}

const Hero = ({ culturalContent }: HeroProps) => {
  const location = useLocation();
  const { isSpanish } = useLanguage();

  // If we're on the home page, render the HomeHero component
  if (location.pathname === '/') {
    return <HomeHero isSpanish={isSpanish} />;
  }

  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div className="relative" data-component="Hero">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <HeroContent config={config} isSpanish={isSpanish} />
      </div>
    </div>
  );
};

export default Hero;