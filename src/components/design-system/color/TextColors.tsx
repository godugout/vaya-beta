
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '../ColorSwatch';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { useTheme } from 'next-themes';

export const TextColors = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Colors</CardTitle>
        <CardDescription>Typography color options for different contexts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch 
            color={vayaColors.text.primary} 
            name="Text Primary" 
            hex="#000000" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.text.secondary} 
            name="Text Secondary" 
            hex="#4B5563" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.text.tertiary} 
            name="Text Tertiary" 
            hex="#9CA3AF" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.text.inverse} 
            name="Text Inverse" 
            hex="#FFFFFF" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
