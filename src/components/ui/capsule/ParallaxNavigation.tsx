import React from "react";
import { Button } from "../button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ParallaxNavigationProps {
  onScroll: (row: 'first' | 'second' | 'third', direction: 'left' | 'right') => void;
  rowIndices: {
    first: number;
    second: number;
    third: number;
  };
  maxIndices: {
    first: number;
    second: number;
    third: number;
  };
}

export const ParallaxNavigation = ({ onScroll, rowIndices, maxIndices }: ParallaxNavigationProps) => {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
      {(['first', 'second', 'third'] as const).map((row) => (
        <div key={row} className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onScroll(row, 'left')}
            disabled={rowIndices[row] === 0}
            className="bg-white/90"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onScroll(row, 'right')}
            disabled={rowIndices[row] === maxIndices[row]}
            className="bg-white/90"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};