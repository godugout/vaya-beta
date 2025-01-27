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
      className="mx-auto max-w-2xl text-center"
    >
      <h1 className="font-outfit font-bold text-4xl tracking-tight text-gray-900 sm:text-6xl mb-6 leading-tight">
        {isSpanish ? config.title_es : config.title_en}
      </h1>
      <p className="font-inter text-lg leading-8 text-gray-600 mb-10">
        {isSpanish ? config.subtitle_es : config.subtitle_en}
      </p>
      <div className="flex items-center justify-center gap-x-6">
        <Button 
          size="lg" 
          className="bg-vaya-primary hover:bg-vaya-primary/90 text-white transition-all duration-300 font-outfit"
        >
          {config.primaryCta.text}
          {config.primaryCta.icon}
        </Button>
        {config.secondaryCta && (
          <Button 
            size="lg" 
            variant="outline" 
            className="border-vaya-primary text-vaya-primary hover:bg-vaya-primary/10 font-outfit"
          >
            {config.secondaryCta.text}
            {config.secondaryCta.icon}
          </Button>
        )}
      </div>
    </motion.div>
  );
};