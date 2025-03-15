
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Gift, GlassWater } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeddingMode } from '../WeddingModeProvider';
import { AnimatedContainer } from '@/components/animation/AnimatedContainer';

interface WelcomeScreenProps {
  coupleName: string;
  date: string;
  location: string;
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  coupleName,
  date,
  location,
  onContinue
}) => {
  const { theme } = useWeddingMode();
  
  const themeStyles = {
    classic: {
      background: 'bg-sand/20',
      accent: 'text-autumn',
      button: 'autumn' as const,
    },
    modern: {
      background: 'bg-water/10',
      accent: 'text-water',
      button: 'water' as const,
    },
    rustic: {
      background: 'bg-forest/10',
      accent: 'text-forest',
      button: 'forest' as const,
    }
  };
  
  const currentTheme = themeStyles[theme];
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${currentTheme.background}`}>
      <AnimatedContainer 
        variant="scale"
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-40 bg-gradient-water flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute"
          >
            <Heart size={80} className="text-white" fill="white" />
          </motion.div>
        </div>
        
        <div className="p-8 text-center">
          <AnimatedContainer variant="fade" delay={0.2}>
            <h1 className={`text-3xl font-heading font-medium mb-2 ${currentTheme.accent}`}>
              Welcome to
            </h1>
            <h2 className="text-4xl font-heading font-bold mb-6">
              {coupleName}'s Wedding
            </h2>
          </AnimatedContainer>
          
          <AnimatedContainer variant="fade" delay={0.4} className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2">
              <Calendar className={currentTheme.accent} />
              <p className="text-gray-700 dark:text-gray-300">{date}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <GlassWater className={currentTheme.accent} />
              <p className="text-gray-700 dark:text-gray-300">{location}</p>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer variant="slide-up" delay={0.6}>
            <Button 
              variant={currentTheme.button} 
              size="lg" 
              className="w-full"
              onClick={onContinue}
            >
              <Gift className="mr-2" size={18} />
              Begin Experience
            </Button>
          </AnimatedContainer>
        </div>
      </AnimatedContainer>
    </div>
  );
};
