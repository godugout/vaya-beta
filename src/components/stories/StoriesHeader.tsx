
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from 'lucide-react';

export const StoriesHeader = () => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Button variant="ghost" size="sm" className="p-0 h-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        <Home className="h-4 w-4" />
      </Button>
      <span className="text-sm text-gray-500 dark:text-gray-400">/</span>
      <span className="text-sm font-medium">Share Stories</span>
    </div>
  );
};

export default StoriesHeader;
