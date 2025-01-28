import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroConfig } from "@/types/hero";

interface HeroContentProps {
  config: HeroConfig;
  isSpanish: boolean;
}

export const HeroContent = ({ config, isSpanish }: HeroContentProps) => {
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
          className="w-full sm:w-auto bg-vaya-primary hover:bg-vaya-primary/90 text-white transition-all duration-300 font-outfit"
        >
          <span>{config.primaryCta.text}</span>
          {config.primaryCta.icon}
        </Button>
        {config.secondaryCta && (
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-vaya-primary text-vaya-primary hover:bg-vaya-primary/10 font-outfit"
          >
            <span>{config.secondaryCta.text}</span>
            {config.secondaryCta.icon}
          </Button>
        )}
      </div>
    </motion.div>
  );
};