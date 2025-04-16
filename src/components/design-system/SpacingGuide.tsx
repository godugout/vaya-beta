
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const spacingSizes = [
  { name: 'xs', value: '0.25rem', pixels: '4px' },
  { name: 'sm', value: '0.5rem', pixels: '8px' },
  { name: 'md', value: '1rem', pixels: '16px' },
  { name: 'lg', value: '1.5rem', pixels: '24px' },
  { name: 'xl', value: '2rem', pixels: '32px' },
  { name: '2xl', value: '3rem', pixels: '48px' },
];

export const SpacingGuide = () => {
  const [selectedSpacing, setSelectedSpacing] = useState<number>(16);
  const [paddingValue, setPaddingValue] = useState<number>(16);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Spacing System</CardTitle>
          <CardDescription>Consistent spacing scales for margins and padding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {spacingSizes.map((size) => (
              <div key={size.name} className="flex items-center gap-4">
                <div className="w-20">
                  <span className="text-sm font-medium">{size.name}</span>
                </div>
                <div 
                  className="bg-primary/10 rounded cursor-pointer hover:bg-primary/20 transition-colors"
                  style={{ width: size.value, height: size.value }}
                  onClick={() => setSelectedSpacing(parseInt(size.pixels))}
                />
                <div className="text-sm text-muted-foreground">
                  {size.value} / {size.pixels}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Spacing Demo</CardTitle>
          <CardDescription>Click the boxes above or use the slider to experiment with spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Adjust Margin/Padding</label>
              <Slider
                value={[paddingValue]}
                onValueChange={(value) => setPaddingValue(value[0])}
                max={48}
                step={4}
                className="mb-6"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Margin Example</h4>
                <div className="border border-dashed border-gray-300 p-4">
                  <div 
                    className="bg-primary/20 w-full h-16 rounded-md"
                    style={{ margin: `${selectedSpacing}px` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Padding Example</h4>
                <div 
                  className="bg-primary/20 rounded-md"
                  style={{ padding: `${paddingValue}px` }}
                >
                  <div className="w-full h-16 border border-primary/30 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
