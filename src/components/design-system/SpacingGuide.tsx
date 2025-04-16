
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const spacingSizes = [
  { name: 'xs', value: '0.25rem', pixels: '4px' },
  { name: 'sm', value: '0.5rem', pixels: '8px' },
  { name: 'md', value: '1rem', pixels: '16px' },
  { name: 'lg', value: '1.5rem', pixels: '24px' },
  { name: 'xl', value: '2rem', pixels: '32px' },
  { name: '2xl', value: '3rem', pixels: '48px' },
];

export const SpacingGuide = () => {
  return (
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
                className="bg-primary/10 rounded"
                style={{ width: size.value, height: size.value }}
              />
              <div className="text-sm text-muted-foreground">
                {size.value} / {size.pixels}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
