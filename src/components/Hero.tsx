
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

  return (
    <div 
      className={`relative overflow-hidden py-24 ${
        location.pathname.includes('family-capsules') 
          ? 'bg-vaya-capsules/5 text-vaya-gray-900' 
          : 'bg-white/95'
      }`} 
      data-component="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
      <HeroPattern />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <HeroContent config={config} isSpanish={isSpanish} />
      </div>
    </div>
  );
}
