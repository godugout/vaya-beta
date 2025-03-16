
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JamnabenCircularGlyph } from '@/components/sacred/JamnabenCircularGlyph';

interface HanumanBannerProps {
  onFamilySettingsClick: () => void;
}

export const HanumanBanner: React.FC<HanumanBannerProps> = ({ onFamilySettingsClick }) => {
  return (
    <motion.div 
      className="mb-6 relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[url('/lovable-uploads/auspicious-pattern.svg')] opacity-5" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <JamnabenCircularGlyph size="md" className="mr-4" />
          
          <div>
            <h2 className="text-2xl font-heading text-amber-800 dark:text-amber-300">
              Hanuman Edition
            </h2>
            <p className="text-amber-700/70 dark:text-amber-300/70 max-w-md">
              Sacred family storytelling, guided by spiritual wisdom and cultural heritage
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onFamilySettingsClick}
          className="border-amber-200 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/50"
        >
          <Settings className="h-4 w-4 mr-2" />
          Family Context
        </Button>
      </div>
      
      <div className="mt-4 p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800/30 text-sm text-amber-800 dark:text-amber-300/90">
        <p className="font-medium">✨ Ask me about your family stories, traditions, or to help record new memories.</p>
      </div>
    </motion.div>
  );
};
