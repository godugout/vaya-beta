
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '../ColorSwatch';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { useTheme } from 'next-themes';

export const BrandColors = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Primary Brand Colors</CardTitle>
        <CardDescription>The core colors that form Vaya's brand identity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch 
            color={vayaColors.primary} 
            name="Primary Black" 
            hex="#000000" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.secondary} 
            name="Secondary Purple" 
            hex="#6C5CE7" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.accent.purple} 
            name="Accent Purple" 
            hex="#9b87f5" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.accent.turquoise} 
            name="Accent Turquoise" 
            hex="#0EA5E9" 
            textClass="text-white" 
          />
        </div>
      </CardContent>
    </Card>
  );
};
