import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from './ColorSwatch';
import { vayaColors } from '@/styles/theme/colors/vaya';
import { ColorScale } from './color/types';

const colorScales: ColorScale[] = [
  {
    name: "Gray",
    colors: vayaColors.gray
  },
  {
    name: "Primary",
    colors: {
      DEFAULT: vayaColors.primary,
      light: vayaColors.accent.orange,
      dark: '#E55A59'
    }
  },
  {
    name: "Secondary",
    colors: {
      DEFAULT: vayaColors.secondary,
      light: vayaColors.accent.purple,
      dark: '#5649C0'
    }
  }
];

export const ColorScales = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Scales</CardTitle>
        <CardDescription>Complete color palette with tints and shades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {colorScales.map((scale) => (
            <div key={scale.name} className="space-y-4">
              <h3 className="text-lg font-semibold">{scale.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(scale.colors).map(([shade, color]) => (
                  <ColorSwatch
                    key={shade}
                    color={color as string}
                    name={`${scale.name} ${shade}`}
                    hex={color as string}
                    textClass={shade === 'light' ? 'text-gray-900' : 'text-white'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
