
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Flower, Stars } from 'lucide-react';
import { useWeddingMode } from './WeddingModeProvider';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WeddingModeTransitionProps {
  onComplete?: () => void;
}

export function WeddingModeTransition({ onComplete }: WeddingModeTransitionProps) {
  const { isActive, toggleWeddingMode, setTheme } = useWeddingMode();
  const { showWeddingTransition, setShowWeddingTransition } = useUserJourney();
  const [step, setStep] = useState(0);
  const maxSteps = 3;

  useEffect(() => {
    if (!showWeddingTransition) return;
    
    // Automatically activate wedding mode
    if (!isActive) {
      toggleWeddingMode();
      setTheme('classic');
    }
    
    // Auto-advance animation
    const timer = setTimeout(() => {
      if (step < maxSteps) {
        setStep(step + 1);
      } else {
        handleComplete();
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [step, showWeddingTransition, isActive]);

  const handleComplete = () => {
    setShowWeddingTransition(false);
    if (onComplete) onComplete();
  };

  if (!showWeddingTransition) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-10 right-10 text-amber-300 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Stars size={40} />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-20 text-red-400 opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart size={50} />
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 left-1/4 text-green-400 opacity-20"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Flower size={60} />
          </motion.div>
          
          {/* Main content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            {step === 0 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div
                  className="inline-block mb-6 p-4 rounded-full bg-amber-500/20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-16 w-16 text-amber-500" />
                </motion.div>
                <h1 className="text-4xl font-bold text-amber-100 mb-4">
                  Wedding Event Mode
                </h1>
                <p className="text-lg text-amber-200/80 max-w-md mx-auto">
                  Activating special features to capture the joy and connections of this sacred celebration
                </p>
              </motion.div>
            )}
            
            {step === 1 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20 text-center">
                    <Users className="h-8 w-8 text-amber-300 mx-auto mb-2" />
                    <p className="text-xs text-amber-100">Family Connections</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/20 text-center">
                    <Heart className="h-8 w-8 text-amber-300 mx-auto mb-2" />
                    <p className="text-xs text-amber-100">Sacred Moments</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/20 text-center">
                    <Flower className="h-8 w-8 text-amber-300 mx-auto mb-2" />
                    <p className="text-xs text-amber-100">Shared Stories</p>
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-amber-100 mb-2">
                  Unlocking Wedding Features
                </h2>
                <p className="text-amber-200/80 max-w-md mx-auto">
                  Create meaningful connections and preserve precious moments with our special wedding mode tools
                </p>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.1, 0.2]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 opacity-15"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.15, 0.1, 0.15]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-amber-500/30 border-dashed" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="h-20 w-20 text-amber-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-amber-100 mb-2">
                  Wedding Mode Ready
                </h2>
                <p className="text-amber-200/80 max-w-md mx-auto">
                  Your app is now optimized for wedding event interactions
                </p>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-4">
                  Let's Begin
                </h2>
                <p className="text-lg text-amber-200/80 max-w-md mx-auto mb-8">
                  Your sacred journey of connection starts now
                </p>
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  size="lg"
                >
                  Continue to Wedding Experience
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
