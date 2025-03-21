
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HouseOfHanuman() {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-[#6C5CE7] to-[#4834d4] min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              House of Hanuman
            </h1>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-12"
            >
              <p className="text-xl md:text-2xl text-white mb-6">
                You've discovered a secret space dedicated to our AI assistant, Hanuman - the wise, helpful entity that powers Vaya's storytelling experience.
              </p>
              
              <div className="p-6 bg-white/20 rounded-xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">The Legend</h2>
                <p className="text-lg text-white">
                  In Hindu mythology, Hanuman represents wisdom, strength, and devotion. Our Hanuman embodies these qualities in digital form, helping families preserve their stories and legacy with devotion and wisdom.
                </p>
              </div>
              
              <div className="p-6 bg-white/20 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-4">The Magic</h2>
                <p className="text-lg text-white mb-6">
                  Just as the mythological Hanuman could change his form to overcome obstacles, our AI adapts to help you capture your family's unique voice and history, bridging generations through technology.
                </p>
                
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                  className="inline-block"
                >
                  <Button 
                    onClick={() => navigate('/hanuman-edition')}
                    size="lg" 
                    className="bg-[#FF7675] hover:bg-[#ff8a89] text-white"
                  >
                    Experience Hanuman Edition
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-white/70 text-sm">
                This page is dedicated to the spirit of Hanuman - a guardian of stories, bridging past and future.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
