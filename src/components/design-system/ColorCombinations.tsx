
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorCombinationCard } from './color/ColorCombinationCard';
import { colorCombinations } from './color/constants';

export const ColorCombinations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Combinations</CardTitle>
        <CardDescription>Practical examples of color usage in different contexts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorCombinations.map((combo) => (
            <ColorCombinationCard key={combo.name} combo={combo} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
