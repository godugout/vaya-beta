
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, TreeDeciduous, BookOpen } from "lucide-react";

interface FamilyViewSwitcherProps {
  activeView: 'grid' | 'tree' | 'timeline';
  setActiveView: (view: 'grid' | 'tree' | 'timeline') => void;
}

export const FamilyViewSwitcher = ({ activeView, setActiveView }: FamilyViewSwitcherProps) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <Button 
          variant={activeView === 'grid' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setActiveView('grid')}
          className={`rounded-md ${activeView === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
        >
          <Home className="h-4 w-4 mr-2" />
          Homes
        </Button>
        <Button 
          variant={activeView === 'tree' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setActiveView('tree')}
          className={`rounded-md ${activeView === 'tree' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
        >
          <TreeDeciduous className="h-4 w-4 mr-2" />
          Tree
        </Button>
        <Button 
          variant={activeView === 'timeline' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setActiveView('timeline')}
          className={`rounded-md ${activeView === 'timeline' ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Timeline
        </Button>
      </div>
    </div>
  );
};
