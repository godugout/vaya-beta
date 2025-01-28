import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroConfig } from "@/types/hero";
import { useLocation, useNavigate } from 'react-router-dom';

interface HeroContentProps {
  config: HeroConfig;
  isSpanish: boolean;
}

export const HeroContent = ({ config, isSpanish }: HeroContentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine button variant based on current route
  const getButtonVariant = () => {
    if (location.pathname.includes('memory-lane')) return 'memories';
    if (location.pathname.includes('share-stories')) return 'stories';
    if (location.pathname.includes('family-capsules')) return 'capsules';
    return 'capsules'; // Default remains green
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center px-4 sm:px-6"
    >
      <h1 className="font-outfit font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight">
        {isSpanish ? config.title_es : config.title_en}
      </h1>
      <p className="font-inter text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 mb-8 sm:mb-10">
        {isSpanish ? config.subtitle_es : config.subtitle_en}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
        <Button 
          size="lg" 
          variant={getButtonVariant()}
          className="w-full sm:w-auto transition-all duration-300 font-outfit"
        >
          <span>{config.primaryCta.text}</span>
          {config.primaryCta.icon}
        </Button>
        {config.secondaryCta && (
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => location.pathname.includes('memory-lane') && navigate('/narra')}
            className={`w-full sm:w-auto font-outfit border-2 ${
              location.pathname.includes('memory-lane') 
                ? 'border-vaya-memories hover:bg-vaya-memories/10 text-vaya-memories'
                : 'border-vaya-stories hover:bg-vaya-stories/10'
            }`}
          >
            <span>{config.secondaryCta.text}</span>
            {config.secondaryCta.icon}
          </Button>
        )}
      </div>
    </motion.div>
  );
};