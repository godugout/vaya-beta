
import React from 'react';
import MemoryFeedLayout from '@/components/memory/MemoryFeedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Star, Orbit } from 'lucide-react';
import EnhancedHanumanBackground from "@/components/hanuman/EnhancedHanumanBackground";

export default function Memories() {
  return (
    <div className="hanuman-theme min-h-screen flex flex-col bg-hanuman-dark text-white relative">
      <EnhancedHanumanBackground />
      
      <div className="container max-w-4xl mx-auto py-10 pb-4 px-4 relative z-10 mt-16 flex-1 flex flex-col">
        <Card className="mb-6 overflow-hidden backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 border-hanuman-orange/20 text-hanuman-text-primary">
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
          <CardHeader className="border-b border-hanuman-orange/20 bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40">
            <CardTitle className="text-2xl md:text-3xl font-semibold text-hanuman-gold flex items-center">
              <Rocket className="h-6 w-6 mr-3 text-hanuman-primary" />
              Family Memories Explorer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Orbit className="h-5 w-5 text-hanuman-gold" />
              </div>
              <p className="text-hanuman-text-secondary">
                Preserve and document your family's most significant moments. Add photographic evidence, 
                record audio transmissions, and create a lasting archive for future generations.
              </p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <div className="inline-flex items-center text-xs text-hanuman-gold">
                <Star className="h-3 w-3 mr-1" />
                <span>Hanuman Memory Preservation Program</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MemoryFeedLayout />
      </div>
    </div>
  );
}
