
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JamnabenCircularGlyph } from '@/components/sacred/JamnabenCircularGlyph';

interface HanumanBannerProps {
  onFamilySettingsClick: () => void;
}

export const HanumanBanner: React.FC<HanumanBannerProps> = ({ onFamilySettingsClick }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg bg-gradient-to-r from-space-darkBlue to-space-indigo p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Galaxy background simulation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-[url('/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png')] opacity-30" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="mr-4"
          >
            <JamnabenCircularGlyph size="md" className="text-space-gold" />
          </motion.div>
          
          <div>
            <h2 className="text-2xl font-heading text-space-gold flex items-center">
              Hanuman Edition
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="ml-2"
              >
                <Star className="h-5 w-5 text-space-gold fill-space-gold" />
              </motion.div>
            </h2>
            <p className="text-space-text-secondary max-w-md">
              Sacred family storytelling, guided by spiritual wisdom and cultural heritage
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onFamilySettingsClick}
          className="border-space-indigo text-space-lightBlue hover:bg-space-indigo/20 hover:border-space-lightBlue"
        >
          <Shield className="h-4 w-4 mr-2" />
          Family Context
        </Button>
      </div>
      
      <div className="mt-4 space-terminal text-sm text-space-lightBlue">
        <p className="font-medium flex items-center">
          <Star className="h-4 w-4 mr-2 text-space-gold" />
          Ask me about your family stories, traditions, or to help record new memories.
        </p>
      </div>
    </motion.div>
  );
};
