
import React from 'react';
import { ColorCombination } from './types';

interface ColorCombinationCardProps {
  combo: ColorCombination;
}

export const ColorCombinationCard = ({ combo }: ColorCombinationCardProps) => {
  return (
    <div key={combo.name} className="p-4 border rounded-md space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{combo.name}</p>
        <span className="text-xs text-muted-foreground">{combo.example}</span>
      </div>
      
      <div 
        className="h-20 rounded-md flex items-center justify-center"
        style={{ 
          backgroundColor: combo.background,
          color: combo.text
        }}
      >
        <span className="font-medium">Sample Text</span>
      </div>
      
      <div className="pt-2">
        <p className="text-xs text-muted-foreground">
          Background: {combo.background}
        </p>
        <p className="text-xs text-muted-foreground">
          Text: {combo.text}
        </p>
      </div>
    </div>
  );
};
