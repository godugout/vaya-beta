
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoriesHeader = () => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Link to="/">
        <Button variant="ghost" size="sm" className="p-0 h-8 text-hanuman-text-secondary hover:text-hanuman-primary">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <Home className="h-4 w-4" />
        </Button>
      </Link>
      <span className="text-sm text-hanuman-text-secondary">/</span>
      <span className="text-sm font-medium text-hanuman-text-primary">Share Stories</span>
    </div>
  );
};

export default StoriesHeader;
