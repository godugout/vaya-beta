
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '../ColorSwatch';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { useTheme } from 'next-themes';

export const BackgroundColors = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background Colors</CardTitle>
        <CardDescription>Surface colors for different UI elements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch 
            color={vayaColors.background.white} 
            name="Background White" 
            hex="#FFFFFF" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.background.light} 
            name="Background Light" 
            hex="#F9FAFB" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.background.subtle} 
            name="Background Subtle" 
            hex="#F3F4F6" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.background.dark} 
            name="Background Dark" 
            hex="#111827" 
            textClass="text-white" 
          />
        </div>
      </CardContent>
    </Card>
  );
};
