
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface YearNavigationProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

export const YearNavigation = ({ currentYear, setCurrentYear }: YearNavigationProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setCurrentYear(currentYear - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-medium w-16 text-center">{currentYear}</span>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setCurrentYear(currentYear + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
