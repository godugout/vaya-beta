
import React, { useEffect } from 'react';
import MemoryFeedLayout from '@/components/memory/MemoryFeedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Star, Orbit } from 'lucide-react';

export default function Memories() {
  // Add NASA theme to body when component mounts
  useEffect(() => {
    document.body.classList.add('nasa-theme', 'cosmic-bg');
    
    // Generate stars
    const createStars = () => {
      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';
      starsContainer.style.position = 'fixed';
      starsContainer.style.top = '0';
      starsContainer.style.left = '0';
      starsContainer.style.width = '100%';
      starsContainer.style.height = '100%';
      starsContainer.style.zIndex = '-1';
      starsContainer.style.overflow = 'hidden';
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
      }
      
      document.body.appendChild(starsContainer);
    };
    
    createStars();
    
    return () => {
      document.body.classList.remove('nasa-theme', 'cosmic-bg');
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        document.body.removeChild(starsContainer);
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="space-glass mb-8 overflow-hidden border-space-indigo">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Subtle cosmic background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <span className="absolute h-1 w-1 bg-white rounded-full top-4 left-[10%] opacity-80"></span>
            <span className="absolute h-1 w-1 bg-white rounded-full top-8 left-[30%] opacity-60"></span>
            <span className="absolute h-1 w-1 bg-white rounded-full top-12 left-[50%] opacity-90"></span>
            <span className="absolute h-1 w-1 bg-white rounded-full top-6 left-[70%] opacity-70"></span>
            <span className="absolute h-1 w-1 bg-white rounded-full top-10 left-[90%] opacity-50"></span>
          </div>
        </div>
        <CardHeader className="flex flex-row items-center">
          <Rocket className="h-6 w-6 mr-2 text-nasa-red" />
          <CardTitle className="text-2xl md:text-3xl font-heading text-white glow-text">
            Mission Log: Family Memories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <Orbit className="h-5 w-5 text-space-light-blue" />
            </div>
            <p className="text-gray-300">
              Preserve and document your family's most significant moments. Add photographic evidence, 
              record audio transmissions, and create a lasting archive for future generations.
            </p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <div className="inline-flex items-center text-xs text-space-gold">
              <Star className="h-3 w-3 mr-1" />
              <span>NASA Memory Preservation Program</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <MemoryFeedLayout />
    </div>
  );
}
