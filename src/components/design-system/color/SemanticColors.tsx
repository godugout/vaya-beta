
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '../ColorSwatch';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { useTheme } from 'next-themes';

export const SemanticColors = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Card>
      <CardHeader>
        <CardTitle>UI Semantic Colors</CardTitle>
        <CardDescription>Colors with specific meanings for user interfaces</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch 
            color={vayaColors.ui.success} 
            name="Success" 
            hex="#10B981" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.ui.warning} 
            name="Warning" 
            hex="#F59E0B" 
            textClass={isDark ? "text-white" : "text-black"} 
          />
          <ColorSwatch 
            color={vayaColors.ui.error} 
            name="Error" 
            hex="#DC2626" 
            textClass="text-white" 
          />
          <ColorSwatch 
            color={vayaColors.ui.info} 
            name="Info" 
            hex="#0EA5E9" 
            textClass="text-white" 
          />
        </div>
      </CardContent>
    </Card>
  );
};
