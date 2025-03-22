
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Calendar, Home } from 'lucide-react';
import { FadeIn } from '@/components/animation/FadeIn';

export const StoriesHeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column */}
      <FadeIn className="flex-1">
        <h1 className="text-3xl font-bold mb-2 text-hanuman-orange">Share Your Stories</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">Preserve Your Family's Legacy</h2>
        
        <div className="space-y-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-hanuman-orange/10 dark:bg-hanuman-orange/20 p-2 rounded">
                  <Mic className="h-5 w-5 text-hanuman-orange" />
                </div>
                <div>
                  <h3 className="font-medium">Use our simple voice recorder to capture stories in your own voice</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-hanuman-red/10 dark:bg-hanuman-red/20 p-2 rounded">
                  <Calendar className="h-5 w-5 text-hanuman-red" />
                </div>
                <div>
                  <h3 className="font-medium">Get inspiration with culturally relevant prompts that help you tell better stories</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-hanuman-gold/10 dark:bg-hanuman-gold/20 p-2 rounded">
                  <Home className="h-5 w-5 text-hanuman-gold" />
                </div>
                <div>
                  <h3 className="font-medium">Easily share your stories with family members and preserve your legacy</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default StoriesHeroSection;
