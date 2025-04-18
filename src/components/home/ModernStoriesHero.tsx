
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { PatternBackground } from '@/components/ui/pattern-background';
import { MultilingualWelcome } from '@/components/ui/multilingual-welcome';

export const ModernStoriesHero = () => {
  return (
    <PatternBackground 
      pattern="sanskrit" 
      className="min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4 relative overflow-hidden"
    >
      {/* Large decorative circle */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-autumn/10 dark:bg-autumn/5" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-leaf/10 dark:bg-leaf/5" />
      
      <div className="container mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
            <MultilingualWelcome 
              className="mb-6"
              textClassName="text-2xl sm:text-3xl md:text-4xl font-bold"
            />
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Family Stories That
              <span className="relative inline-block ml-3">
                Last Forever
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-autumn/80 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Preserve and connect with your family's heritage through shared stories and memories, 
              creating a lasting digital legacy for generations to come.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                asChild 
                size="lg" 
                variant="autumn"
                className="rounded-xl h-14 font-semibold shadow-lg shadow-autumn/20"
              >
                <Link to="/share-stories">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="rounded-xl h-14 border-2 font-semibold"
              >
                <Link to="/family-capsules">
                  <Heart className="w-5 h-5 mr-2" />
                  Create Family Capsule
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Image or illustration */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Larger decorative background */}
              <div className="absolute -inset-10 bg-gradient-to-br from-leaf/20 to-autumn/20 rounded-full blur-xl" />
              
              {/* Main circular image container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl w-[400px] h-[400px] flex items-center justify-center">
                <div className="p-3 relative z-10">
                  <div className="absolute inset-0 bg-pattern-sanskrit opacity-5 rounded-full" />
                  <img 
                    src="https://images.unsplash.com/photo-1606041011872-596597976b25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="Family sharing stories"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-0 -right-8 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg float-animation">
                <Mic className="w-8 h-8 text-autumn" />
              </div>
              
              <div className="absolute bottom-0 -left-8 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg float-animation" style={{ animationDelay: '1s' }}>
                <Heart className="w-8 h-8 text-leaf" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PatternBackground>
  );
};
