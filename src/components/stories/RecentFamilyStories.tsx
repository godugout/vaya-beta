
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from 'lucide-react';
import { FadeIn } from '@/components/animation/FadeIn';

export const RecentFamilyStories = () => {
  return (
    <FadeIn className="mt-16 mb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Recent Family Stories</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 mb-2">4/6/2024</p>
            <h3 className="text-lg font-medium mb-2">My Grandmother's Recipes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              I remember how she would wake up early to prepare fresh rotis and...
            </p>
            <Button variant="ghost" size="sm" className="flex items-center text-water">
              <Play className="h-4 w-4 mr-1" /> Play Audio
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 mb-2">4/2/2024</p>
            <h3 className="text-lg font-medium mb-2">Our First Diwali in America</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              It was difficult finding all the materials for the puja, but we managed to...
            </p>
            <Button variant="ghost" size="sm" className="flex items-center text-water">
              <Play className="h-4 w-4 mr-1" /> Play Audio
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 mb-2">4/1/2024</p>
            <h3 className="text-lg font-medium mb-2">Learning to Make Dad's Special Chai</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              The secret was the fresh ginger and cardamom he'd grind himself...
            </p>
            <Button variant="ghost" size="sm" className="flex items-center text-water">
              <Play className="h-4 w-4 mr-1" /> Play Audio
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button className="flex items-center bg-autumn hover:bg-autumn/90 text-white">
          Share a New Story
        </Button>
      </div>
    </FadeIn>
  );
};

export default RecentFamilyStories;
